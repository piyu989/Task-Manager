import React from 'react'

const TaskCard = () => {
  return (
    <div>
        <div className='card lg:flex justify-between'>
            <div className='lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]'>
                <div>
                    <img className='lg:w-[7ren] lg:h-[rem] object-cover'
                    src='https://i.pinimg.com/474x/6f/4b/2e/6f4b2e0d5e686801f107213a4ce0a90c.jpg'
                    alt=''/>
                </div>
                <div className='space-y-5'>
                    <div className='space-y-2'>
                        <h1 className='font-bold text-lg'>Car rental website</h1>
                        <p className='text-gray-400 text-sm'>use latest framework and technology to create this website</p>
                    </div>

                    <div className='flex flex-wrap gap-2 items-center'>
                        {[1,1,1,1].map((item)=><span className='py-1 px-5 rounded-full techstack'>
                            Angular
                        </span>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TaskCard