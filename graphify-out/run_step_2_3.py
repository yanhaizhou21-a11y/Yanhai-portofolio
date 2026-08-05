import json
import sys
from graphify.detect import detect
from graphify.extract import collect_files, extract
from graphify.cache import check_semantic_cache
from pathlib import Path

def main():
    root_path = Path('c:/di/portofolio')
    detect_result = detect(root_path)

    detect_file = Path('graphify-out/.graphify_detect.json')
    detect_file.write_text(json.dumps(detect_result, ensure_ascii=False), encoding='utf-8')

    code_files = []
    for f in detect_result.get('files', {}).get('code', []):
        f_path = Path(f)
        code_files.extend(collect_files(f_path) if f_path.is_dir() else [f_path])

    if code_files:
        ast_result = extract(code_files, cache_root=root_path)
        Path('graphify-out/.graphify_ast.json').write_text(json.dumps(ast_result, indent=2, ensure_ascii=False), encoding='utf-8')
        print(f'AST: {len(ast_result["nodes"])} nodes, {len(ast_result["edges"])} edges')
    else:
        Path('graphify-out/.graphify_ast.json').write_text(json.dumps({'nodes':[],'edges':[],'input_tokens':0,'output_tokens':0}, ensure_ascii=False), encoding='utf-8')
        print('No code files - skipping AST extraction')

    all_files = [f for cat in ('document', 'paper', 'image') for f in detect_result.get('files', {}).get(cat, [])]
    prompt_file = Path('c:/di/portofolio/.agents/skills/graphify/references/extraction-spec.md')
    cached_nodes, cached_edges, cached_hyperedges, uncached = check_semantic_cache(all_files, root=root_path, prompt_file=str(prompt_file))

    if cached_nodes or cached_edges or cached_hyperedges:
        Path('graphify-out/.graphify_cached.json').write_text(json.dumps({'nodes': cached_nodes, 'edges': cached_edges, 'hyperedges': cached_hyperedges}, ensure_ascii=False), encoding='utf-8')
    else:
        Path('graphify-out/.graphify_cached.json').unlink(missing_ok=True)
    Path('graphify-out/.graphify_uncached.txt').write_text('\n'.join(uncached), encoding='utf-8')
    print(f'Cache: {len(all_files)-len(uncached)} files hit, {len(uncached)} files need extraction')

if __name__ == '__main__':
    main()
