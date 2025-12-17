import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import "./emailDropdown.css";
import { Card, Container, Row, Col } from 'react-bootstrap';
import Toaster from '../../../components/toaster';
import { TablePagination, Grid, Typography, Divider } from '@material-ui/core';

import axiosClient from '../../../api/axiosClient';

function EmailDropdown() {

    const navigate = useNavigate();
    const location = useLocation();

    const [check, setCheck] = useState([]);
    const [checkLocation, setCheckLocation] = useState([]);
    const [sendList, setSendList] = useState([]);
    const [option, setOption] = useState({ value: "0" });

    const [data, setData] = useState({
        alertId: location.state.id,
        message: location.state.message,
        subject: location.state.subject
    });

    const [tableData, setTableData] = useState([]);

    // ===============================
    // FETCH ALERTS (kept as-is logically)
    // ===============================
    useEffect(() => {
        axiosClient
            .get('/admin/alert')
            .then(response => {
                setTableData(response.data);
            })
            .catch(() => {
                alert('Session Timed out login again');
            });
    }, []);

    // ===============================
    // FETCH USERS (triggered by option change)
    // ===============================
    useEffect(() => {
        axiosClient
            .get('/users')
            .then(response => {
                setTableData(response.data);
            })
            .catch(() => {
                alert('Session Timed out login again');
                navigate('/login', { replace: true });
            });
    }, [option, navigate]);

    const columns = [
        { title: "Employee Id", field: "Id", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" } },
        { title: "Name", field: "Name", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" } },
        { title: "Email", field: "Email", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" } },
        { title: "Department", field: "department_id", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" }, lookup: { 1: "DTS", 2: "ESS", 3: "PES" } },
        { title: "Location", field: "location_id", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" }, lookup: { 1: "Thiruvananthapuram", 2: "Bengaluru", 3: "Kochi" } },
        { title: "Job Title", field: "job_title_id", sorting: true, filterPlaceholder: "filter", headerStyle: { color: "#fff" }, lookup: { 1: "HR", 2: "Software Engineer", 3: "Designer", 4: "BU" } }
    ];

    function handleSubmit(event) {
        event.preventDefault();

        if (option.value === "0") {
            Toaster.notifySelectOption();
            return;
        }

        if (option.value === "1") {
            axiosClient.post('/admin/sentalert/all', data)
                .then(() => {
                    Toaster.notifyEmailSend();
                    navigate('/admindashboard');
                })
                .catch(handleError);
        }
        else if (option.value === "2") {
            axiosClient.post('/admin/sentalert/departments', data)
                .then(() => {
                    Toaster.notifyEmailSend();
                    navigate('/admindashboard');
                })
                .catch(handleError);
        }
        else if (option.value === "3") {
            axiosClient.post('/admin/sentalert/locations', data)
                .then(() => {
                    Toaster.notifyEmailSend();
                    navigate('/admindashboard');
                })
                .catch(handleError);
        }
        else {
            const sendIndividual = {
                ...data,
                individualId: sendList
            };

            axiosClient.post('/admin/sentalert/individuals', sendIndividual)
                .then(() => {
                    Toaster.notifyEmailSend();
                    navigate('/admindashboard');
                })
                .catch(handleError);
        }
    }

    function handleError(error) {
        localStorage.clear();
        if (error.response) {
            alert(error.response.data.message);
        }
    }

    function handleChange(event) {
        const val = event.target.value;
        setOption({ value: val });
        setData({
            alertId: data.alertId,
            message: data.message,
            subject: data.subject,
            departmentId: [],
            locationId: []
        });
    }

    function handleChangeCheckDepartment(event) {
        const val = event.target.value;
        const array = [...check];

        if (array.includes(val)) {
            array.splice(array.indexOf(val), 1);
        } else {
            array.push(val);
        }

        setCheck(array);
    }

    useEffect(() => {
        setData(values => ({ ...values, departmentId: check }));
    }, [check]);

    function handleChangeCheckLocation(event) {
        const val = event.target.value;
        const array = [...checkLocation];

        if (array.includes(val)) {
            array.splice(array.indexOf(val), 1);
        } else {
            array.push(val);
        }

        setCheckLocation(array);
    }

    useEffect(() => {
        setData(values => ({ ...values, locationId: checkLocation }));
    }, [checkLocation]);

    function individualSendList(list) {
        const sendList = list.map(item => item.Id);
        setSendList(sendList);
    }

    return (
        <>
            <div className='textImage'>
                <div className='titleEmail'>
                    <Container className='containerDropdown'>
                        <Row>
                            <Col className='columnDropdown'>
                                <Card style={{ width: '100%', background: 'none', border: 'none', padding: '0 0 0 0' }}>
                                    <Card.Body >
                                        <div className="emailHeader">
                                            <h1>Select Recipients</h1>
                                            <div className="emailUnderline"></div>
                                            <p className="emailSubtext">
                                                Choose how you want to target recipients for this alert
                                            </p>
                                        </div>
                                        <div className="emailCard">
                                            <Card.Text>
                                                <div className="selectRow">
                                                    <label className='selectBy'>Select by:</label>
                                                    <select onChange={handleChange} className="dropDown">
                                                        <option value="0" className='optionName'>Select an option</option>
                                                        <option value="1" className='optionName'>Select All</option>
                                                        <option value="2" className='optionName'>Department</option>
                                                        <option value="3" className='optionName'>Location</option>
                                                        <option value="4" className='optionName'>Individual</option>
                                                    </select>
                                                </div>


                                                {option.value === "2" && (
                                                    <div className='dept'>
                                                        <label className='department'>Departments: </label><br />
                                                        <input type="checkbox" value="1" className='checkbox' onChange={handleChangeCheckDepartment} /> &nbsp;
                                                        <label className='departments'>Digital Tranformation Services</label><br />
                                                        <input type="checkbox" value="2" className='checkbox' onChange={handleChangeCheckDepartment} /> &nbsp;
                                                        <label className='departments'>Product Engineering Services</label><br />
                                                        <input type="checkbox" value="3" className='checkbox' onChange={handleChangeCheckDepartment} /> &nbsp;
                                                        <label className='departments'>Enterprice Software Services</label><br />
                                                    </div>
                                                )}

                                                {option.value === "3" && (
                                                    <div className='dept'>
                                                        <label className='location'>Locations: </label><br />
                                                        <input type="checkbox" value="1" onChange={handleChangeCheckLocation} /> &nbsp;
                                                        <label className='locations'>Thiruvananthapuram</label><br />
                                                        <input type="checkbox" value="2" onChange={handleChangeCheckLocation} /> &nbsp;
                                                        <label className='locations'>Bengaluru</label><br />
                                                        <input type="checkbox" value="3" onChange={handleChangeCheckLocation} /> &nbsp;
                                                        <label className='locations'>Kochi</label><br />
                                                    </div>
                                                )}

                                                {option.value === "4" && (
                                                    <div className='individual'>
                                                        <MaterialTable
                                                            title="Select employees"
                                                            columns={columns}
                                                            data={tableData}
                                                            localization={{
                                                                toolbar: {
                                                                    searchPlaceholder: "Search",
                                                                },
                                                            }}
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
                                                                selection: true,
                                                                showSelectAllCheckbox: true,
                                                                showTextRowsSelected: true,
                                                                columnsButton: false,
                                                                rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
                                                                headerStyle: { background: "#FC816D", color: "#fff", fontFamily: "roboto", fontSize: "16px" }
                                                            }}
                                                            components={{
                                                                Pagination: (props) => <>
                                                                    <Grid container style={{ padding: 15 }}>
                                                                        <Grid sm={12} item align="right">
                                                                            <Typography variant="subtitle2" className='paginationTotal'>
                                                                                Total Employees : {props.count}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />
                                                                    <TablePagination {...props} />
                                                                </>
                                                            }}
                                                            onSelectionChange={(selectedRows) => individualSendList(selectedRows)}
                                                        />
                                                    </div>
                                                )}

                                                <div className="emailActions">
                                                    <button className="primaryBtn" type="button" onClick={handleSubmit}>
                                                        Send Alert
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => navigate('/admindashboard')}
                                                        className="secondaryBtn"
                                                    >
                                                        Go Back
                                                    </button>
                                                </div>
                                            </Card.Text>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default EmailDropdown;
