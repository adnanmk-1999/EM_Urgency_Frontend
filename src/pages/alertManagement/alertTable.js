import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from "../../helpers/httpServer";
import roleController from '../../helpers/roleLogin';
import Toaster from '../../components/toaster';
import axiosConfig from '../../helpers/axiosConfig';
import { TablePagination, Grid, Typography, Divider } from '@material-ui/core'

function AlertTable() {

  if (!roleController.isAdmin()) {
    window.location = '/login'
  }

  const [tableData, setTableData] = useState([]);

  const [reRender, setreRender] = useState('one time')

  const navigate = useNavigate();

  //Get alerts 
  useEffect(() => {
    axiosInstance
      .get("http://localhost:4000/admin/alert")
      .then((response) => {
        setTableData(response.data);
      })
      .catch((e) => {
        console.log(e)
        alert("Session Timed out login again");
        localStorage.clear();
        window.location = "/login";
      });


  }, [reRender]);

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
  ]


  //Helper Function for CRUD operations in the alert table
  function addRow(data) {
    axios(axiosConfig.postConfig('http://localhost:4000/admin/alert', data))
      .then(response => {
        setreRender('second time')
      })
  }

  function deleteRow(id) {
    axios(axiosConfig.deleteConfig(`http://localhost:4000/admin/alert/${id}`, id))
      .then(response => {
      })
      .catch(() => {
      })
  }

  function updateRow(id, data) {
    axios(axiosConfig.editConfig(`http://localhost:4000/admin/alert/${id}`, id, data))
      .then(response => {
        setreRender('second time')
      })
  }

  return (
    <div className="App">

      <MaterialTable
        title="Alert Information"
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setTableData([{ ...newRow, statusName: "Draft" }, ...tableData])
            setTimeout(() => {
              Toaster.notifyAdd()
              addRow(newRow);
              setreRender('second time')
              resolve()
            }, 500)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData[oldRow.tableData.id] = newRow
            setTableData(updatedData)
            setTimeout(() => {
              resolve();
              updateRow(newRow.id, newRow);
              Toaster.notifyEdit();
            }, 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData.splice(selectedRow.tableData.id, 1)
            setTableData(updatedData)
            setTimeout(() => {
              resolve();
              deleteRow(selectedRow.id);
              Toaster.notifyDelete();
            }
              , 1000)
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
