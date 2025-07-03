import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../api/apiInstance";

export const createTodo = createAsyncThunk('todo/createTodo',async(user,{rejectWithValue})=>{
    try {
        let res = await apiInstance.post('/.json',user);
        return {...user,id:res.data.name};
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const getTodos = createAsyncThunk('todo/getTodos',async(_,{rejectWithValue})=>{
    try {
        let res = await apiInstance.get('/.json');
        return Object.keys(res.data).map((key)=> ({...res.data[key],id:key}));
    } catch (error) {
        return rejectWithValue(error.message);
    }
})