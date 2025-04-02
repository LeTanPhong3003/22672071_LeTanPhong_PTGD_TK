import React, { useEffect, useState } from 'react';
import './GridLayout.css';
import selectionIcon from '/img/overview_icon.jpg';
import turnoverIcon from '/img/turnover.jpg';
import profitIcon from '/img/profit.jpg';
import customerIcon from '/img/customer.jpg';

const GridLayout = () => {
    const [data, setData] = useState({ turnover: 0, turnoverChange: 0, profit: 0, profitChange: 0, newCustomer: 0, newCustomerChange: 0 });

    useEffect(() => {
        fetch('https://67ecb150aa794fb3222e75c0.mockapi.io/Overview')
            .then(response => response.json())
            .then(data => {
                const latest = data[data.length - 1];
                const previous = data[data.length - 2];

                setData({
                    turnover: latest.Turnover,
                    turnoverChange: ((latest.Turnover - previous.Turnover) / previous.Turnover * 100).toFixed(2),
                    profit: latest.Profit,
                    profitChange: ((latest.Profit - previous.Profit) / previous.Profit * 100).toFixed(2),
                    newCustomer: latest.Newcustomer,
                    newCustomerChange: ((latest.Newcustomer - previous.Newcustomer) / previous.Newcustomer * 100).toFixed(2)
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
                <div className="overview-header">
                    <h2><img src={selectionIcon} alt="Overview Icon" className="icon" /> Overview</h2>
                </div>
                <div className="nested-grid-container">
                    <div className="nested-grid-item">
                        <div className="item-header">
                            <p className="title">Turnover</p>
                            <button className="icon-button"><img src={turnoverIcon} alt="Turnover Icon" /></button>
                        </div>
                        <p className="data">${data.turnover}</p>
                        <p className="change">{data.turnoverChange}% period of change</p>
                    </div>
                    <div className="nested-grid-item">
                        <div className="item-header">
                            <p className="title">Profit</p>
                            <button className="icon-button"><img src={profitIcon} alt="Profit Icon" /></button>
                        </div>
                        <p className="data">${data.profit}</p>
                        <p className="change">{data.profitChange}% period of change</p>
                    </div>
                    <div className="nested-grid-item">
                        <div className="item-header">
                            <p className="title">New Customer</p>
                            <button className="icon-button"><img src={customerIcon} alt="Customer Icon" /></button>
                        </div>
                        <p className="data">{data.newCustomer}</p>
                        <p className="change">{data.newCustomerChange}% period of change</p>
                    </div>
                </div>
            </div>
            <div className="grid-item item4">DataTable</div>
        </div>
    );
};

export default GridLayout;