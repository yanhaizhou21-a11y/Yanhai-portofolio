import json
from pathlib import Path
from graphify.build import build_from_json
from graphify.cluster import score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate

def main():
    extraction = json.loads(Path('graphify-out/.graphify_extract.json').read_text(encoding="utf-8"))
    detection  = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding="utf-8"))
    analysis   = json.loads(Path('graphify-out/.graphify_analysis.json').read_text(encoding="utf-8"))

    G = build_from_json(extraction, root='c:/di/portofolio', directed=False)
    communities = {int(k): v for k, v in analysis['communities'].items()}
    cohesion = {int(k): v for k, v in analysis['cohesion'].items()}
    tokens = {'input': extraction.get('input_tokens', 0), 'output': extraction.get('output_tokens', 0)}

    labels = {
        0: "Dev Dependencies",
        1: "Pages and Portfolio Data",
        2: "Dependencies",
        3: "Auth and Routing",
        4: "Admin UI and Navbar",
        5: "Package Scripts",
        6: "Firebase Integration",
        7: "GSAP Animations",
        8: "ImageTrail Component",
        9: "FlipbookImage Component",
        10: "PageTransition Component",
        11: "DecryptedText Component",
        12: "Magnet Component",
        13: "SplitText Component",
        14: "Spotlight Component",
        15: "SmoothScroll Component",
        16: "Vercel Config",
        17: "ESLint Config",
        18: "Vite Config"
    }

    questions = suggest_questions(G, communities, labels)

    report = generate(G, communities, cohesion, labels, analysis['gods'], analysis['surprises'], detection, tokens, 'c:/di/portofolio', suggested_questions=questions)
    Path('graphify-out/GRAPH_REPORT.md').write_text(report, encoding="utf-8")
    Path('graphify-out/.graphify_labels.json').write_text(json.dumps({str(k): v for k, v in labels.items()}, ensure_ascii=False), encoding="utf-8")
    print('Report updated with community labels')

if __name__ == '__main__':
    main()
