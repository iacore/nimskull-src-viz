import re, json, sys

FILE = "/home/user/computing/lang/nimskull/compiler/nim.dot"

nodes = set()
links = []

for line in open(FILE):
    match = re.match(r'"(.+)" -> "(.+)";', line.strip())
    if not match: continue
    source, target = match[1], match[2]
    nodes.add(source)
    nodes.add(target)
    links.append({
        'source': source,
        'target': target,
    })


json.dump({
    'nodes': list(map(lambda x:{'id':x, 'name': x}, nodes)),
    'links': links,
}, sys.stdout)
