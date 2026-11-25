"""Modelo experimental de dos etapas, con validación temporal y sin red.

P(ganador) = sum_S P(S) sum_L P(L | S) P(ganador | L, S).
L es líder registrado de vuelta 1; S es neutralización de toda la carrera.
Las probabilidades son del modelo, no frecuencias calibradas de Madring.
"""
import json
from pathlib import Path
import argparse
import numpy as np
from scipy.optimize import minimize
from scipy.special import softmax, logsumexp

ROOT = Path(__file__).resolve().parent
SCENARIOS = ['limpia', 'sc_vsc', 'roja']
# Hipótesis previa de transferencia: trazados donde se suele valorar posición.
# No es una medición de dificultad de adelantamiento de Madring.
COMPARABLES = {'monaco', 'hungaroring', 'zandvoort', 'marina_bay'}

def features(rows, history):
    vectors = []
    for row in rows:
        own = [(r, x) for r in history for x in r['rows'] if x['driver'] == row['driver']]
        team = [(r, x) for r in history[-5:] for x in r['rows'] if x['team'] == row['team']]
        form = [(len(r['rows']) - x['finish']) / (len(r['rows']) - 1) for r,x in own[-5:]]
        teamform = [(len(r['rows']) - x['finish']) / (len(r['rows']) - 1) for r,x in team]
        starts = []
        for r,x in own[-10:]:
            if x['lap1'] is None or x['grid'] <= 0:
                continue
            # Comparar con el mismo puesto evita premiar por salir desde atrás.
            peers = [z['grid']-z['lap1'] for h in history if h['date'] < r['date']
                     for z in h['rows'] if z['grid']==x['grid'] and z['lap1'] is not None]
            expected = sum(peers)/len(peers) if peers else 0
            starts.append(np.clip((x['grid']-x['lap1']-expected)/5,-1,1))
        # Suavizado explícito: dos carreras neutras de forma, cinco salidas neutras.
        form = (sum(form)+1)/(len(form)+2)
        teamform = (sum(teamform)+1)/(len(teamform)+2)
        launch = sum(starts)/(len(starts)+5)
        grid = row['grid'] if row['grid'] > 0 else len(rows)+1
        all_poles=[x for h in history for x in h['rows'] if x['grid']==1 and x['lap1'] is not None]
        own_poles=[x for _,x in own if x['grid']==1 and x['lap1'] is not None]
        pool=(sum(x['lap1']==1 for x in all_poles)+1)/(len(all_poles)+2)
        retention=(sum(x['lap1']==1 for x in own_poles)+5*pool)/(len(own_poles)+5)
        vectors.append([-np.log(grid), float(grid==1), form-.5, teamform-.5, launch,
                        (retention-pool)*float(grid==1)])
    return np.array(vectors)

def design(base, scenario, comparable, leader=None):
    # Une constante de escenario se cancelaría en softmax: usamos interacciones.
    red = float(scenario=='roja')
    neutral = float(scenario=='sc_vsc')
    grid = base[:,0]
    extra = [grid*red, grid*neutral, grid*comparable]
    if leader is not None:
        l = np.zeros(len(base)); l[leader] = 1
        extra += [l, l*red, l*neutral, l*comparable]
    return np.column_stack([base, *extra])

def fit(samples):
    n = samples[0][0].shape[1]
    prior = np.zeros(n); prior[0] = 1
    def objective(beta):
        loss = float(np.sum((beta-prior)**2))
        grad = 2*(beta-prior)
        for x,y in samples:
            score = x@beta
            p = softmax(score)
            loss += logsumexp(score)-score[y]
            grad += x.T@p-x[y]
        return loss,grad
    result = minimize(objective,prior,jac=True,method='L-BFGS-B')
    if not result.success:
        raise RuntimeError(result.message)
    return result.x

def scenario_probs(history, comparable):
    all_counts = np.array([sum(r['scenario']==s for r in history) for s in SCENARIOS])
    prior = (all_counts+1)/(len(history)+3)
    cohort = [r for r in history if r['circuit'] in COMPARABLES] if comparable else history
    counts = np.array([sum(r['scenario']==s for r in cohort) for s in SCENARIOS])
    return (counts+10*prior)/(len(cohort)+10)

def predict(base, start_beta, win_beta, ps, comparable):
    wins = np.zeros(len(base)); leads = np.zeros(len(base)); conditional = []
    for s,weight in zip(SCENARIOS,ps):
        pl = softmax(design(base,s,comparable)@start_beta)
        pw = sum(pl[l]*softmax(design(base,s,comparable,l)@win_beta) for l in range(len(base)))
        wins += weight*pw; leads += weight*pl
        conditional.append(pw)
    assert np.isclose(wins.sum(),1) and np.isclose(leads.sum(),1)
    return wins,leads,conditional

def run():
    races=json.loads((ROOT/'historico.json').read_text(encoding='utf-8'))
    assert all(r['date'] < '2026-09-13' for r in races)
    assert races == sorted(races,key=lambda r:r['date'])
    starts=[]; finishes=[]; validation=[]
    for i,race in enumerate(races):
        history=races[:i]
        base=features(race['rows'],history)
        comparable=int(race['circuit'] in COMPARABLES)
        winner=next(i for i,r in enumerate(race['rows']) if r['finish']==1)
        leader=next(i for i,r in enumerate(race['rows']) if r['lap1']==1)
        if len(starts)>=20:
            # Jamás usa la bandera ni el líder reales de la carrera evaluada.
            pred,_,_=predict(base,fit(starts),fit(finishes),scenario_probs(history,comparable),comparable)
            grid_scores=softmax(base[:,0]*2)
            pole=int(np.argmax(base[:,1]))
            validation.append({'date':race['date'],'race':race['name'],
                'hit':int(np.argmax(pred)==winner),'pole_hit':int(pole==winner),
                'logloss':float(-np.log(pred[winner])),
                'grid_logloss':float(-np.log(grid_scores[winner])),
                'brier':float(np.sum((pred-np.eye(len(pred))[winner])**2))})
        starts.append((design(base,race['scenario'],comparable),leader))
        finishes.append((design(base,race['scenario'],comparable,leader),winner))
    grid=json.loads((ROOT/'parrilla.json').read_text(encoding='utf-8'))
    base=features(grid['rows'],races)
    sb,wb=fit(starts),fit(finishes)
    ps=scenario_probs(races,1)
    wins,leads,conditional=predict(base,sb,wb,ps,1)
    neutral_wins,_,_=predict(base,sb,wb,scenario_probs(races,0),0)
    output={'cutoff':'2026-09-13','last_race':races[-1]['date'], 'n_races':len(races),
        'label':'Experimental; sin calibracion externa; parrilla oficial verificada',
        'scenario_probabilities':dict(zip(SCENARIOS,ps.tolist())),
        'comparables':sorted(COMPARABLES),'n_comparable':sum(r['circuit'] in COMPARABLES for r in races),
        'validation':{'n':len(validation),'hits':sum(r['hit'] for r in validation),
          'pole_hits':sum(r['pole_hit'] for r in validation),
          'logloss':float(np.mean([r['logloss'] for r in validation])),
          'grid_logloss':float(np.mean([r['grid_logloss'] for r in validation])),
          'brier':float(np.mean([r['brier'] for r in validation]))}, 'drivers':[]}
    for i,r in enumerate(grid['rows']):
        own=[x for race in races for x in race['rows'] if x['driver']==r['driver'] and x['grid']>0]
        observed=[x for x in own if x['lap1'] is not None]
        poles=[x for x in own if x['grid']==1]
        output['drivers'].append(dict(r,win=float(wins[i]),lead_lap1=float(leads[i]),
            win_without_comparable_assumption=float(neutral_wins[i]),
            win_by_scenario={s:float(conditional[j][i]) for j,s in enumerate(SCENARIOS)},
            starts_observed=len(observed),starts_missing=len(own)-len(observed),
            maintained=sum(x['lap1']<=x['grid'] for x in observed),
            poles=len(poles),poles_retained=sum(x['lap1']==1 for x in poles)))
    # Condicionar a Norris líder cambia también la mezcla de escenarios (Bayes).
    nor=next(i for i,r in enumerate(grid['rows']) if r['code']=='NOR')
    joint_lead=np.array([ps[j]*softmax(design(base,s,1)@sb)[nor] for j,s in enumerate(SCENARIOS)])
    output['norris_win_if_leads']=float(sum(joint_lead[j]*softmax(design(base,s,1,nor)@wb)[nor]
        for j,s in enumerate(SCENARIOS))/joint_lead.sum())
    output['norris_win_if_not_leads']=float((wins[nor]-leads[nor]*output['norris_win_if_leads'])/(1-leads[nor]))
    output['drivers'].sort(key=lambda r:-r['win'])
    (ROOT/'resultado.json').write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT/'validacion.json').write_text(json.dumps(validation,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f"Historico: {len(races)} carreras; ultima: {races[-1]['name']} ({races[-1]['date']})")
    print('PILOTO  P(lider vuelta 1)  P(victoria)')
    for r in output['drivers'][:5]:
        print(f"{r['code']:6} {r['lead_lap1']:16.1%} {r['win']:12.1%}")
    n=next(r for r in output['drivers'] if r['code']=='NOR')
    print(f"Norris retuvo P1 en {n['poles_retained']}/{n['poles']} poles historicas.")
    print(f"P(roja): {ps[2]:.1%}; P(SC/VSC sin roja): {ps[1]:.1%}")
    print(f"Norris gana si lidera: {output['norris_win_if_leads']:.1%}; si no: {output['norris_win_if_not_leads']:.1%}")
    v=output['validation']
    print(f"Validacion temporal: {v['hits']}/{v['n']} aciertos; pole: {v['pole_hits']}/{v['n']}")
    print(f"Log loss: {v['logloss']:.3f}; referencia 1/parrilla^2: {v['grid_logloss']:.3f}")
    print('Probabilidades experimentales, no calibradas para Madring.')
    return output

if __name__=='__main__':
    run()
