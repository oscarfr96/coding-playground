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
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether, Flowable,
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
PASTELS = {
    'blue': colors.HexColor('#e3f4fb'),
    'pink': colors.HexColor('#fde2ee'),
    'mint': colors.HexColor('#e2f5ea'),
    'yellow': colors.HexColor('#fcefbf'),
}
STYLES = {
    'name': ParagraphStyle('name', fontName=BOLD, fontSize=26, leading=30, textColor=INK, spaceAfter=4),
    'role': ParagraphStyle('role', fontName=FONT, fontSize=13, leading=17, textColor=ACCENT, spaceAfter=8),
    'contact': ParagraphStyle('contact', fontName=FONT, fontSize=8.5, leading=13, textColor=MUTED, spaceAfter=12),
    'section': ParagraphStyle('section', fontName=BOLD, fontSize=12, leading=17, textColor=INK, spaceBefore=16, spaceAfter=11, borderPadding=(4, 8, 4, 8), borderRadius=5, keepWithNext=True),
    'job': ParagraphStyle('job', fontName=BOLD, fontSize=11, leading=15, textColor=INK, spaceBefore=6, spaceAfter=3, keepWithNext=True),
    'meta': ParagraphStyle('meta', fontName=FONT, fontSize=9, leading=12, textColor=MUTED, spaceAfter=6, keepWithNext=True),
    'sub': ParagraphStyle('sub', fontName=BOLD, fontSize=9.6, leading=13, textColor=INK, spaceBefore=7, spaceAfter=3, keepWithNext=True),
    'body': ParagraphStyle('body', fontName=FONT, fontSize=10, leading=14, textColor=INK, spaceAfter=5, alignment=TA_LEFT),
    'bullet': ParagraphStyle('bullet', fontName=FONT, fontSize=10, leading=14, textColor=INK, leftIndent=11, firstLineIndent=-9, spaceAfter=4),
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


def section(title, tone='blue'):
    style = ParagraphStyle(f'section-{tone}', parent=STYLES['section'], backColor=PASTELS[tone])
    return Paragraph(escape(title), style)


class ProfileHeader(Flowable):
    """Decorative portrait beside real PDF text; all career content stays single-column."""

    def __init__(self, translation):
        super().__init__()
        self.translation = translation
        self.height = 132

    def wrap(self, available_width, available_height):
        self.width = available_width
        return self.width, self.height

    def draw(self):
        canvas = self.canv
        canvas.saveState()
        canvas.setFillColor(PASTELS['blue'])
        canvas.roundRect(0, 0, self.width, self.height, 14, fill=1, stroke=0)
        hero = self.translation['hero']
        contact = (
            f'{escape(hero["location"])} · '
            '<link href="mailto:oscar.fm.96@gmail.com">oscar.fm.96@gmail.com</link><br/>'
            '<link href="https://github.com/oscarfr96">github.com/oscarfr96</link><br/>'
            '<link href="https://oscar-fraile-portfolio.vercel.app">oscar-fraile-portfolio.vercel.app</link>'
        )
        blocks = [para(hero['name'], 'name'), para(hero['role'], 'role'),
                  Paragraph(contact, STYLES['contact'])]
        y = self.height - 15
        for block in blocks:
            _, height = block.wrap(self.width - 146, self.height)
            y -= height
            block.drawOn(canvas, 16, y)
            y -= block.getSpaceAfter()

        # Use the original transparent portrait, without generative edits.
        photo_width = 96
        photo_height = photo_width * 720 / 661
        photo_x, photo_y = self.width - photo_width - 12, 13
        canvas.setFillColor(colors.HexColor('#8fd3ef'))
        canvas.roundRect(photo_x, photo_y, photo_width, photo_height, 12, fill=1, stroke=0)
        canvas.saveState()
        clip = canvas.beginPath()
        clip.roundRect(photo_x, photo_y, photo_width, photo_height, 12)
        canvas.clipPath(clip, stroke=0, fill=0)
        canvas.drawImage(ImageReader(str(ROOT / 'src/assets/oscar-cutout.png')),
                         photo_x, photo_y, width=photo_width, height=photo_height, mask='auto')
        canvas.restoreState()
        canvas.restoreState()


def footer(canvas, doc):
    canvas.setStrokeColor(colors.HexColor('#ddd2b4'))
    canvas.line(42, 37, A4[0] - 42, 37)
    canvas.setFont(FONT, 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(42, 24, 'Óscar Fraile · Full Stack Engineer')
    canvas.drawRightString(A4[0] - 42, 24, f'{doc.page} / 2')


class CVDocument(SimpleDocTemplate):
    def afterPage(self):
        # Append footer text after the body in the PDF content stream.
        footer(self.canv, self)


def build(language, t):
    labels = LABELS[language]
    target = ROOT / 'public' / ('cv-oscar-fraile-es.pdf' if language == 'es' else 'cv-oscar-fraile.pdf')
    story = [ProfileHeader(t), Spacer(1, 4)]
    story.extend([section(labels['profile']), para(t['hero']['bio'])])
    story.append(section(labels['experience'], 'pink'))
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

    story.extend([PageBreak(), section(labels['skills'])])
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
    story.append(section(labels['projects'], 'mint'))
    for key in ['gredio', 'worldCup']:
        project = t['projects'][key]
        # Keep the CV concise; full implementation details live in the portfolio.
        story.append(KeepTogether([
            para(project['title'], 'job'), para(project['tagline'], 'meta'),
            para(project['built'][0]), para(project['built'][1]),
        ]))
    story.append(section(labels['education'], 'yellow'))
    for degree in t['education']['degrees']:
        story.append(KeepTogether([
            para(f'{degree["degree"]} | {degree["period"]}', 'sub'),
            para(degree['institution']),
        ]))
    story.append(section(labels['certs'], 'pink'))
    for cert in t['education']['certifications']:
        value = f'{cert["title"]} · {cert["issuer"]} · {cert["year"]}'
        text = escape(clean(value))
        if cert['link']:
            text = f'<link href="{escape(cert["link"], quote=True)}">{text}</link>'
        story.append(Paragraph(text, STYLES['body']))
    story.extend([Spacer(1, 4), labeled(labels['languages'], labels['languagesText'])])
    doc = CVDocument(str(target), pagesize=A4, leftMargin=42, rightMargin=42,
                            topMargin=36, bottomMargin=49, title='Óscar Fraile | Full Stack Engineer',
                            author='Óscar Fraile')
    doc.build(story)
    print(f'Generated {target.name}')


for language, translation in DATA.items():
    build(language, translation)
