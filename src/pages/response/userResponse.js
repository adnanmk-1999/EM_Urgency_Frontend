import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';
import RespondBox from './components/respondBox';
import { useNavigate } from 'react-router-dom';
import roleController from '../../helpers/roleLogin';
import { TablePagination, Grid, Typography, Divider } from '@material-ui/core';

import axiosClient from '../../api/axiosClient';

import './userResponse.css';

function UserResponse() {

  const navigate = useNavigate();

  const [alertData, setalertData] = useState([]);

  // ROLE GUARD (functional fix)
  useEffect(() => {
    if (!roleController.isUser()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const columns = [
    { title: "Sent Date", type: "date", field: "date", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" }, render: row => <span>{row["date"]}</span> },
    { title: "Category", field: "categoryId", filterPlaceholder: "filter", lookup: { 1: "Alert", 2: "Event", 3: "Announcement" } },
    { title: "Subject", field: "subject", filterPlaceholder: "filter" },
    { title: "Messsage", field: "message", filterPlaceholder: "filter" },
    {
      title: "Reply",
      field: "response",
      filterPlaceholder: "filter",
      lookup: { Pending: "Pending", Accepted: "Accepted", Rejected: "Rejected" },
      render: (rowData) => (
        <>
          {rowData.response === null && <div>Pending</div>}
          <div>{rowData.response}</div>
        </>
      )
    },
  ];

  // FETCH USER ALERTS
  useEffect(() => {
    axiosClient
      .get('/users/alerts')
      .then(response => {
        setalertData(response.data.data);
      })
      .catch(() => {
        alert('Session Timed out login again');
        localStorage.clear();
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  // RESPONSE DIALOG STATE
  const [message, setMessage] = useState();
  const [responseId, setresponseId] = useState();
  const [openDialogue, setOpenDialogue] = useState(false);

  function handleClickOpen(props, event) {
    props.action.onClick(event, props.data);
    setMessage(props.data.message);
    setresponseId(props.data.id);
    setOpenDialogue(true);
  }

  return (
    <>
      <div className=''>
        {openDialogue && (
          <RespondBox
            content={message}
            responseId={responseId}
            handleClose={() => setOpenDialogue(false)}
          />
        )}

        <div className="App">
          <MaterialTable
            title="My Alerts"
            columns={columns}
            data={alertData}
            options={{
              sorting: true,
              search: true,
              searchFieldAlignment: "right",
              searchAutoFocus: true,
              searchFieldVariant: "standard",
              filtering: true,
              paging: true,
              pageSizeOptions: [2, 5, 10, 15, 20, 25, 50, 100],
              pageSize: 5,
              paginationType: "stepped",
              showFirstLastPageButtons: false,
              paginationPosition: "bottom",
              exportButton: true,
              exportAllData: true,
              exportFileName: "TableData",
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
              {
                icon: "reply",
                tooltip: 'Sent response',
                onClick: (data, rowData) => {
                  console.log("row data is", rowData);
                }
              }
            ]}

            components={{
              Action: props => (
                <>
                  {props.data.response === null && (
                    <button
                      type='button'
                      className='respondBoxButton'
                      variant="outlined"
                      onClick={(event) => handleClickOpen(props, event)}
                    >
                      Respond
                    </button>
                  )}
                </>
              ),
              Pagination: (props) => <>
                <Grid container style={{ padding: 15 }}>
                  <Grid sm={12} item align="right">
                    <Typography variant="subtitle2" className='paginationTotal'>
                      Total Messages : {props.count}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <TablePagination {...props} />
              </>
            }}

            onSelectionChange={(selectedRows) => console.log(selectedRows)}

            icons={{ Add: () => <AddIcon /> }}
          />
        </div>
      </div>
    </>
  );
}

export default UserResponse;
