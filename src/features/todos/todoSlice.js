import { createSlice } from "@reduxjs/toolkit";
import { createTodo, getTodos } from "./thunk";

const initialState = {
    todos:[],
    loading:false,
    error:false,
    errorMsg:null,
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        // create todo
        builder.addCase(createTodo.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(createTodo.fulfilled,(state,action)=>{
            state.loading = false;
            state.todos.push(action.payload);
        })
        builder.addCase(createTodo.rejected,(state,action)=>{
            state.loading = false;
            state.error = true;
            state.errorMsg = action.error;
        })
        // get Todos data
        builder.addCase(getTodos.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(getTodos.fulfilled,(state,action)=>{
            state.loading = false;
            console.log(action.payload);
            
        })
        builder.addCase(getTodos.rejected,(state,action)=>{
            state.loading = false;
            state.error = true;
            state.errorMsg = action.error;
        })
    }
})

export default todoSlice.reducer;