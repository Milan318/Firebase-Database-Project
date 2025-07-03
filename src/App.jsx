import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTodo, getTodos } from './features/todos/thunk';

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTodos());
  },[])
  return (
    <div>
      <button className='btn btn-dark mt-5 ms-5' onClick={()=> dispatch(createTodo({text:'Todo Added'}))} >Add Todo</button>
    </div>
  )
}

export default App
