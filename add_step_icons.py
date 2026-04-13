import re

ICONS = {
  # ── HTML ──────────────────────────────────────────────────────────────────
  ('html-basics', 0): '🧩', ('html-basics', 1): '🔓', ('html-basics', 2): '📝',
  ('html-basics', 3): '🔐', ('html-basics', 4): '🏷️', ('html-basics', 5): '🌍',
  ('html-basics', 6): '✔️',
  ('html-text', 0): '📑', ('html-text', 1): '📄', ('html-text', 2): '🎭',
  ('html-text', 3): '✨', ('html-text', 4): '💬', ('html-text', 5): '🔖',
  ('html-text', 6): '🔤',
  ('html-links-images', 0): '🔗', ('html-links-images', 1): '📍',
  ('html-links-images', 2): '↗️', ('html-links-images', 3): '🖼️',
  ('html-links-images', 4): '♿', ('html-links-images', 5): '📐',
  ('html-links-images', 6): '😴',
  ('html-lists', 0): '📋', ('html-lists', 1): '🔢', ('html-lists', 2): '🪆',
  ('html-lists', 3): '🧱', ('html-lists', 4): '📦', ('html-lists', 5): '📖',
  ('html-lists', 6): '🎨',
  ('html-dom', 0): '📜', ('html-dom', 1): '⬇️', ('html-dom', 2): '🌳',
  ('html-dom', 3): '🍃', ('html-dom', 4): '🎯', ('html-dom', 5): '✏️',
  ('html-dom', 6): '➕', ('html-dom', 7): '⚡',
  ('html-semantic', 0): '🍲', ('html-semantic', 1): '🗺️', ('html-semantic', 2): '🧭',
  ('html-semantic', 3): '📰', ('html-semantic', 4): '🖼️', ('html-semantic', 5): '📐',
  ('html-semantic', 6): '🕐',
  ('html-forms', 0): '📋', ('html-forms', 1): '🏷️', ('html-forms', 2): '📂',
  ('html-forms', 3): '☑️', ('html-forms', 4): '🚀', ('html-forms', 5): '🛡️',
  ('html-forms', 6): '⚙️', ('html-forms', 7): '🗂️', ('html-forms', 8): '🔧',
  ('html-media', 0): '🪟', ('html-media', 1): '🎬', ('html-media', 2): '🔊',
  ('html-media', 3): '🖼️', ('html-media', 4): '💻', ('html-media', 5): '😴',
  ('html-media', 6): '▶️',
  # ── CSS ──────────────────────────────────────────────────────────────────
  ('css-basics', 0): '🌐', ('css-basics', 1): '✏️', ('css-basics', 2): '📋',
  ('css-basics', 3): '📁', ('css-basics', 4): '⛲',
  ('css-box-model', 0): '📦', ('css-box-model', 1): '🔲', ('css-box-model', 2): '🖼️',
  ('css-box-model', 3): '↔️',
  ('css-flexbox', 0): '🧭', ('css-flexbox', 1): '🃏', ('css-flexbox', 2): '🎯',
  ('css-flexbox', 3): '📖',
  ('css-grid', 0): '🗺️', ('css-grid', 1): '🧩', ('css-grid', 2): '📐',
  ('css-grid', 3): '♾️',
  ('css-selectors', 0): '🎯', ('css-selectors', 1): '🌐', ('css-selectors', 2): '🔠',
  ('css-selectors', 3): '🏷️', ('css-selectors', 4): '⚖️', ('css-selectors', 5): '🎭',
  ('css-selectors', 6): '✨',
  ('css-colors-units', 0): '🎨', ('css-colors-units', 1): '🔢', ('css-colors-units', 2): '🔴',
  ('css-colors-units', 3): '🌈', ('css-colors-units', 4): '📏',
  ('css-typography', 0): '🌐', ('css-typography', 1): '🔤', ('css-typography', 2): '📐',
  ('css-typography', 3): '↔️', ('css-typography', 4): '🌍',
  ('css-backgrounds-gradients', 0): '🎨', ('css-backgrounds-gradients', 1): '🖼️',
  ('css-backgrounds-gradients', 2): '📐', ('css-backgrounds-gradients', 3): '🌅',
  ('css-backgrounds-gradients', 4): '🌟',
  ('css-shadows', 0): '🧬', ('css-shadows', 1): '💧', ('css-shadows', 2): '🌫️',
  ('css-shadows', 3): '🕳️', ('css-shadows', 4): '✨',
  ('css-overflow', 0): '💦', ('css-overflow', 1): '✂️', ('css-overflow', 2): '📜',
  ('css-overflow', 3): '💬',
  ('css-display-positioning', 0): '⬇️', ('css-display-positioning', 1): '➡️',
  ('css-display-positioning', 2): '🧩', ('css-display-positioning', 3): '📍',
  ('css-display-positioning', 4): '📌',
  ('css-responsive', 0): '📱', ('css-responsive', 1): '💻', ('css-responsive', 2): '🖥️',
  ('css-responsive', 3): '📲', ('css-responsive', 4): '♻️',
  ('css-images', 0): '💦', ('css-images', 1): '📏', ('css-images', 2): '🖼️',
  ('css-images', 3): '⭕', ('css-images', 4): '📐',
  ('css-custom-properties', 0): '🔒', ('css-custom-properties', 1): '🏷️',
  ('css-custom-properties', 2): '🔑', ('css-custom-properties', 3): '🎯',
  ('css-custom-properties', 4): '🎨',
  ('css-variables-theming', 0): '🔒', ('css-variables-theming', 1): '🌱',
  ('css-variables-theming', 2): '🌙', ('css-variables-theming', 3): '🌓',
  ('css-transforms', 0): '⬜', ('css-transforms', 1): '↔️', ('css-transforms', 2): '🔄',
  ('css-transforms', 3): '🔍', ('css-transforms', 4): '✨',
  ('css-transitions', 0): '⚡', ('css-transitions', 1): '⏱️', ('css-transitions', 2): '🔀',
  ('css-transitions', 3): '📈', ('css-transitions', 4): '🎬', ('css-transitions', 5): '🎯',
  ('css-animations', 0): '⚖️', ('css-animations', 1): '🎬', ('css-animations', 2): '⚡',
  ('css-animations', 3): '🔁', ('css-animations', 4): '⏮️', ('css-animations', 5): '⏭️',
  ('css-tailwind', 0): '🎯', ('css-tailwind', 1): '🏗️', ('css-tailwind', 2): '⚙️',
  ('css-tailwind', 3): '🛠️', ('css-tailwind', 4): '📱',
  ('css-tailwind-layout', 0): '📏', ('css-tailwind-layout', 1): '🎯',
  ('css-tailwind-layout', 2): '🔲', ('css-tailwind-layout', 3): '🔳',
  ('css-tailwind-states', 0): '🎭', ('css-tailwind-states', 1): '🌙',
  ('css-tailwind-advanced', 0): '🔧', ('css-tailwind-advanced', 1): '📚',
  ('css-tailwind-advanced', 2): '🎨', ('css-tailwind-advanced', 3): '📦',
  # ── JS ───────────────────────────────────────────────────────────────────
  ('js-variables', 0): '⏮️', ('js-variables', 1): '📦', ('js-variables', 2): '🔒',
  ('js-variables', 3): '🧬', ('js-variables', 4): '🔍', ('js-variables', 5): '➕',
  ('js-variables', 6): '⚖️', ('js-variables', 7): '🛡️',
  ('js-control-flow', 0): '🔀', ('js-control-flow', 1): '🎚️', ('js-control-flow', 2): '🔁',
  ('js-control-flow', 3): '♻️', ('js-control-flow', 4): '✂️',
  ('js-arrays', 0): '📋', ('js-arrays', 1): '📥', ('js-arrays', 2): '🔄',
  ('js-arrays', 3): '🔽', ('js-arrays', 4): '🗂️', ('js-arrays', 5): '📥',
  ('js-arrays', 6): '✂️', ('js-arrays', 7): '🔧', ('js-arrays', 8): '↩️',
  ('js-arrays', 9): '🔄', ('js-arrays', 10): '🔎', ('js-arrays', 11): '⚡',
  ('js-arrays', 12): '✅',
  ('js-functions', 0): '🏷️', ('js-functions', 1): '🗺️', ('js-functions', 2): '🔝',
  ('js-functions', 3): '➡️', ('js-functions', 4): '🎯', ('js-functions', 5): '🛠️',
  ('js-oop', 0): '🏗️', ('js-oop', 1): '🔨', ('js-oop', 2): '🧬',
  ('js-oop', 3): '🔗', ('js-oop', 4): '👆',
  ('js-timers', 0): '⏱️', ('js-timers', 1): '🔁', ('js-timers', 2): '⛔',
  ('js-event-loop', 0): '🧵', ('js-event-loop', 1): '⚡', ('js-event-loop', 2): '🌐',
  ('js-event-loop', 3): '📭', ('js-event-loop', 4): '🔄', ('js-event-loop', 5): '📚',
  ('js-event-loop', 6): '⚡', ('js-event-loop', 7): '🎡',
  ('js-closures', 0): '📦', ('js-closures', 1): '↩️', ('js-closures', 2): '🚪',
  ('js-closures', 3): '💡', ('js-closures', 4): '🔒',
  ('js-modules', 0): '⚔️', ('js-modules', 1): '📤', ('js-modules', 2): '📦',
  ('js-modules', 3): '🎁',
  ('js-npm-bundlers', 0): '🗄️', ('js-npm-bundlers', 1): '📋', ('js-npm-bundlers', 2): '🎁',
  ('js-npm-bundlers', 3): '⚖️', ('js-npm-bundlers', 4): '🔥',
  ('js-vs-python', 0): '📦', ('js-vs-python', 1): '🔧', ('js-vs-python', 2): '🔀',
  ('js-vs-python', 3): '🧬', ('js-vs-python', 4): '🔁', ('js-vs-python', 5): '🗂️',
  ('js-vs-python', 6): '⏳', ('js-vs-python', 7): '🔤', ('js-vs-python', 8): '📋',
  ('js-vs-python', 9): '🔄', ('js-vs-python', 10): '🛡️',
  # ── HTTP / DB / WebAPI ───────────────────────────────────────────────────
  ('http-request-cycle', 0): '📤', ('http-request-cycle', 1): '🌐',
  ('http-request-cycle', 2): '⚙️', ('http-request-cycle', 3): '🗄️',
  ('http-request-cycle', 4): '📨',
  ('http-rest', 0): '🌐', ('http-rest', 1): '📥', ('http-rest', 2): '➕',
  ('http-rest', 3): '✏️', ('http-rest', 4): '🗑️',
  ('http-ssr-csr', 0): '🖥️', ('http-ssr-csr', 1): '💻', ('http-ssr-csr', 2): '⚖️',
  ('http-ssr-csr', 3): '📦', ('http-ssr-csr', 4): '🔬',
  ('http-status', 0): '🔢', ('http-status', 1): '✅', ('http-status', 2): '↩️',
  ('http-status', 3): '🚫', ('http-status', 4): '💥',
  ('db-intro', 0): '🗄️', ('db-intro', 1): '📊', ('db-intro', 2): '📂',
  ('db-intro', 3): '⚖️', ('db-intro', 4): '📝',
  ('postgres-queries', 0): '📊', ('postgres-queries', 1): '🔍',
  ('postgres-queries', 2): '🔽', ('postgres-queries', 3): '🔀',
  ('postgres-queries', 4): '✂️', ('postgres-queries', 5): '🔗',
  ('postgres-queries', 6): '📈', ('postgres-queries', 7): '📦',
  ('postgres-queries', 8): '⚖️', ('postgres-queries', 9): '🪆',
  ('postgres-joins', 0): '📊', ('postgres-joins', 1): '🔗', ('postgres-joins', 2): '🤝',
  ('postgres-joins', 3): '↩️', ('postgres-joins', 4): '🔀',
  ('postgres-crud', 0): '🏗️', ('postgres-crud', 1): '➕', ('postgres-crud', 2): '✏️',
  ('postgres-crud', 3): '🗑️', ('postgres-crud', 4): '🛡️',
  ('ts-basics', 0): '🌊', ('ts-basics', 1): '🏷️', ('ts-basics', 2): '🔍',
  ('ts-basics', 3): '📋', ('ts-basics', 4): '🔄', ('ts-basics', 5): '📖',
  ('webapi-dom', 0): '🌳', ('webapi-dom', 1): '🎯', ('webapi-dom', 2): '➕',
  ('webapi-dom', 3): '✏️', ('webapi-dom', 4): '🔗', ('webapi-dom', 5): '🔎',
  ('webapi-dom', 6): '📋', ('webapi-dom', 7): '🏷️', ('webapi-dom', 8): '💾',
  ('webapi-fetch', 0): '🌐', ('webapi-fetch', 1): '🔮', ('webapi-fetch', 2): '📨',
  ('webapi-fetch', 3): '📦', ('webapi-fetch', 4): '⏳', ('webapi-fetch', 5): '📥',
  ('webapi-fetch', 6): '📤', ('webapi-fetch', 7): '🌐', ('webapi-fetch', 8): '🛡️',
  ('webapi-fetch', 9): '⛔',
  ('webapi-events', 0): '⚡', ('webapi-events', 1): '👂', ('webapi-events', 2): '📦',
  ('webapi-events', 3): '🫧', ('webapi-events', 4): '🛑', ('webapi-events', 5): '🎯',
  ('webapi-events', 6): '📡', ('webapi-events', 7): '✉️', ('webapi-events', 8): '🗂️',
  ('webapi-storage', 0): '💾', ('webapi-storage', 1): '📥', ('webapi-storage', 2): '📤',
  ('webapi-storage', 3): '♾️', ('webapi-storage', 4): '🕐', ('webapi-storage', 5): '⚖️',
  ('webapi-storage', 6): '🔧', ('webapi-storage', 7): '🛡️', ('webapi-storage', 8): '🚫',
  # ── TypeScript ──────────────────────────────────────────────────────────
  ('ts-interfaces', 0): '📋', ('ts-interfaces', 1): '❓', ('ts-interfaces', 2): '🧬',
  ('ts-interfaces', 3): '✅', ('ts-interfaces', 4): '🗂️',
  ('ts-generics', 0): '🔒', ('ts-generics', 1): '🔄', ('ts-generics', 2): '🧠',
  ('ts-generics', 3): '📋', ('ts-generics', 4): '⛓️',
  ('ts-utility-types', 0): '🔧', ('ts-utility-types', 1): '✂️',
  ('ts-utility-types', 2): '🗂️', ('ts-utility-types', 3): '🔽',
  ('ts-arrays', 0): '📋', ('ts-arrays', 1): '🗂️', ('ts-arrays', 2): '📏',
  ('ts-arrays', 3): '🏷️',
  ('ts-classes', 0): '🏗️', ('ts-classes', 1): '🔒', ('ts-classes', 2): '🔐',
  ('ts-classes', 3): '🧬', ('ts-classes', 4): '🎭',
  ('ts-enums', 0): '🔢', ('ts-enums', 1): '🔤', ('ts-enums', 2): '🛡️',
  ('ts-enums', 3): '🔑',
  ('ts-type-assertion', 0): '🏷️', ('ts-type-assertion', 1): '📨',
  ('ts-type-assertion', 2): '⚠️',
  ('ts-react', 0): '🏷️', ('ts-react', 1): '🔄', ('ts-react', 2): '🔗',
  ('ts-react', 3): '⚡',
  ('ts-zod', 0): '📋', ('ts-zod', 1): '🛡️',
  # ── React ────────────────────────────────────────────────────────────────
  ('react-components', 0): '📄', ('react-components', 1): '🔀',
  ('react-components', 2): '🧩', ('react-components', 3): '🪆',
  ('react-components', 4): '🔽', ('react-components', 5): '⚡',
  ('react-components', 6): '❓', ('react-components', 7): '📋',
  ('react-state', 0): '🔄', ('react-state', 1): '🪝', ('react-state', 2): '🔁',
  ('react-state', 3): '🔒', ('react-state', 4): '📏', ('react-state', 5): '🔧',
  ('react-state', 6): '🗂️',
  ('react-useeffect', 0): '🌊', ('react-useeffect', 1): '1️⃣',
  ('react-useeffect', 2): '👁️', ('react-useeffect', 3): '🧹',
  ('react-useeffect', 4): '📋', ('react-useeffect', 5): '⏳',
  ('react-useeffect', 6): '🚫',
  ('react-router', 0): '🧭', ('react-router', 1): '🌍', ('react-router', 2): '🗺️',
  ('react-router', 3): '🔗', ('react-router', 4): '📍', ('react-router', 5): '📐',
  ('react-router', 6): '🏠',
  ('react-context', 0): '💧', ('react-context', 1): '🌱', ('react-context', 2): '🔌',
  ('react-context', 3): '🤔', ('react-context', 4): '⚡', ('react-context', 5): '📤',
  ('react-context', 6): '🔗',
  ('react-router-advanced', 0): '⚖️', ('react-router-advanced', 1): '🗺️',
  ('react-data-fetching', 0): '💧', ('react-data-fetching', 1): '🔄',
  ('react-data-fetching', 2): '🚀', ('react-data-fetching', 3): '⏸️',
  ('react-data-fetching', 4): '⚡',
  ('react-mutations', 0): '📤', ('react-mutations', 1): '⚡',
  ('react-mutations', 2): '📋', ('react-mutations', 3): '⏳',
  ('react-mutations', 4): '🛡️', ('react-mutations', 5): '🔄',
  ('react-tanstack-query', 0): '💾', ('react-tanstack-query', 1): '🕐',
  ('react-tanstack-query', 2): '🔍',
  # ── Next.js ──────────────────────────────────────────────────────────────
  ('nextjs-basics', 0): '🏗️', ('nextjs-basics', 1): '📁', ('nextjs-basics', 2): '⚖️',
  ('nextjs-basics', 3): '🌊', ('nextjs-basics', 4): '⚡',
  ('nextjs-routing', 0): '📁', ('nextjs-routing', 1): '🔀', ('nextjs-routing', 2): '📦',
  ('nextjs-routing', 3): '🌊',
  ('nextjs-layouts', 0): '🪆', ('nextjs-layouts', 1): '📄', ('nextjs-layouts', 2): '🏷️',
  ('nextjs-navigation', 0): '🔗', ('nextjs-navigation', 1): '🧭',
  ('nextjs-navigation', 2): '📍', ('nextjs-navigation', 3): '↩️',
  ('nextjs-server-components', 0): '🖥️', ('nextjs-server-components', 1): '🗄️',
  ('nextjs-server-components', 2): '🚫', ('nextjs-server-components', 3): '🧩',
  ('nextjs-client-components', 0): '🎛️', ('nextjs-client-components', 1): '💧',
  ('nextjs-client-components', 2): '🍃',
  ('nextjs-suspense', 0): '⏳', ('nextjs-suspense', 1): '🌊', ('nextjs-suspense', 2): '🛡️',
  ('nextjs-data-fetching', 0): '🌐', ('nextjs-data-fetching', 1): '⏱️',
  ('nextjs-server-actions', 0): '📤', ('nextjs-server-actions', 1): '⏳',
  ('nextjs-server-actions', 2): '🔌',
  ('nextjs-route-handlers', 0): '📄', ('nextjs-route-handlers', 1): '📨',
  ('nextjs-route-handlers', 2): '⚖️',
  # ── Testing/CI ───────────────────────────────────────────────────────────
  ('testing-ci', 0): '📊', ('testing-ci', 1): '📖',
  ('testing-ci', 2): '🔄', ('testing-ci', 3): '🚀',
}

with open('src/data/topics.ts') as f:
    content = f.read()

topic_matches = list(re.finditer(r"^  \{\n    id: '([^']+)'", content, re.MULTILINE))

insertions = []

for i, tm in enumerate(topic_matches):
    tid = tm.group(1)
    t_start = tm.start()
    t_end = topic_matches[i+1].start() if i+1 < len(topic_matches) else len(content)
    t_block = content[t_start:t_end]

    expl_m = re.search(r"type: 'explanation'.*?steps: \[(.*?)\]\s*\}", t_block, re.DOTALL)
    if not expl_m:
        continue

    expl_start = t_start + expl_m.start()
    expl_end   = t_start + expl_m.end()
    expl_text  = content[expl_start:expl_end]

    for step_m in re.finditer(r'animationStep:\s*(\d+)', expl_text):
        step_num = int(step_m.group(1))
        key = (tid, step_num)
        if key not in ICONS:
            continue

        step_start_in_expl = step_m.start()
        heading_m = re.search(r"(heading:\s*'[^']*')", expl_text[step_start_in_expl:step_start_in_expl + 600])
        if not heading_m:
            continue

        between = expl_text[step_start_in_expl: step_start_in_expl + heading_m.end()]
        if 'icon:' in between:
            continue

        insert_pos = expl_start + step_start_in_expl + heading_m.end()
        insertions.append((insert_pos, f",\n          icon: '{ICONS[key]}'"))

insertions.sort(key=lambda x: x[0], reverse=True)
result = content
for pos, text in insertions:
    result = result[:pos] + text + result[pos:]

with open('src/data/topics.ts', 'w') as f:
    f.write(result)

print(f'Inserted {len(insertions)} icon fields')
