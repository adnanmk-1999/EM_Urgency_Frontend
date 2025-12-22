import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import roleController from '../../helpers/roleLogin';
import Toaster from '../../components/toaster';
import { TablePagination, Grid, Typography, Divider } from '@material-ui/core'

import axiosClient from "../../api/axiosClient";

function AlertTable() {

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [reRender, setreRender] = useState('one time');

  useEffect(() => {
    if (!roleController.isAdmin()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    axiosClient
      .get("/admin/alert")
      .then((response) => {
        setTableData(response.data);
      })
      .catch((e) => {
        console.log(e);
        alert("Session Timed out login again");
        localStorage.clear();
        navigate("/login", { replace: true });
      });
  }, [reRender, navigate]);

  const redirectToReport = (rowData) => {
    navigate('/sendemail', {
      state: { id: rowData.id, message: rowData.message, subject: rowData.subject }
    });
  };

  const columns = [
    {
      title: "Sent Date", type: "date", field: "date", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" }, initialEditValue: new Date(), dateSetting: { format: 'dd/MM/yyyy' },
      validate: rowData => {
        if (rowData.date === undefined || rowData.date === "") {
          return "Required"
        }
        return true
      }
    },
    {
      title: "Category", field: "categoryName", filterPlaceholder: "filter", lookup: { Announcement: "Announcement", Event: "Event", Holiday: "Holiday" },
      validate: rowData => {
        if (rowData.categoryName === undefined || rowData.categoryName === "") {
          return "Required"
        }
        return true
      }
    },
    {
      title: "Subject", field: "subject", filterPlaceholder: "filter",
      validate: rowData => {
        if (rowData.subject === undefined || rowData.subject === "") {
          return "Required"
        }
        return true
      }
    },
    {
      title: "Messsage", field: "message", filterPlaceholder: "filter",
      validate: rowData => {
        if (rowData.message === undefined || rowData.message === "") {
          return "Required"
        }
        return true
      }
    },
    {
      title: "Sent Status", field: "statusName",
      render: (rowData) => <div style={{ width: "100px", backgroundColor: rowData.statusName === 'Draft' ? '#F5E767' : rowData.statusName === 'Sent' ? '#008000aa' : '#f90000aa', borderRadius: "4px", padding: "1px 0px 3px 0px", textAlign: "center", color: 'white' }}>{rowData.statusName}</div>,
      searchable: false, export: false, editable: false, lookup: { Sent: "Sent", Failed: "Failed", Draft: "Draft" }, filterPlaceholder: "filter",
    }
  ];

  function addRow(data) {
    return axiosClient
      .post("/admin/alert", data)
      .then(() => {
        setreRender(String(Date.now()));
      });
  }

  function deleteRow(id) {
    return axiosClient
      .delete(`/admin/alert/${id}`)
      .then(() => {
        // optional: trigger reload if backend changes status counts etc.
        setreRender(String(Date.now()));
      });
  }

  function updateRow(id, data) {
    return axiosClient
      .put(`/admin/alert/${id}`, data)
      .then(() => {
        setreRender(String(Date.now()));
      });
  }

  return (
    <div className="App">

      <MaterialTable
        title="Alert Information"
        columns={columns}
        data={tableData}
        localization={{
          toolbar: {
            searchPlaceholder: "Search by subject, category, or message",
          },
        }}

        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setTableData([{ ...newRow, statusName: "Draft" }, ...tableData])
            setTimeout(() => {
              Toaster.notifyAdd()
              addRow(newRow)
                .then(() => resolve())
                .catch(() => reject());
            }, 500)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData[oldRow.tableData.id] = newRow
            setTableData(updatedData)
            setTimeout(() => {
              updateRow(newRow.id, newRow)
                .then(() => {
                  Toaster.notifyEdit();
                  resolve();
                })
                .catch(() => reject());
            }, 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData.splice(selectedRow.tableData.id, 1)
            setTableData(updatedData)
            setTimeout(() => {
              deleteRow(selectedRow.id)
                .then(() => {
                  Toaster.notifyDelete();
                  resolve();
                })
                .catch(() => reject());
            }, 1000)
          }),
          onRowAddCancelled: () => { Toaster.notifyCancel() },
          onRowUpdateCancelled: () => { Toaster.notifyCancel() },
          isEditable: rowData => rowData.statusName === 'Draft' || rowData.statusName === 'Failed',
          isDeletable: rowData => rowData.statusName === 'Draft' || rowData.statusName === 'Failed',
        }}

        onRowClick={(event, rowData) => {
          rowData.statusName === 'Sent' &&
            navigate("/responses", {
              state: { id: rowData.id, message: rowData.message, subject: rowData.subject }
            })
        }}

        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          searchFieldStyle: {
            width: "500px",
          },
          searchAutoFocus: true,
          searchFieldVariant: "standard",
          filtering: true,
          paging: true,
          pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 5,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          paginationPosition: "bottom",
          exportButton: true,
          exportAllData: true,
          exportFileName: "Alerts",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          selection: false,
          showSelectAllCheckbox: true,
          showTextRowsSelected: true,
          grouping: true,
          columnsButton: true,
          headerStyle: { background: "#FC816D", color: "#fff", fontFamily: "roboto", fontSize: "16px" }
        }}

        actions={[
          rowData => ({
            icon: 'mail',
            disabled: rowData.statusName === "Sent",
            tooltip: 'Sent Mail',
            onClick: (event, rowData) => {
              redirectToReport(rowData);
            }
          })
        ]}

        components={{
          Pagination: (props) => <>
            <Grid container style={{ padding: 15 }}>
              <Grid sm={12} item align="right"><Typography variant="subtitle2" className='paginationTotal' >Total Alerts : {props.count}</Typography></Grid>
            </Grid>
            <Divider />
            <TablePagination {...props} />
          </>
        }}

        onSelectionChange={(selectedRows) => console.log(selectedRows)}

        icons={{ Add: () => <AddIcon /> }}
      />

    </div>
  );
}

export default AlertTable;
