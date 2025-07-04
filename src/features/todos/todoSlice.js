import { createSlice } from "@reduxjs/toolkit";
import { createTodo, deleteTodo, getTodo } from "./thunk";

const initialState = {
    todo : [],
    loading : false,
    error : null,
}

const todoSlice = createSlice({
    name : "todo",
    initialState,
    reducers : {},
    extraReducers: (builder)=>{

        // create
        builder.addCase(createTodo.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        builder.addCase(createTodo.fulfilled,(state,action)=>{
            state.loading = false;
            state.todo.push(action.payload)
        })
        builder.addCase(createTodo.rejected,(state)=>{
            state.loading = false;
            state.error = action.error.message
        })

        // get data
        builder.addCase(getTodo.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        builder.addCase(getTodo.fulfilled,(state,action)=>{
            state.loading = false;
            state.todo = action.payload
        })
        builder.addCase(getTodo.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message
        })

        // delete
        builder.addCase(deleteTodo.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        builder.addCase(deleteTodo.fulfilled,(state,action)=>{
            state.loading = false;
            state.todo = state.todo.filter((item)=>item.id !== action.payload)
        })
        builder.addCase(deleteTodo.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message
        })
    },
})

export default todoSlice.reducer;