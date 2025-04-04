import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { NavLink } from "react-router-dom";
import ReactModal from "react-modal";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Dashboard.css";

const GridLayout = () => {
  // Data for the overview section
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

  // Modal state and data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editData, setEditData] = useState({
    customerName: "",
    company: "",
    orderValue: "",
    orderDate: "",
    status: "",
  });

  const handleEditClick = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);

    // Fetch detailed data for the selected row
    fetch(`https://67ecb150aa794fb3222e75c0.mockapi.io/datatable/${rowData.id}`)
      .then((response) => response.json())
      .then((data) => {
        setEditData({
          customerName: data.name,
          company: data.company,
          orderValue: data.oderValue,
          orderDate: data.oderDate,
          status: data.status ? "Completed" : "In-progress",
        });
      })
      .catch((error) => console.error("Error fetching row data:", error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
    setEditData({
      customerName: "",
      company: "",
      orderValue: "",
      orderDate: "",
      status: "",
    });
  };

  const handleSave = () => {
    // Update data via PUT API
    fetch(
      `https://67ecb150aa794fb3222e75c0.mockapi.io/datatable/${selectedRow.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editData.customerName,
          company: editData.company,
          oderValue: editData.orderValue,
          oderDate: editData.orderDate,
          status: editData.status === "Completed",
        }),
      }
    )
      .then((response) => response.json())
      .then((updatedData) => {
        console.log("Updated data:", updatedData);

        // Update the tableData state
        setTableData((prevTableData) =>
          prevTableData.map((item) =>
            item.id === updatedData.id
              ? {
                  ...item,
                  customerName: updatedData.name,
                  company: updatedData.company,
                  orderValue: `$${parseFloat(updatedData.oderValue).toFixed(
                    2
                  )}`,
                  orderDate: new Date(
                    updatedData.oderDate
                  ).toLocaleDateString(),
                  status: updatedData.status ? "Completed" : "In-progress",
                }
              : item
          )
        );

        closeModal();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    customerName: "",
    company: "",
    orderValue: "",
    orderDate: "",
    status: "Completed",
  });

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewUserData({
      customerName: "",
      company: "",
      orderValue: "",
      orderDate: "",
      status: "Completed",
    });
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    // Gửi dữ liệu qua API POST
    fetch("https://67ecb150aa794fb3222e75c0.mockapi.io/datatable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUserData.customerName,
        company: newUserData.company,
        oderValue: newUserData.orderValue,
        oderDate: newUserData.orderDate,
        status: newUserData.status === "Completed",
      }),
    })
      .then((response) => response.json())
      .then((createdUser) => {
        console.log("Created user:", createdUser);

        // Cập nhật bảng DataTable
        setTableData((prevTableData) => [
          ...prevTableData,
          {
            id: createdUser.id,
            customerName: createdUser.name,
            company: createdUser.company,
            orderValue: `$${parseFloat(createdUser.oderValue).toFixed(2)}`,
            orderDate: new Date(createdUser.oderDate).toLocaleDateString(),
            status: createdUser.status ? "Completed" : "In-progress",
            avatar: createdUser.avatar || "https://via.placeholder.com/40",
          },
        ]);

        closeAddModal();
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <div className="grid-container">
      <div className="grid-item item1">
        <div className="logo-container">
          <img src="/img/logo.jpg" alt="Logo" className="logo" />
        </div>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img
            src="/img/dashboard.png"
            alt="Dashboard Icon"
            className="nav-icon"
          />
          Dashboard
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img
            src="/img/project.png"
            alt="Projects Icon"
            className="nav-icon"
          />
          Projects
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img src="/img/team.png" alt="Teams Icon" className="nav-icon" />
          Teams
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img
            src="/img/analytic.png"
            alt="Analytics Icon"
            className="nav-icon"
          />
          Analytics
        </NavLink>
        <NavLink
          to="/message"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img
            src="/img/message.png"
            alt="Messages Icon"
            className="nav-icon"
          />
          Messages
        </NavLink>
        <NavLink
          to="/integrations"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img
            src="/img/integration.png"
            alt="Integrations Icon"
            className="nav-icon"
          />
          Integrations
        </NavLink>
      </div>
      <div className="grid-item item2 header">
        <h1 className="header-title">Dashboard</h1>
        <div className="header-actions">
          <div className="search-input-container">
            <img
              src="./img/search.png"
              alt="Search Icon"
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
          <img
            src="/img/notification.png"
            alt="Notification"
            className="notification-icon"
          />
          <img src="/img/help.png" alt="Help" className="help-icon" />
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
            <img
              src="/img/overview_icon.jpg"
              alt="Overview Icon"
              className="icon"
            />{" "}
            Overview
          </h2>
        </div>
        <div className="nested-grid-container">
          <div className="nested-grid-item turnover">
            <div className="item-header">
              <p className="title">Turnover</p>
              <div className="icon-button">
                <img src="./img/turnover.jpg" alt="Turnover Icon" />
              </div>
            </div>
            <p className="data">${data.turnover}</p>
            <p
              className={`change ${
                data.turnoverChange >= 0 ? "positive" : "negative"
              }`}
            >
              <span
                className={`change-icon ${
                  data.turnoverChange >= 0 ? "up" : "down"
                }`}
              ></span>
              {data.turnoverChange}% period of change
            </p>
          </div>
          <div className="nested-grid-item profit">
            <div className="item-header">
              <p className="title">Profit</p>
              <div className="icon-button">
                <img src="./img/profit.jpg" alt="Profit Icon" />
              </div>
            </div>
            <p className="data">${data.profit}</p>
            <p
              className={`change ${
                data.profitChange >= 0 ? "positive" : "negative"
              }`}
            >
              <span
                className={`change-icon ${
                  data.profitChange >= 0 ? "up" : "down"
                }`}
              ></span>
              {data.profitChange}% period of change
            </p>
          </div>
          <div className="nested-grid-item new-customer">
            <div className="item-header">
              <p className="title">New Customer</p>
              <div className="icon-button">
                <img src="./img/customer.jpg" alt="Customer Icon" />
              </div>
            </div>
            <p className="data">{data.newCustomer}</p>
            <p
              className={`change ${
                data.newCustomerChange >= 0 ? "positive" : "negative"
              }`}
            >
              <span
                className={`change-icon ${
                  data.newCustomerChange >= 0 ? "up" : "down"
                }`}
              ></span>
              {data.newCustomerChange}% period of change
            </p>
          </div>
        </div>
      </div>
      <div className="grid-item item4">
        <div className="detailed-report-header">
          <div className="detailed-report-title">
            <img
              src="./img/report-icon.jpg"
              alt="Report Icon"
              className="report-icon"
            />
            <h2>Detailed report</h2>
          </div>
          <div className="add-user-button-container">
            <button className="add-user-button" onClick={openAddModal}>
              Add User
            </button>
          </div>
        </div>
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
        <div>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={editData.customerName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={editData.company}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Order Value:
            <input
              type="text"
              name="orderValue"
              value={editData.orderValue}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Order Date:
            <input
              type="date"
              name="orderDate"
              value={editData.orderDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={editData.status}
              onChange={handleInputChange}
            >
              <option value="Completed">Completed</option>
              <option value="In-progress">In-progress</option>
            </select>
          </label>
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={closeModal}>Close</button>
      </ReactModal>

      {/* Modal Add User */}
      <ReactModal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        contentLabel="Add User"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Add User</h2>
        <div>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={newUserData.customerName}
              onChange={handleAddInputChange}
            />
          </label>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={newUserData.company}
              onChange={handleAddInputChange}
            />
          </label>
          <label>
            Order Value:
            <input
              type="text"
              name="orderValue"
              value={newUserData.orderValue}
              onChange={handleAddInputChange}
            />
          </label>
          <label>
            Order Date:
            <input
              type="date"
              name="orderDate"
              value={newUserData.orderDate}
              onChange={handleAddInputChange}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={newUserData.status}
              onChange={handleAddInputChange}
            >
              <option value="Completed">Completed</option>
              <option value="In-progress">In-progress</option>
            </select>
          </label>
        </div>
        <button onClick={handleAddUser}>Add</button>
        <button onClick={closeAddModal}>Cancel</button>
      </ReactModal>
    </div>
  );
};

export default GridLayout;
