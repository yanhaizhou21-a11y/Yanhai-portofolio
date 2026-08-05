import json
from pathlib import Path
from graphify.build import build_from_json
from graphify.export import to_html

def main():
    extraction = json.loads(Path('graphify-out/.graphify_extract.json').read_text(encoding="utf-8"))
    analysis = json.loads(Path('graphify-out/.graphify_analysis.json').read_text(encoding="utf-8"))
    labels = json.loads(Path('graphify-out/.graphify_labels.json').read_text(encoding="utf-8"))
    
    G = build_from_json(extraction, root='c:/di/portofolio', directed=False)
    communities = {int(k): v for k, v in analysis['communities'].items()}
    labels = {int(k): v for k, v in labels.items()}

    out_path = Path('graphify-out/graph.html')
    to_html(G, communities, str(out_path), community_labels=labels)
    print(f'HTML generated at {out_path}')

if __name__ == '__main__':
    main()
