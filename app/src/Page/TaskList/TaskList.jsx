import React from 'react'
import TaskCard from '../Task/TaskCard/TaskCard'

const TaskList = () => {
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