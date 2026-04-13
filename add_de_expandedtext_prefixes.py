import json, re

KEYWORD_MAP = [
    ('📜', re.compile(
        r'histor|legacy|old way|before |replaced|originally|introduced in|'
        r'used to be|stammt|früher|ursprünglich|damals',
        re.I
    )),
    ('⚠️', re.compile(
        r'mistake|avoid|never |gotcha|trap|warning|pitfall|watch out|'
        r"don't |cannot |fehler|falle|achtung|niemals|vorsicht|häufig",
        re.I
    )),
    ('💡', re.compile(
        r'tip\b|best practice|prefer |recommend|rule of thumb|'
        r'merkhilfe|tipp\b|empfehlung|faustregel|pro tip',
        re.I
    )),
    ('🔬', re.compile(
        r'under the hood|internally|technically|mechanism|engine\b|'
        r'deep dive|intern\b|technisch|implementation detail',
        re.I
    )),
    ('✅', re.compile(
        r'\bpattern\b|convention|always use|should use|muster\b|konvention|'
        r'the rule is|as a rule',
        re.I
    )),
]

def classify(para: str) -> str:
    bold_m = re.match(r'\*\*([^*]+)\*\*', para)
    label = bold_m.group(1) if bold_m else ''
    combined = (label + ' ' + para[:300]).lower()
    for emoji, pattern in KEYWORD_MAP:
        if pattern.search(combined):
            return emoji
    return '📖'

def add_prefixes(et: str) -> str:
    paras = et.split('\n\n')
    result = []
    for para in paras:
        s = para.strip()
        if not s:
            continue
        if re.match(r'^[📖💡⚠️🔬✅📜]', s):
            result.append(para)
            continue
        result.append(classify(s) + ' ' + s)
    return '\n\n'.join(result)

FILES = [
    'src/i18n/locales/de/topics-js.json',
    'src/i18n/locales/de/topics-css.json',
    'src/i18n/locales/de/topics-html.json',
    'src/i18n/locales/de/topics-other.json',
]

total_changed = 0
for path in FILES:
    with open(path) as f:
        data = json.load(f)
    changed = 0
    for topic in data.values():
        for step in topic.get('steps', []):
            if 'expandedText' in step:
                original = step['expandedText']
                updated = add_prefixes(original)
                if updated != original:
                    step['expandedText'] = updated
                    changed += 1
    with open(path, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')
    total_changed += changed
    print(f'{path.split("/")[-1]}: {changed} steps updated')

print(f'Total: {total_changed} DE steps updated')
