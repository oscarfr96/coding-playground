"""Build bilingual, text-selectable CVs. Requires reportlab (pip install reportlab)."""
import json
import os
import sys
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether,
)

ROOT = Path(sys.argv[1])
sys.stdin.reconfigure(encoding='utf-8')
DATA = json.load(sys.stdin)
FONT_DIR = Path(os.environ.get('WINDIR', 'C:/Windows')) / 'Fonts'
if (FONT_DIR / 'arial.ttf').exists():
    pdfmetrics.registerFont(TTFont('CV', str(FONT_DIR / 'arial.ttf')))
    pdfmetrics.registerFont(TTFont('CV-Bold', str(FONT_DIR / 'arialbd.ttf')))
    pdfmetrics.registerFontFamily('CV', normal='CV', bold='CV-Bold', italic='CV', boldItalic='CV-Bold')
    FONT, BOLD = 'CV', 'CV-Bold'
else:
    FONT, BOLD = 'Helvetica', 'Helvetica-Bold'

INK = colors.HexColor('#2f2a20')
MUTED = colors.HexColor('#635e51')
ACCENT = colors.HexColor('#1f6e91')
STYLES = {
    'name': ParagraphStyle('name', fontName=BOLD, fontSize=26, leading=30, textColor=INK, spaceAfter=4),
    'role': ParagraphStyle('role', fontName=FONT, fontSize=13, leading=17, textColor=ACCENT, spaceAfter=8),
    'contact': ParagraphStyle('contact', fontName=FONT, fontSize=8.5, leading=13, textColor=MUTED, spaceAfter=12),
    'section': ParagraphStyle('section', fontName=BOLD, fontSize=13, leading=18, textColor=ACCENT, spaceBefore=12, spaceAfter=7, keepWithNext=True),
    'job': ParagraphStyle('job', fontName=BOLD, fontSize=11, leading=15, textColor=INK, spaceBefore=6, spaceAfter=3, keepWithNext=True),
    'meta': ParagraphStyle('meta', fontName=FONT, fontSize=9, leading=12, textColor=MUTED, spaceAfter=6, keepWithNext=True),
    'sub': ParagraphStyle('sub', fontName=BOLD, fontSize=9.6, leading=13, textColor=INK, spaceBefore=7, spaceAfter=3, keepWithNext=True),
    'body': ParagraphStyle('body', fontName=FONT, fontSize=9.3, leading=13.3, textColor=INK, spaceAfter=5, alignment=TA_LEFT),
    'bullet': ParagraphStyle('bullet', fontName=FONT, fontSize=9.3, leading=13.3, textColor=INK, leftIndent=11, firstLineIndent=-9, spaceAfter=3),
}

LABELS = {
    'es': {
        'profile': 'Perfil', 'experience': 'Experiencia profesional', 'skills': 'Competencias técnicas',
        'projects': 'Proyectos seleccionados', 'education': 'Formación', 'certs': 'Certificaciones',
        'languages': 'Idiomas', 'languagesText': 'Español nativo · Inglés C1 (Cambridge CAE)',
    },
    'en': {
        'profile': 'Profile', 'experience': 'Professional experience', 'skills': 'Technical skills',
        'projects': 'Selected projects', 'education': 'Education', 'certs': 'Certifications',
        'languages': 'Languages', 'languagesText': 'Native Spanish · English C1 (Cambridge CAE)',
    },
}


def clean(value):
    return value.replace('—', '-').replace('–', '-').replace('\u2011', '-')


def para(value, style='body'):
    return Paragraph(escape(clean(value)), STYLES[style])


def labeled(label, value):
    return Paragraph(f'<b>{escape(clean(label))}:</b> {escape(clean(value))}', STYLES['body'])


def footer(canvas, doc):
    canvas.setStrokeColor(colors.HexColor('#ddd2b4'))
    canvas.line(42, 37, A4[0] - 42, 37)
    canvas.setFont(FONT, 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(42, 24, 'Óscar Fraile · Full Stack Engineer')
    canvas.drawRightString(A4[0] - 42, 24, f'{doc.page} / 2')


def build(language, t):
    labels = LABELS[language]
    target = ROOT / 'public' / ('cv-oscar-fraile-es.pdf' if language == 'es' else 'cv-oscar-fraile.pdf')
    story = [para(t['hero']['name'], 'name'), para(t['hero']['role'], 'role')]
    story.append(Paragraph(
        f'{escape(t["hero"]["location"])} · <link href="mailto:oscar.fm.96@gmail.com">oscar.fm.96@gmail.com</link><br/>'
        '<link href="https://github.com/oscarfr96">github.com/oscarfr96</link> · '
        '<link href="https://oscar-fraile-portfolio.vercel.app">oscar-fraile-portfolio.vercel.app</link>',
        STYLES['contact']))
    story.extend([para(labels['profile'], 'section'), para(t['hero']['bio'])])
    story.append(para(labels['experience'], 'section'))
    current = t['experience']['educaria']
    story.extend([para(f'{current["title"]} | {current["company"]}', 'job'),
                  para(f'{current["period"]} · {t["hero"]["location"]}', 'meta'), para(current['summary'])])
    for point in current['points']:
        story.append(para(f'• {point}', 'bullet'))
    previous = t['experience']['nttData']
    story.extend([para(f'{previous["title"]} | {previous["company"]}', 'job'),
                  para(f'{previous["period"]} · {t["hero"]["location"]}', 'meta'), para(previous['summary'])])
    for point in previous['points'][:3]:
        story.append(para(f'• {point}', 'bullet'))

    story.extend([PageBreak(), para(labels['skills'], 'section')])
    skills = {
        'frontend': 'React, TypeScript, Angular, Ionic, JavaScript, Tailwind CSS',
        'backend': 'C#, .NET, Entity Framework Core, Python, FastAPI, SQLAlchemy, Identity Server, Node.js, OData, GraphQL',
        'architecture': 'Microservices, Hexagonal Architecture, Clean Architecture, SOLID, Docker, Kubernetes, Rancher, CI/CD, Azure DevOps, GitHub Actions, Azure, Google Cloud, Vercel',
        'databases': 'SQL Server, PostgreSQL, Redis, Firestore, MongoDB',
        'ai': 'Claude Code, MCP, Spec-Driven Development, RAG, LangChain, LangGraph, GitHub Copilot, Prompt Engineering, AI Agents',
        'testing': 'xUnit, Moq, k6, BDD / Gherkin, SonarQube',
    }
    for key, value in skills.items():
        story.append(labeled(t['techStack'][key], value))
    story.append(para(labels['projects'], 'section'))
    for key in ['gredio', 'worldCup']:
        project = t['projects'][key]
        # Keep the CV concise; full implementation details live in the portfolio.
        story.append(KeepTogether([
            para(project['title'], 'job'), para(project['tagline'], 'meta'),
            para(project['built'][0]), para(project['built'][1]),
        ]))
    story.append(para(labels['education'], 'section'))
    for degree in t['education']['degrees']:
        story.append(KeepTogether([
            para(f'{degree["degree"]} | {degree["period"]}', 'sub'),
            para(degree['institution']),
        ]))
    story.append(para(labels['certs'], 'section'))
    for cert in t['education']['certifications']:
        value = f'{cert["title"]} · {cert["issuer"]} · {cert["year"]}'
        text = escape(clean(value))
        if cert['link']:
            text = f'<link href="{escape(cert["link"], quote=True)}">{text}</link>'
        story.append(Paragraph(text, STYLES['body']))
    story.extend([Spacer(1, 4), labeled(labels['languages'], labels['languagesText'])])
    doc = SimpleDocTemplate(str(target), pagesize=A4, leftMargin=42, rightMargin=42,
                            topMargin=36, bottomMargin=49, title='Óscar Fraile | Full Stack Engineer',
                            author='Óscar Fraile')
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f'Generated {target.name}')


for language, translation in DATA.items():
    build(language, translation)
