from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,PageBreak
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import cm
from reportlab.lib import colors
import re
src=open('PROPOSAL.txt',encoding='utf-8').read(); out='output/pdf/Proposal_SkillPath_Lengkap.pdf'
s=getSampleStyleSheet(); s.add(ParagraphStyle(name='B',parent=s['BodyText'],fontSize=9.2,leading=13,spaceAfter=5)); s.add(ParagraphStyle(name='H',parent=s['Heading1'],fontSize=16,leading=20,textColor=colors.HexColor('#123B7A'),spaceBefore=10,spaceAfter=7)); s.add(ParagraphStyle(name='HH',parent=s['Heading2'],fontSize=12,leading=15,textColor=colors.HexColor('#1E4E96'),spaceBefore=8,spaceAfter=5)); s.add(ParagraphStyle(name='T',parent=s['Title'],fontSize=23,leading=28,alignment=TA_CENTER,textColor=colors.HexColor('#123B7A')))
def clean(x):
 x=x.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;'); x=re.sub(r'\*\*(.*?)\*\*',r'<b>\1</b>',x); x=re.sub(r'\*(.*?)\*',r'<i>\1</i>',x); return x
story=[]
for line in src.splitlines():
 line=line.strip()
 if not line: story.append(Spacer(1,4)); continue
 if line.startswith('# '): story.append(Paragraph(clean(line[2:]),s['T']))
 elif line.startswith('## '): story.append(Paragraph(clean(line[3:]),s['H']))
 elif line.startswith('### '): story.append(Paragraph(clean(line[4:]),s['HH']))
 elif line.startswith('|'):
  story.append(Paragraph(clean(line.replace('|',' &nbsp; | &nbsp; ')),s['B']))
 elif line.startswith('```'): continue
 elif line.startswith('- ') or re.match(r'^\d+\. ',line): story.append(Paragraph('• '+clean(re.sub(r'^\d+\.\s*','',line[2:] if line.startswith('- ') else line)),s['B']))
 elif line.startswith('---'): story.append(PageBreak())
 else: story.append(Paragraph(clean(line),s['B']))
def foot(c,d): c.saveState(); c.setFont('Helvetica',8); c.setFillColor(colors.grey); c.drawString(2*cm,1*cm,'Proposal SkillPath - Web Dev Competition 2026'); c.drawRightString(19*cm,1*cm,str(d.page)); c.restoreState()
SimpleDocTemplate(out,pagesize=A4,rightMargin=2*cm,leftMargin=2*cm,topMargin=1.7*cm,bottomMargin=1.5*cm).build(story,onFirstPage=foot,onLaterPages=foot)
print(out)
