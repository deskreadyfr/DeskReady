import re
from pathlib import Path

FOLDER = Path(r"C:\Users\adamc\Desktop\DeskReady\pagesHTML\DeskReadyC")

REPLACEMENTS = {
    "index.html": "/",
    "blog.html": "/blog.html",
    "career-tracker.html": "/career-tracker.html",
    "pricer.html": "/pricer.html",
    "data-room.html": "/data-room.html",
    "banques.html": "/banques.html",
    "mentions-legales.html": "/mentions-legales.html",
}

# Matches href="filename.html" or href="filename.html#anchor"
HREF_PATTERN = re.compile(r'href="([^"]+\.html(?:#[^"]*)?)"')

def replace_href(match):
    original = match.group(1)
    # Split on # to handle anchors
    parts = original.split("#", 1)
    filename = parts[0]
    anchor = "#" + parts[1] if len(parts) > 1 else ""

    if filename in REPLACEMENTS:
        new_path = REPLACEMENTS[filename]
        # For "/" don't append anchor as "/index.html#foo" → "/#foo"
        return f'href="{new_path}{anchor}"'

    return match.group(0)  # Leave unchanged if not in our list

html_files = list(FOLDER.glob("*.html"))
print(f"Found {len(html_files)} HTML files\n")

for filepath in html_files:
    content = filepath.read_text(encoding="utf-8")
    new_content = HREF_PATTERN.sub(replace_href, content)

    changes = sum(1 for a, b in zip(
        HREF_PATTERN.findall(content),
        HREF_PATTERN.findall(new_content)
    ) if a != b)

    if content != new_content:
        filepath.write_text(new_content, encoding="utf-8")
        print(f"[OK] {filepath.name} - liens mis a jour")
    else:
        print(f"     {filepath.name} - aucun changement")

print("\nTermine.")
