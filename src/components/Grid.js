import React, { useState, useEffect } from "react";
import Node from "./Node";
import "./Grid.css";

const cols = 15;
const rows = 5;
const start_row = 0;
const start_col = 0;
const end_row = rows- 1;
const end_col = cols - 1;
const Grid = () => {
    const [Grid, setGrid] = useState([]);
    useEffect(() => {
        createGrid();
    }, []);
    const createGrid = () => {
        const grid = new Array(rows);
        for (let i = 0; i < rows; i++) {
            grid [i] = new Array(cols);
        }
        createPoint(grid);
        setGrid(grid);
    };
    const createPoint = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Point(i, j);
            }
        }
    };
    function Point(i, j) {
        this.x = i;
        this.y = j;
        this.isStart = this.x === start_row && this.y === start_col;
        this.isEnd = this.x === end_row && this.y === end_col;
    }
    const nodeGrid = (
        <div>
            {Grid.map((row, rowIndex) => {
            return (
                <div key={rowIndex} class = "rowWrapper">
                    {row.map((col, colIndex) => {
                        const {isStart, isEnd} = col;
                        return <Node key={colIndex}  isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex}/>;
                    })}
                </div>
            );
            })}
        </div>
    );
    return (
        <div className = "wrapper">
            <h1>Path Finder</h1>
            {nodeGrid}
        </div>
    );
};

export default Grid;