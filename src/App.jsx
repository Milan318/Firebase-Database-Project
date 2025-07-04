import React from 'react'
import { useDispatch } from 'react-redux'
import { createTodo, getTodo } from './features/todos/thunk'
import TodoApp from './components/Todo'

const App = () => {

  const dispatch = useDispatch()

  const handleSubmit = ()=>{
    dispatch(createTodo({name : 'John Doe'}))
  }

  const getData = ()=>{
    dispatch(getTodo())
  }

  return (
    <>
      <TodoApp/>
    </>
  )
}

export default App