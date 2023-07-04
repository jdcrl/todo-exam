import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/todo/NavBar'
import useLocalStorage from '../hooks/useLocalStorage'
import TodoForm from '../components/todo/TodoForm'
import TodoList from '../components/todo/TodoList'
import { TodosContext } from '../context/TodosContext'

function Todo() {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [todoInput, setTodoInput] = useState('');
    const [userSession, setUserSession] = useState(null)
    const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
    const [usersTodo, setUsersTodo] = useState([])
    const [todos, setTodos] = useLocalStorage('todos', [])
    function handleInput(event) {
        setTodoInput(event.target.value)
    }
  
    function addTodo(event) {
        event.preventDefault()
        if (todoInput.trim().length === 0) {
            return;
        }
   
        setTodos([
            ...todos,
            {
                id : idForTodo,
                author: userSession.username,
                title : todoInput,
                isComplete : false,
                isEditing: false,
                isShowingComment: false
            }
        ]);
      
        setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
        setTodoInput('');
    }

    function showComment(id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isShowingComment = !todo.isShowingComment;
            }

            return todo;
        })

        setTodos(updatedTodos);
    }

    function markAsEditing(id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isEditing = !todo.isEditing;
            }

            return todo;
        })

        setTodos(updatedTodos);
    }

    function updateTodo(event, id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {

                if (event.target.value.trim().length === 0) {
                    todo.isEditing = false;
                    return todo;
                }

                todo.title = event.target.value;
                todo.isEditing = false;
            }

            return todo;
        })
    
        setTodos(updatedTodos);
    }
    
    function deleteTodo(id) {
        setTodos([...todos].filter(todo => todo.id !== id));
    }

    function completeTodo(id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    function filterTodoByUser() {
        const usersTodo = todos.filter(todo => todo.author === userSession.username);
        setUsersTodo(usersTodo)
    }

    useEffect(() => {
        const userSession = sessionStorage.getItem('loggedInUser');
        const loggedInUser = (userSession !== 'undefined') ? JSON.parse(userSession) : null
        if (loggedInUser === null) {
            setIsLoggedIn(false)
            navigate('/login')
        } else {
            setUserSession(loggedInUser)
            setIsLoggedIn(true)
        }

    }, [isLoggedIn])

    useEffect(() => {
        if (isLoggedIn) {
            filterTodoByUser()
        }
    }, [userSession, todos])

    return (
        <TodosContext.Provider value={{usersTodo, completeTodo, markAsEditing, updateTodo, deleteTodo, showComment}}>
        {isLoggedIn && <NavBar setIsLoggedIn={setIsLoggedIn}/> }
        <div className='w-1/4 border-[0.5px] max-h-[70vh] rounded-lg shadow-lg flex flex-col py-5 px-5'>
            <div className='flex flex-col'>
                <TodoForm handleInput={handleInput} todoInput={todoInput} addTodo={addTodo} />
                <TodoList />
            </div>                                                                                                                                                                                                                                                                               
        </div>
        </TodosContext.Provider>
        
  )
}                            

export default Todo
