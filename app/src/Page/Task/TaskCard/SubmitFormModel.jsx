import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskById } from '../../../ReduxToolKit/TaskSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { submitTask } from '../../../ReduxToolKit/SubmissionSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function SubmitFormModel({ item,handleClose,open }) {

  const dispatch=useDispatch();
  const {task}=useSelector(store=>store);

  const location=useLocation();
  const queryParams=new URLSearchParams(location.search);
  const taskId=queryParams.get("taskId");

  const [formData,setFormData]=useState({
    githubLink:"",
    description:"",
  })


  const handleChange=(e)=>{
    const { name,value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    dispatch(submitTask({taskId,githubLink:formData.githubLink}))
    handleClose()
  }
  const navigate=useNavigate();
  
  useEffect(()=>{
    dispatch(fetchTaskById(taskId));
  },[taskId])

  useEffect(() => {
    if(task.taskDetails){
      setFormData(task.taskDetails);
    }
      
  },[task.taskDetails])


    return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} borderRadius={1}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                label="github link"
                fullWidth
                name='github link'
                value={formData.githubLink}
                onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                name='description'
                value={formData.description}
                onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className='customeButton'
                  type='submit'
                  fullWidth
                  sx={{padding:".9rem"}}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}