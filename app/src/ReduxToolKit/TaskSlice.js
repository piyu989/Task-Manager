import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";

export const fetchTasks = createAsyncThunk("task/fetchTasks",
async({status})=>{
    setAuthHeader(localStorage.getItem("jwt"),api)
    try{
        const {data}=await api.get("/api/tasks",{
            params:{status}
        })
        console.log("fetch task: ",data)
        return data;
    }catch(error){
        console.log("error",error)
        throw Error(error.response.data.error)
    }
}
);

export const fetchUsersTask = createAsyncThunk("task/fetchUsersTask",
async({status})=>{
    setAuthHeader(localStorage.getItem("jwt"),api)
    try{
        const {data}=await api.get("/api/tasks/user",{
            params:{status}
        })
        console.log("fetch user task: ",data)
        return data;
    }catch(error){
        console.log("error",error)
        throw Error(error.response.data.error)
    }
}
);

export const fetchTaskById = createAsyncThunk("tasks/fetchTaskById",
async(taskId)=>{
    setAuthHeader(localStorage.getItem("jwt"),api)
    try{
        const response = await api.get(`/api/tasks/${taskId}`);
        console.log("API response:", response.data);
        return response.data;
    }catch(error){
        console.log("error",error)
        throw Error(error.response.data.error)
    }
}
);

export const createTask = createAsyncThunk("task/createTask",
async(taskData)=>{
    setAuthHeader(localStorage.getItem("jwt"),api)
    try{
        const {data}=await api.post(`/api/tasks`,taskData);
        console.log("create task: ",data)
        return data;
    }catch(error){
        console.log("error",error)
        throw Error(error.response.data.error)
    }
}
);

export const updateTask = createAsyncThunk("task/updateTask",
async({id,updateTaskData})=>{
    setAuthHeader(localStorage.getItem("jwt"),api)
    try{
        const response=await api.put(`/api/tasks/${id}`,updateTaskData);
        console.log("updated task: ",response.data)
        return response.data;
        // const {data}=await api.put(`/api/tasks/${id}`,updateTaskData);
        // console.log("updated task: ",data)
        // return data;
    }catch(error){
        console.log("error",error)
        throw Error(error.response.data.error)
    }
}
);

export const assignedTaskToUser = createAsyncThunk("task/assignedTaskToUser",
async({taskId,userId})=>{
    setAuthHeader(localStorage.getItem("jwt"),api)
    try{
        const response=await api.put(`/api/tasks/user/${taskId}/assigned/${userId}`);
        console.log("assigned  task: ",response.data.message)
        return response.data;
        // console.log(taskId," ",userId);
        // return taskId;
    }catch(error){
        console.log("error",error)
        throw Error(error.response.data.error)
    }
}
);

export const deleteTask = createAsyncThunk("task/deleteTask",
async({taskId}) => {
    setAuthHeader(localStorage.getItem("jwt"),api)
    try{
        const {data}=await api.delete(`/api/tasks/${taskId}`);
        console.log("deleted task: ")
        return taskId;
    }catch(error){
        console.log("error",error)
        throw Error(error.response.data.error)
    }
}
);

const taskSlice=createSlice({
    name:"task",
    initialState:{
        task:[],
        loading:false,
        error:null,
        taskDetails:null,
        userTask:[]
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTasks.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchTasks.fulfilled,(state,action)=>{
            state.loading=false;
            state.tasks=action.payload;
        })
        .addCase(fetchTasks.rejected,(state,action)=>{
            state.error=action.error.message;
            state.loading=false;
        })
        .addCase(fetchUsersTask.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchUsersTask.fulfilled,(state,action)=>{
            state.loading=false;
            state.tasks=action.payload;
        })
        .addCase(fetchUsersTask.rejected,(state,action)=>{
            state.error=action.error.message;
            state.loading=false;
        })
        .addCase(createTask.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(createTask.fulfilled,(state,action)=>{
            state.loading=false;
            state.tasks.push(action.payload)
        })
        .addCase(createTask.rejected,(state,action)=>{
            state.error=action.error.message;
            state.loading=false;
        })
        .addCase(fetchTaskById.fulfilled,(state,action)=>{
            state.loading=false;
            state.taskDetails=action.payload;
        })
        .addCase(updateTask.fulfilled,(state,action)=>{
            const updateTask=action.payload;
            state.loading=false;
            state.tasks=state.tasks.map((task) => 
                task.id === updateTask.id ? { ...task, ...updateTask} : task
            );
        })
        .addCase(assignedTaskToUser.fulfilled,(state,action)=>{
            const updateTask=action.payload;
            state.loading=false;
            state.tasks=state.tasks.map((task) => 
                task.id === updateTask.id ? { ...task, ...updateTask} : task
            );
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            state.loading=false;
            state.tasks=state.tasks.filter((task)=>task.id!==action.payload)
        })
    },
})

export default taskSlice.reducer;