#!/usr/bin/env python3
"""
Process HTML guide files to add staggered section animations.
"""

import re
import os

files = [
    "/sessions/relaxed-friendly-noether/mnt/web-dev-guide/html-guide.html",
    "/sessions/relaxed-friendly-noether/mnt/web-dev-guide/css-guide.html",
    "/sessions/relaxed-friendly-noether/mnt/web-dev-guide/architecture.html",
    "/sessions/relaxed-friendly-noether/mnt/web-dev-guide/project-structure.html",
]

def process_file(filepath):
    """Process a single HTML file to add animation delays."""

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Find all <section class="section"> tags (with or without existing attributes)
    # Pattern: <section class="section" followed by optional attributes and >
    pattern = r'<section\s+class="section"([^>]*)>'

    section_count = 0

    def replace_section(match):
        nonlocal section_count
        section_count += 1

        # Get existing attributes
        existing_attrs = match.group(1)

        # Calculate animation delay
        delay_value = section_count * 0.1
        animation_delay = f'animation-delay: {delay_value:.1f}s;'

        # Check if animation-delay already exists
        if 'animation-delay' in existing_attrs:
            # Replace existing animation-delay
            new_attrs = re.sub(
                r'animation-delay:\s*[\d.]+s;?',
                animation_delay,
                existing_attrs
            )
        else:
            # Add new animation-delay
            if existing_attrs.strip():
                # If there are existing attributes, add style attribute or append to it
                if 'style=' in existing_attrs:
                    # Insert animation-delay into existing style attribute
                    new_attrs = re.sub(
                        r'style="([^"]*)"',
                        lambda m: f'style="{m.group(1)} {animation_delay}"' if m.group(1).strip() else f'style="{animation_delay}"',
                        existing_attrs
                    )
                else:
                    # Add new style attribute
                    new_attrs = existing_attrs + f' style="{animation_delay}"'
            else:
                # No existing attributes, add style attribute
                new_attrs = f' style="{animation_delay}"'

        return f'<section class="section"{new_attrs}>'

    # Replace all section tags
    new_content = re.sub(pattern, replace_section, content)

    # Write back to file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✓ {os.path.basename(filepath)}: Added/updated animation delays for {section_count} sections")
    return section_count

# Process all files
print("Processing HTML guide files for staggered section animations...\n")

for filepath in files:
    if os.path.exists(filepath):
        count = process_file(filepath)
    else:
        print(f"✗ {filepath} not found")

print("\n✓ All files processed successfully!")
