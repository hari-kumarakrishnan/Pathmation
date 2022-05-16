import React, { useState, useEffect } from "react";
import Node from "./Node";
import "./Grid.css";
import BFS from "../algorithms/BFS";
import { isCompositeComponent } from "react-dom/test-utils";

const cols = 10;
const rows = 10;
const start_row = 0;
const start_col = 0;
const end_row = 9;
const end_col = 9;
const Grid = () => {
    const [Grid, setGrid] = useState([]);
    const [VisitedNodes, setVisitedNodes] = useState([]);
    const[Path, setPath] = useState([]);
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
        let vis = BFS(startNode, endNode);
        setVisitedNodes(vis.VisitedNodes);
        setPath(vis.path);
        
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
        this.isStart = this.x === start_row && this.y === start_col;
        this.isEnd = this.x === end_row && this.y === end_col;
        this.neighbors = [];
        this.isWall = false;
        this.previous = undefined;
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
    const visualizePath = () => {
        for (let i = 0; i <= VisitedNodes.length; i++) {  
            const node = VisitedNodes[i];
            if (i === VisitedNodes.length) {
                setTimeout(() => {
                    visualizeShortestPath(Path);
                }, 20* i);
                break;
            }
            else {
                if (node !== EndNode) {
                    setTimeout(() => {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node visited";
                    }, 20 * i);
                }
            }
        }
    };
    const visualizeShortestPath = (ShortestPathNodes) => {
        console.log(ShortestPathNodes);
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
        
    };
    const clearBoard = () => {
        for (let i = 0; i < VisitedNodes.length; i++) {            
            const node = VisitedNodes[i];
            if (node !== StartNode && node !== EndNode) {
                document.getElementById(`node-${node.x}-${node.y}`).className = "node";
            }
        }
    }
    return (
        <div className = "wrapper">
            <div className = "wrapper-buttons">
                <button onClick={visualizePath}>Visualize</button>
                <button onClick={addObstacles}>Add Obstacles</button>
                <button onClick={clearBoard}>Clear</button>
            </div>            
            <h1>Path Finder</h1>
            {nodeGrid}
        </div>
    );
};

export default Grid;