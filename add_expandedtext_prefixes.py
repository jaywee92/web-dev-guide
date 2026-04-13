import re

# Classification heuristic — checked in order, first match wins
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
    # Extract first bold label if present
    bold_m = re.match(r'\*\*([^*]+)\*\*', para)
    label = bold_m.group(1) if bold_m else ''
    combined = (label + ' ' + para[:300]).lower()
    for emoji, pattern in KEYWORD_MAP:
        if pattern.search(combined):
            return emoji
    return '📖'

def add_prefixes_to_et(et_raw: str) -> str:
    """Add emoji prefix to each paragraph. et_raw is the raw string from the TS file
    (backslash-n sequences, not real newlines)."""
    # Split on literal \n\n in the raw string
    paras = et_raw.split('\\n\\n')
    result = []
    for para in paras:
        stripped = para.strip()
        if not stripped:
            continue
        # Skip if already has an emoji prefix
        if re.match(r'^[📖💡⚠️🔬✅📜]', stripped):
            result.append(para)
            continue
        emoji = classify(stripped)
        result.append(emoji + ' ' + stripped)
    return '\\n\\n'.join(result)

# Read file
with open('src/data/topics.ts') as f:
    content = f.read()

changed = 0

def replace_et(m):
    global changed
    raw = m.group(1)
    updated = add_prefixes_to_et(raw)
    if updated == raw:
        return m.group(0)
    changed += 1
    return f"expandedText: '{updated}'"

new_content = re.sub(
    r"expandedText: '((?:[^'\\]|\\.)*?)'",
    replace_et,
    content,
    flags=re.DOTALL
)

with open('src/data/topics.ts', 'w') as f:
    f.write(new_content)

print(f'Modified {changed} expandedText fields')

# Count prefixes applied
total = sum(new_content.count(e + ' ') for e in ['📖', '💡', '⚠️', '🔬', '✅', '📜'])
print(f'Total emoji-prefixed paragraphs: {total}')
for e in ['📖', '💡', '⚠️', '🔬', '✅', '📜']:
    print(f'  {e}: {new_content.count(e + " ")}')
