import React, { useEffect } from 'react';
import TaskCard from '../Task/TaskCard/TaskCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, fetchUsersTask } from '../../ReduxToolKit/TaskSlice';
import { useLocation } from 'react-router-dom';

const TaskList = () => {

  const dispatch = useDispatch();
  const { task, auth } = useSelector(store => store);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue = queryParams.get("filter");

  useEffect(() => {
    if (auth.user?.role === "ROLE_ADMIN") {
      dispatch(fetchTasks({ status: filterValue }));
    } else {
      dispatch(fetchUsersTask({ status: filterValue }));
    }
  }, [filterValue, auth.user?.role, dispatch]);

  console.log("tasks: ", task);

  const tasksToRender = auth.user?.role === "ROLE_ADMIN" ? task.tasks : task.userTask;

  return (
    <div className='w-[65vw]'>
      <div className='space-y-6'>
        {tasksToRender?.map((item) => (
          <TaskCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
