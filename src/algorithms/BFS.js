function BFS(startNode, endNode) {
    let VisitedNodes = [];
    let queue = [];
    queue.push(startNode);
    let path = [];
    while (queue.length !== 0) {
        let current = queue.shift();
        let neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            if (current === endNode) {
                path = tracePath(endNode);
                return {path, VisitedNodes};
            }
            let neighbor = neighbors[i];
            if (!(VisitedNodes.includes(neighbor)) && neighbor !== startNode) {
                if (neighbor.isWall === false) {
                    neighbor.previous = current;
                    queue.push(neighbor);
                    VisitedNodes.push(neighbor);
                }
            }
        }
    }
    return [];
}
function tracePath(node) {
    let n = node;
    let path = [];
    while (n !== undefined) {
        path.push(n);
        n = n.previous;
    }
    let revPath = [];
    for (let i = path.length - 1; i >= 0; i--) {
        revPath.push(path[i]);
    }
    return revPath;
}
export default BFS;