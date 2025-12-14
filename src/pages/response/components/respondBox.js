import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import axiosConfig from '../../../helpers/axiosConfig';
import Toaster from '../../../components/toaster';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RespondDialogBox(props) {

  const [response, setResponse] = useState({});
  const [responseId] = useState(props.responseId)

  function handleChange(event) {
    const res = event.target.value
    setResponse({ "response": res });
  }

  function handleSubmit() {
    axios(axiosConfig.editConfig(`http://localhost:4000/users/response/${responseId}`, responseId, response))
      .then(() => {
        Toaster.notifyResponseSubmit();
        setTimeout(() => {
          window.location = '/userdashboard'

        }, 1500)
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message)
        }
      })
  }

  return (
    <div>

      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Message"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.content}
          </DialogContentText>
          <br></br>
          <DialogContentText id="alert-dialog-slide-description">
            <center>
              <div>
                <input type="radio" name="response" value="Accepted" onChange={handleChange} />&nbsp;
                <label>Accept</label> &nbsp;
                <input type="radio" name="response" value="Rejected" onChange={handleChange} />&nbsp;
                <label>Reject</label>
              </div>
            </center>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { props.handleClose(); handleSubmit(); }}>Submit</Button><br />
          <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RespondDialogBox;