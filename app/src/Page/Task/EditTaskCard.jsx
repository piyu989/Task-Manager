import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskById, updateTask } from '../../ReduxToolKit/TaskSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

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

const tagOption=["Angular","Spring","React js","Vue js","Spring boot","Node js","Python"]

export default function EditTaskCard({ item,handleClose,open }) {

  const dispatch=useDispatch();
  const {task}=useSelector(store=>store);

  const location=useLocation();
  const queryParams=new URLSearchParams(location.search);
  const taskId=queryParams.get("taskId");

  const [formData,setFormData]=useState({
    title:"",
    image:"",
    description:"",
    tags:[],
    deadline: new Date(),
  })

  const [selectedTags,setSelectTags]=useState([]);

  const handleChange=(e)=>{
    const { name,value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeadlineChange=(date)=>{
    setFormData({
      ...formData,
      deadline:date
    })
  }

  const formatDate=(input)=>{
    let {
      $y: year,
      $M: month,
      $D: day,
      $H: hours,
      $m: minutes,
      $s: seconds,
      $ms: milliseconds,
    }=input;

    const date=new Date(year,month,day,hours,minutes,seconds,milliseconds);
    const formatedDate=date.toISOString();
    return formatedDate;
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    // const {deadline}=formData;
    // formData.deadline=formatDate(deadline);
    formData.tags=formData.tags;
    
    dispatch(updateTask({id:taskId,updateTaskData:formData}))
    handleClose()
    handleRemoveTaskIdParams();
  }
  const navigate=useNavigate();
  
  const handleRemoveTaskIdParams=()=>{
    const updatedPath = location.pathname;
    navigate(updatedPath, { replace: true });
  }

  useEffect(()=>{
    dispatch(fetchTaskById(taskId));
  },[taskId])

  useEffect(() => {
    if(task.taskDetails){
      setFormData(task.taskDetails);
    }
      
  },[task.taskDetails])

  const handleTagsChange=(event,value)=>{
    setSelectTags(value);
    console.log('Selected Tags:', value);
    setFormData({
      ...formData,
      tags: value, 
    });
  }

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
                label="Title"
                fullWidth
                name='title'
                value={formData.title}
                onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                label="Image"
                fullWidth
                name='image'
                value={formData.image}
                onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
              <Autocomplete
                multiple
                id="multiple-limit-tags"
                options={tagOption}
                onChange={handleTagsChange}
                getOptionLabel={(option)=>option}
                renderInput={(param)=><TextField
                  label="Tags"
                  fullWidth
                  {...param}
                  />
                }
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker className='w-full' label="Deadline" onChange={handleDeadlineChange}
                renderInput={(params)=><TextField {...params} />}
                />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className='customeButton'
                  type='submit'
                  fullWidth
                  sx={{padding:".9rem"}}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}