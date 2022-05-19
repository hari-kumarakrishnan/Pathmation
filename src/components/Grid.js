import React, { useState, useEffect } from "react";
import Node from "./Node";
import "./Grid.css";
import BFS from "../algorithms/BFS";
import AStar from "../algorithms/AStar";
import { isClickableInput } from "@testing-library/user-event/dist/utils";
const cols = 16;
const rows = 16;
const start_row = 0;
const start_col = 0;
const end_row = 15;
const end_col = 9;
const Grid = () => {
    const [Grid, setGrid] = useState([]);
    const [EndNode, setEnd] = useState([]);
    const [StartNode, setStart] = useState([]);
    useEffect(() => {
        createGrid();
    }, []);
    const createGrid = () => {
        const grid = new Array(rows);
        for (let i = 0; i < rows; i++) {
            grid [i] = new Array(cols);
        }
        createPoint(grid);
        addNeighbors(grid);
        const startNode = grid[start_row][start_col];
        const endNode = grid[end_row][end_col];
        setEnd(endNode);
        setStart(startNode);
        setGrid(grid);
    };

    const createPoint = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Point(i, j);
            }
        }
    };
    const addNeighbors = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j =0; j < cols; j++) {
                grid[i][j].addNeighbors(grid);
            }
        }
    }
    function Point(i, j) {
        this.x = i;
        this.y = j;
        this.isWall = false;
        this.isStart = this.x === start_row && this.y === start_col;
        this.isEnd = this.x === end_row && this.y === end_col;
        this.neighbors = [];
        this.previous = undefined;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.addNeighbors = function(grid)
        {
            let i = this.x;
            let j = this.y;
            if (i > 0) {
                this.neighbors.push(grid[i-1][j]);
            }
            if (i < rows - 1) {
                this.neighbors.push(grid[i+1][j]);
            }
            if (j > 0) {
                this.neighbors.push(grid[i][j-1]);
            }
            if (j < cols - 1) {
                this.neighbors.push(grid[i][j+1]);
            } 
        }
    }
    const nodeGrid = (
        <div>
            {Grid.map((row, rowIndex) => {
            return (
                <div key={rowIndex} className= "rowWrapper">
                    {row.map((col, colIndex) => {
                        const {isStart, isEnd, isWall} = col;
                        return <Node key={colIndex}  isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWall={isWall}/>;
                    })}
                </div>
            );
            })}
        </div>
    );
    const visualizePath = (VisitedNodes, Path) => {
        let i = 0;
        while (VisitedNodes.length != 0) {  
            const node = VisitedNodes.shift();
            if (VisitedNodes.length === 0) {
                setTimeout(() => {
                    visualizeShortestPath(Path);
                }, 20* i);
            }
            else {
                if (node !== EndNode) {
                    setTimeout(() => {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node visited";
                    }, 20 * i);
                }
            }
            i += 1;
        }
    };
    const visualizeShortestPath = (ShortestPathNodes) => {
        for (let i = 0; i < ShortestPathNodes.length; i++) {  
            const node = ShortestPathNodes[i];
            if (node !== EndNode && node !== StartNode) {
                setTimeout(() => {
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
                }, 10 * i);
            }
        }
    };
    const addObstacles = () => {
        clearBoard();
        for (let i = 0; i < rows; i++) {
            for (let j =0; j < cols; j++) {
                if (Math.random(1) < 0.15 ) {
                    const node = Grid[i][j];
                    if (node !== StartNode && node !== EndNode) {
                        node.isWall = true;
                        document.getElementById(`node-${node.x}-${node.y}`).className = "node iswall";
                    }
                }
            }
        }
        addNeighbors(Grid);
    };
    function clearBoard() {
     //   if (!Status) {
            for (let i = 0; i < rows; i++) {
                for (let j =0; j < cols; j++) {
                    let node = Grid[i][j];
                    node.isWall=false;
                    if (node !== StartNode && node !== EndNode) {
                        document.getElementById(`node-${node.x}-${node.y}`).className = "node";
                    }
                }
            }
     //   }   
        addNeighbors(Grid);
    }
    function visualize()
    {  
        let radios = document.getElementById('algs').getElementsByTagName('input');
        console.log(radios);
        for (let i of radios) {
            if (i.value === "A" && i.checked) {
                let vis = AStar(StartNode, EndNode);
                let VisitedNodes = vis.VisitedNodes;
                let Path = vis.path;
                visualizePath(VisitedNodes, Path);
                break;
            }
            else if (i.value === "BFS" && i.checked) {
                let vis = BFS(StartNode, EndNode);
                let VisitedNodes = vis.VisitedNodes;
                let Path = vis.path;
                visualizePath(VisitedNodes, Path);
                break;
            }
        }
    }
    return (
        <div className = "wrapper">
            <div className = "wrapper-buttons">
                <button onClick={visualize}>Visualize</button>
                <button onClick={addObstacles}>Add Obstacles</button>
                <button onClick={clearBoard}>Clear</button>
            </div> 
            <fieldset>
                <legend>Choose an algorithm!</legend>
                <div id = "algs">
                    <input type="radio" id="algorithm" value="A" name="algorithm"/> A*
                    <input type="radio" id="algorithm" value="BFS" name="algorithm"/> BFS
                </div>
            </fieldset>           
           <h1>Path Finder</h1>
            {nodeGrid}
        </div>
    );
};

export default Grid;