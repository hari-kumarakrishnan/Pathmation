function AStar(startNode, endNode) {
    let openList = [];
    let closedList = [];
    let path = [];
    let VisitedNodes = [];
    openList.push(startNode);
    while (openList.length > 0) {
        let low = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < openList[low].f) {
                low = i;
            }
        }
        let current = openList[low];
        VisitedNodes.push(current);
        if (current === endNode) {
            let temp = current;
            path.push(temp.previous);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
            path.shift();
            VisitedNodes.shift();
            return {path, VisitedNodes}; 
        }
        openList = openList.filter((elt) => elt !== current);
        closedList.push(current);
        let neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!(closedList.includes(neighbor)) && !neighbor.isWall) {
                let tempG = current.g + 1;
                let newPath = false;
                if (openList.includes(neighbor)){
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                }
                else {
                    neighbor.g = tempG;
                    newPath = true;
                    openList.push(neighbor);
                }
                if (newPath) {
                    neighbor.h = Heuristic(neighbor, endNode);
                    neighbor.f = neighbor.h + neighbor.g;
                    neighbor.previous = current;

                }
            }
        }
    }
    alert("No path exists between the two nodes")
    return {path, VisitedNodes};
}
function Heuristic(pos0, pos1) {
    var a = Math.abs(pos1.x - pos0.x);
    var b = Math.abs(pos1.y - pos0.y);
    return a + b;
}
// function reverse(path) {
//     let revPath = [];
//     for (let i = path.length - 1; i >= 0; i--) {
//         revPath.push(path[i]);
//     }
//     return revPath;
// }
export default AStar;