import React from 'react';
import './GridLayout.css';

const GridLayout = () => {
    return (
        <div className="grid-container">
            <div className="grid-item item1">
                LOGO
                <a href="">Dashboard</a>
                <a href="">Projects</a>
                <a href="">Teams</a>
                <a href="">Analytics</a>
                <a href="">Message</a>
                <a href="">Integrations</a>
            </div>
            <div className="grid-item item2">Header</div>
            <div className="grid-item item3">
                <div className="nested-grid-container">
                    <div className="nested-grid-item">Turnover</div>
                    <div className="nested-grid-item">Profit</div>
                    <div className="nested-grid-item">New customer</div>
                </div>
            </div>
            <div className="grid-item item4">DataTable</div>
        </div>
    );
};

export default GridLayout;