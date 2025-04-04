import React, { useEffect, useState } from "react";
import selectionIcon from "/img/overview_icon.jpg";
import turnoverIcon from "/img/turnover.jpg";
import profitIcon from "/img/profit.jpg";
import customerIcon from "/img/customer.jpg";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { NavLink } from "react-router-dom";
import ReactModal from "react-modal";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Dashboard.css";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditClick = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

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
          id: item.id,
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
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Teams
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Analytics
        </NavLink>
        <NavLink
          to="/message"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Message
        </NavLink>
        <NavLink
          to="/integrations"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Integrations
        </NavLink>
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
            body={(rowData) => (
              <button
                className="edit-button"
                onClick={() => handleEditClick(rowData)}
              >
                <img src="/img/pen.jpg" alt="Edit" className="edit-icon" />
              </button>
            )}
            style={{ textAlign: "center", width: "5em" }}
          ></Column>
        </DataTable>
      </div>

      {/* Modal */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Row"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Edit Row</h2>
        {selectedRow && (
          <div>
            <p>
              <strong>Customer Name:</strong> {selectedRow.customerName}
            </p>
            <p>
              <strong>Company:</strong> {selectedRow.company}
            </p>
            <p>
              <strong>Order Value:</strong> {selectedRow.orderValue}
            </p>
            <p>
              <strong>Order Date:</strong> {selectedRow.orderDate}
            </p>
            <p>
              <strong>Status:</strong> {selectedRow.status}
            </p>
            {/* Add form fields here to edit the data */}
          </div>
        )}
        <button onClick={closeModal}>Close</button>
      </ReactModal>
    </div>
  );
};

export default GridLayout;
