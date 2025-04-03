import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import selectionIcon from "/img/overview_icon.jpg";
import turnoverIcon from "/img/turnover.jpg";
import profitIcon from "/img/profit.jpg";
import customerIcon from "/img/customer.jpg";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const GridLayout = () => {
  const [data, setData] = useState({
    turnover: 0,
    turnoverChange: 0,
    profit: 0,
    profitChange: 0,
    newCustomer: 0,
    newCustomerChange: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState(null);

  useEffect(() => {
    // Fetch data for overview
    fetch("https://67ecb150aa794fb3222e75c0.mockapi.io/Overview")
      .then((response) => response.json())
      .then((data) => {
        const latest = data[data.length - 1];
        const previous = data[data.length - 2];

        setData({
          turnover: latest.Turnover,
          turnoverChange: (
            ((latest.Turnover - previous.Turnover) / previous.Turnover) *
            100
          ).toFixed(2),
          profit: latest.Profit,
          profitChange: (
            ((latest.Profit - previous.Profit) / previous.Profit) *
            100
          ).toFixed(2),
          newCustomer: latest.Newcustomer,
          newCustomerChange: (
            ((latest.Newcustomer - previous.Newcustomer) /
              previous.Newcustomer) *
            100
          ).toFixed(2),
        });
      })
      .catch((error) => console.error("Error fetching overview data:", error));

    // Fetch data for DataTable
    fetch("https://67ecb150aa794fb3222e75c0.mockapi.io/datatable")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          customerName: item.name,
          company: item.company,
          orderValue: `$${parseFloat(item.oderValue).toFixed(2)}`,
          orderDate: new Date(item.oderDate).toLocaleDateString(),
          status: item.status ? "Completed" : "In-progress",
          avatar: item.avatar,
        }));
        setTableData(formattedData);
      })
      .catch((error) => console.error("Error fetching table data:", error));
  }, []);

  return (
    <div className="grid-container">
      <div className="grid-item item1">
        LOGO
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/message">Message</Link>
        <Link to="/integrations">Integrations</Link>
      </div>
      <div className="grid-item item2 header">
        <h1 className="header-title">Dashboard</h1>
        <div className="header-actions">
          <input type="text" placeholder="Search..." className="search-input" />
          <img
            src="/img/notification.jpg"
            alt="Notification"
            className="notification-icon"
          />
          <img src="/img/help.jpg" alt="Help" className="help-icon" />
          <img
            src="https://loremflickr.com/40/40?lock=1"
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </div>
      <div className="grid-item item3">
        <div className="overview-header">
          <h2>
            <img src={selectionIcon} alt="Overview Icon" className="icon" />{" "}
            Overview
          </h2>
        </div>
        <div className="nested-grid-container">
          <div className="nested-grid-item">
            <div className="item-header">
              <p className="title">Turnover</p>
              <button className="icon-button">
                <img src={turnoverIcon} alt="Turnover Icon" />
              </button>
            </div>
            <p className="data">${data.turnover}</p>
            <p className="change">{data.turnoverChange}% period of change</p>
          </div>
          <div className="nested-grid-item">
            <div className="item-header">
              <p className="title">Profit</p>
              <button className="icon-button">
                <img src={profitIcon} alt="Profit Icon" />
              </button>
            </div>
            <p className="data">${data.profit}</p>
            <p className="change">{data.profitChange}% period of change</p>
          </div>
          <div className="nested-grid-item">
            <div className="item-header">
              <p className="title">New Customer</p>
              <button className="icon-button">
                <img src={customerIcon} alt="Customer Icon" />
              </button>
            </div>
            <p className="data">{data.newCustomer}</p>
            <p className="change">{data.newCustomerChange}% period of change</p>
          </div>
        </div>
      </div>
      <div className="grid-item item4">
        <DataTable
          value={tableData}
          paginator
          rows={10}
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value)}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3em" }}
          ></Column>
          <Column
            header="CUSTOMER NAME"
            body={(rowData) => (
              <div className="customer-name-column">
                <img
                  src={rowData.avatar}
                  alt="Avatar"
                  className="customer-avatar"
                />
                <span>{rowData.customerName}</span>
              </div>
            )}
            sortable
          ></Column>
          <Column field="company" header="COMPANY" sortable></Column>
          <Column field="orderValue" header="ORDER VALUE" sortable></Column>
          <Column field="orderDate" header="ORDER DATE" sortable></Column>
          <Column field="status" header="STATUS" sortable></Column>
          <Column
            header="EDIT"
            body={() => (
              <button className="edit-button">
                <img src="/img/pen.jpg" alt="Edit" className="edit-icon" />
              </button>
            )}
            style={{ textAlign: "center", width: "5em" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default GridLayout;
