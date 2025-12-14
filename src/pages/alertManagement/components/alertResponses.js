import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Row, Col, Container } from 'react-bootstrap';
import MaterialTable from 'material-table';
import axios from 'axios';
import axiosConfig from '../../../helpers/axiosConfig';
import Counter from '../../../helpers/responseCounter';
import { TablePagination, Grid, Typography, Divider } from '@material-ui/core'

import "./alertResponses.css";

function AlertResponses() {

    const navigate = useNavigate();
    const location = useLocation();
    const [tableData, setTableData] = useState([])
    const [count, setCount] = useState([])
    const [notresponded, setNotResponded] = useState([])


    useEffect(() => {
        var data = {
            "alertId": location.state.id
        }
        axios(axiosConfig.postConfig('http://localhost:4000/users/alertresponses', data)) //gets data from api
            .then(response => {
                setTableData(response.data); //save only 'data' in response to the state
                var total = response.data.length
                var responses = []
                for (var i = 0; i < total; i++) {
                    responses.push(response.data[i].response)
                }
                setCount(Counter.responseCount(total, responses))
            })
            .catch(() => {
                alert('Session Timed out login again')
                window.location = '/login'
            });
    }, [location.state.id]);

    useEffect(() => {
        setNotResponded(tableData.length - count)
    }, [notresponded, tableData, count])

    const columns = [
        { title: 'Avatar', field: 'image', filtering: false, render: rowData => <img src={rowData.image} alt="profile" style={{ width: 50, borderRadius: '50%' }} /> },
        { title: "Name", field: "name", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" } },
        { title: "Email", field: "email", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" } },
        { title: "Department", field: "departmentId", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" }, lookup: { 1: "DTS", 2: "ESS", 3: "PES" } },
        { title: "Location", field: "locationId", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" }, lookup: { 1: "Thiruvananthapuram", 2: "Bengaluru", 3: "Kochi" } },
        { title: "Job Title", field: "jobtitleId", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" }, lookup: { 1: "HR", 2: "Software Engineer", 3: "Designer", 4: "BU" } },
        { title: "Reply", field: "reply", filterPlaceholder: "filter", lookup: { Pending: "Pending", Accepted: "Accepted", Rejected: "Rejected" }, render: (rowData) => <>{rowData.response === null && <div>Pending</div>}<div>{rowData.response}</div></> }
    ]

    return (<>
        <Container className='userResponses'>
            <Row>
                <Col md={12}>
                    <h1 className='message'>Message</h1><br />
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col md={9}>
                    <div>
                        {location.state.message}
                    </div>
                </Col>
                <Col md={3}>
                    <Table style={{ backgroundColor: '#FC816D', borderRadius: '10px' }} >

                        <tbody>
                            <tr>
                                <td className='rowData'>Responded</td>
                                <td className='rowData'>{count}</td>
                            </tr>
                            <tr>
                                <td className='rowData'>Not Responded</td>
                                <td className='rowData'>{notresponded}</td>
                            </tr>
                        </tbody>

                    </Table>
                </Col>
            </Row>

            <div className='userResponses'>
                <MaterialTable
                    title="Responses"
                    columns={columns}
                    data={tableData}
                    options={{
                        sorting: true,
                        search: true,
                        searchFieldAlignment: "right",
                        searchAutoFocus: true,
                        searchFieldVariant: "standard",
                        filtering: true,
                        paging: true,
                        pageSizeOptions: [2, 5, 10, 20, 50, 100],
                        pageSize: 5,
                        paginationType: "stepped",
                        showFirstLastPageButtons: false,
                        paginationPosition: "bottom",
                        addRowPosition: "first",
                        actionsColumnIndex: -1,
                        exportButton: true,
                        exportAllData: true,
                        exportFileName: "Responses",
                        grouping: true,
                        columnsButton: true,
                        showSelectAllCheckbox: true,
                        showTextRowsSelected: true,
                        rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
                        headerStyle: { background: "#FC816D", color: "#fff", fontFamily: "roboto", fontSize: "16px" }
                    }}

                    components={{
                        Pagination: (props) => <>
                            <Grid container style={{ padding: 15 }}>
                                <Grid sm={12} item align="right"><Typography variant="subtitle2" className='paginationTotal' >Total Employees : {props.count}</Typography></Grid>
                            </Grid>
                            <Divider />
                            <TablePagination {...props} />
                        </>
                    }}
                />
            </div>

        </Container>
        <br />
        <center><button type="button" onClick={() => navigate('/admindashboard')} className='goBackList'  >Go Back</button></center>
    </>
    )
}

export default AlertResponses;