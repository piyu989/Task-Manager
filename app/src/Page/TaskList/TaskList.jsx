import React, { useEffect } from 'react'
import TaskCard from '../Task/TaskCard/TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../../ReduxToolKit/TaskSlice';

const TaskList = () => {

  const dispatch=useDispatch();

  const {task}=useSelector(store=>store)

  useEffect(()=>{
    dispatch(fetchTasks());
  },[]);

  console.log(task)

  return (
    <div className='w-[65vw]'>
        <div className='space-y-5 '>
            {
                [1,1,1,1,2].map((item)=><TaskCard/>)
            }
        </div>
    </div>
  )
}

export default TaskList