import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SubmissionCard from './SubmissionCard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

const submissions=[1,1,1];

export default function SubmissionList({handleClose,open}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {submissions.length>0?<div className="space-y-4" >
              {submissions.map((i)=><SubmissionCard/>)}
            </div>:<div className='text-center'>
              No Submission found
            </div>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
