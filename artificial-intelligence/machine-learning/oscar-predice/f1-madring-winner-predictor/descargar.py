"""Descarga fuentes públicas; conserva respuestas para reproducir el pronóstico."""
import argparse
import hashlib
import json
from pathlib import Path
import time
import requests

ROOT = Path(__file__).resolve().parent
CACHE = ROOT / 'fuentes'
CUTOFF = '2026-09-13'

def get(url):
    CACHE.mkdir(parents=True, exist_ok=True)
    path = CACHE / (hashlib.sha256(url.encode()).hexdigest() + '.json')
    if path.exists():
        return json.loads(path.read_text(encoding='utf-8'))['body']
    for attempt in range(4):
        response = requests.get(url, timeout=40)
        if response.status_code == 429:
            time.sleep(15 * (attempt + 1))
            continue
        response.raise_for_status()
        body = response.content.decode('utf-8-sig')
        path.write_text(json.dumps({'url': url, 'body': body}, ensure_ascii=False), encoding='utf-8')
        time.sleep(.25)
        return body
    raise RuntimeError('Rate limit: ' + url)

def api(suffix):
    return json.loads(get('https://api.jolpi.ca/ergast/f1/' + suffix))['MRData']

def download():
    races = []
    for year in (2024, 2025, 2026):
        index = json.loads(get(f'https://livetiming.formula1.com/static/{year}/Index.json'))
        sessions = {s['StartDate'][:10]: s for m in index['Meetings']
                    for s in m['Sessions'] if s['Name'] == 'Race'}
        collected = {}
        offset = 0
        while True:
            data = api(f'{year}/results.json?limit=100&offset={offset}')
            for race in data['RaceTable']['Races']:
                key = race['round']
                if key not in collected:
                    collected[key] = dict(race, Results=[])
                collected[key]['Results'].extend(race['Results'])
            offset += int(data['limit'])
            if offset >= int(data['total']):
                break
        for race in collected.values():
            if race['date'] >= CUTOFF:
                continue
            rd = race['round']
            laps = api(f'{year}/{rd}/laps/1.json?limit=100')['RaceTable']['Races']
            if not laps or not laps[0].get('Laps'):
                raise ValueError(f'Missing lap 1: {year}/{rd}')
            lap1 = {r['driverId']: int(r['position']) for r in laps[0]['Laps'][0]['Timings']}
            named = [s for m in index['Meetings'] if m['Name'] == race['raceName']
                     for s in m['Sessions'] if s['Name'] == 'Race']
            session = named[0] if named else sessions.get(race['date'], {'Path': f'{year}/{race["date"]}_{race["raceName"].replace(" ", "_")}/{race["date"]}_Race/'})
            url = 'https://livetiming.formula1.com/static/' + session['Path'] + 'TrackStatus.jsonStream'
            stream = get(url)
            statuses = []
            for line in stream.splitlines():
                if '{' in line:
                    item = json.loads(line[line.index('{'):])
                    if 'Status' in item:
                        statuses.append(item['Status'])
            if not statuses:
                raise ValueError('Empty track status: ' + url)
            scenario = 'roja' if '5' in statuses else ('sc_vsc' if set(statuses) & {'4','6','7'} else 'limpia')
            rows = []
            for r in race['Results']:
                driver = r['Driver']['driverId']
                rows.append({'driver': driver, 'code': r['Driver'].get('code',driver),
                             'team': r['Constructor']['constructorId'], 'grid': int(r['grid']),
                             'finish': int(r['position']), 'laps': int(r['laps']),
                             'lap1': lap1.get(driver), 'status': r['status']})
            assert len({r['driver'] for r in rows}) == len(rows)
            assert sum(r['finish'] == 1 for r in rows) == 1
            assert sum(r['lap1'] == 1 for r in rows) == 1
            races.append({'date': race['date'], 'year': year, 'round': int(rd),
                          'circuit': race['Circuit']['circuitId'], 'name': race['raceName'],
                          'scenario': scenario, 'rows': rows, 'track_source': url})
            print(f'{year}/{rd}: {race["raceName"]}: {scenario}', flush=True)
    races.sort(key=lambda r:r['date'])
    (ROOT/'historico.json').write_text(json.dumps(races,ensure_ascii=False,indent=2),encoding='utf-8')
    # Clasificación de ayer; no consultar el resultado de la carrera objetivo.
    qualifying = api('2026/14/qualifying.json?limit=100')['RaceTable']['Races'][0]
    assert qualifying['Circuit']['circuitId'] not in {'catalunya'}, 'Wrong event'
    grid = [{'driver':r['Driver']['driverId'],'code':r['Driver'].get('code',''),
             'team':r['Constructor']['constructorId'],'grid':int(r['position'])}
            for r in qualifying['QualifyingResults']]
    assert grid[0]['code'] == 'NOR', 'Pole differs from premise'
    (ROOT/'parrilla.json').write_text(json.dumps({'source':'https://api.jolpi.ca/ergast/f1/2026/14/qualifying.json',
        'note':'Clasificacion usada como parrilla; no incluye sanciones posteriores.', 'rows':grid},ensure_ascii=False,indent=2),encoding='utf-8')

if __name__ == '__main__':
    download()
