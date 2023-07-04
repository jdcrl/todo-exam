import React from 'react'

function TodoForm(props) {
  return (
    <div className='w-full flex flex-row space-x-5'>
        <form action="#" onSubmit={props.addTodo} className='flex w-full'>
            <input type="text" value={props.todoInput} id="" className='w-full border-[0.5px] py-2 px-2 rounded-md outline-none' onChange={(event) => props.handleInput(event)} placeholder='Add new todo...' />
        </form>
    </div>
  )
}

export default TodoForm
