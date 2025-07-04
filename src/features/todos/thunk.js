import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../api/apiInstance";


export const createTodo = createAsyncThunk('todo/createTodo',async(todo,{rejectWithValue})=>{
    try{
        let res = await apiInstance.post('/.json',todo);
        return {...todo,id : res.data.name}
    }catch(error){
        return rejectWithValue(error.message) 
    }
})

export const getTodo = createAsyncThunk('todo/getTodo',async(_,{rejectWithValue})=>{
    try{
        let res = await apiInstance.get('/.json');
        return Object.keys(res.data).map((key)=> ({...res.data[key],id:key}));
    }catch(error){
        return rejectWithValue(error.message) 
    }
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo',async(id,{rejectWithValue})=>{
    try{
        await apiInstance.delete(`${id}/.json`);
        return id;
    }catch(error){
        return rejectWithValue(error.message) 
    }
})

export const updateTodo = createAsyncThunk('todo/updateTodo',async(user,{rejectWithValue})=>{
    try{
        let {id} = user
        await apiInstance.put(`${id}/.json`,user);
        return user;
    }catch(error){
        return rejectWithValue(error.message) 
    }
})