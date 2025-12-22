import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';

import Toaster from '../../../components/toaster';
import axiosClient from '../../../api/axiosClient';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RespondDialogBox(props) {

  const navigate = useNavigate();

  const [response, setResponse] = useState({});
  const [responseId] = useState(props.responseId);

  function handleChange(event) {
    const res = event.target.value;
    setResponse({ response: res });
  }

  function handleSubmit() {
    axiosClient
      .put(`/users/response/${responseId}`, response)
      .then(() => {
        Toaster.notifyResponseSubmit();
        setTimeout(() => {
          navigate('/userdashboard', { replace: true });
        }, 1500);
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  }

  return (
    <Dialog
      open
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      PaperProps={{ style: styles.dialogPaper }}
    >
      <DialogTitle style={styles.title}>
        Message
      </DialogTitle>

      <DialogContent>
        <DialogContentText style={styles.messageText}>
          {props.content}
        </DialogContentText>

        <div style={styles.radioWrapper}>
          <label style={styles.radioOption}>
            <input
              type="radio"
              name="response"
              value="Accepted"
              onChange={handleChange}
              style={styles.hiddenRadio}
            />
            <span
              style={{
                ...styles.customRadio,
                ...(response.response === 'Accepted'
                  ? styles.customRadioChecked
                  : {})
              }}
            >
              {response.response === 'Accepted' && (
                <span style={styles.customRadioDot} />
              )}
            </span>
            Accept
          </label>

          <label style={styles.radioOption}>
            <input
              type="radio"
              name="response"
              value="Rejected"
              onChange={handleChange}
              style={styles.hiddenRadio}
            />
            <span
              style={{
                ...styles.customRadio,
                ...(response.response === 'Rejected'
                  ? styles.customRadioChecked
                  : {})
              }}
            >
              {response.response === 'Rejected' && (
                <span style={styles.customRadioDot} />
              )}
            </span>
            Reject
          </label>
        </div>

      </DialogContent>

      <DialogActions style={styles.actions}>
        <Button
          style={styles.submitBtn}
          onClick={() => {
            props.handleClose();
            handleSubmit();
          }}
        >
          Submit
        </Button>

        <Button
          style={styles.cancelBtn}
          onClick={props.handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RespondDialogBox;

const styles = {
  dialogPaper: {
    borderRadius: 12,
    padding: '10px 4px',
    minWidth: 420
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '20px',
    color: '#2C2424'
  },
  messageText: {
    fontFamily: 'Roboto',
    fontSize: '14.5px',
    color: '#555',
    marginBottom: 20
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: 30,
    marginTop: 10
  },
  radioLabel: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    cursor: 'pointer'
  },
  actions: {
    padding: '10px 24px 20px'
  },
  submitBtn: {
    backgroundColor: '#FC816D',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: 6,
    padding: '6px 18px'
  },
  cancelBtn: {
    color: '#666',
    textTransform: 'none',
    fontWeight: 500
  },
  radioWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: 32,
    marginTop: 12
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
    fontFamily: 'Roboto',
    fontSize: '14.5px',
    color: '#2C2424'
  },
  hiddenRadio: {
    display: 'none'
  },
  customRadio: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    border: '2px solid #ccc',
    display: 'inline-block',
    position: 'relative',
    transition: 'all 0.2s ease'
  },
  customRadioChecked: {
    borderColor: '#FC816D'
  },
  customRadioDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '#FC816D',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};
