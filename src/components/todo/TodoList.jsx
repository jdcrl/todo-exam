import React, { useContext, useState } from 'react'
import TrashIcon from './TrashIcon'
import ListIcon from './ListIcon'
import InfoIcon from './InfoIcon'
import CommentIcon from './CommentIcon'
import useLocalStorage from '../../hooks/useLocalStorage'
import DeleteCommentIcon from './DeleteCommentIcon'
import DashIcon from './DashIcon'
import Comments from './Comments'
import { TodosContext } from '../../context/TodosContext'
import { CommentsContext } from '../../context/CommentsContext' 

function TodoList() {
    const [filter, setFilter] = useState('all')
    const [commentInput, setCommentInput] = useState('')
    const [comments, setComments] = useLocalStorage('comments', [])
    const [idForComment, setIdForComment] = useLocalStorage('idForComment', 1)
    const {usersTodo, completeTodo, markAsEditing, updateTodo, deleteTodo, showComment} = useContext(TodosContext)

    function FilteredTodo() {
        const todos = usersTodo.filter(todo => {
            if (filter === 'active') {
                return todo.isComplete === false
            }

            if (filter === 'completed') {
                return todo.isComplete === true
            }

            return todo
        })

        if(todos.length === 0) {
            return[{id: 0, title: 'No Available todos for this filter'}]
        }

        return todos
    }

    function markCommentAsEditing(id) {
        const updatedComments = comments.map(comment => {
            if (comment.id === id) {
                comment.isEditing = !comment.isEditing;
            }

            return comment;
        })

        setComments(updatedComments);
    }

    function deleteComment(id) {
        setComments([...comments].filter(comment => comment.id !== id));
    }

    function updateComment(event, id) {
        const updatedComments = comments.map(comment => {
            if (comment.id === id) {
                if (event.target.value.trim().length === 0) {
                    comment.isEditing = false;
                    return comment;
                }

                comment.comment = event.target.value;
                comment.isEditing = false;
            }

            return comment;
        })

        setComments(updatedComments);
    }

    function addComment(event, todo_id) {
        event.preventDefault()
        setComments([
            ...comments,
            {
                id: idForComment,
                todo_id : todo_id,
                comment : commentInput,
                isEditing: false
            }
        ]);
        event.target.querySelector('input').value = '';
        setIdForComment(prevIdForComment => prevIdForComment + 1);
        setCommentInput('');
    }

    return (
        <CommentsContext.Provider value={{comments, markCommentAsEditing, updateComment, deleteComment, addComment, setCommentInput}}>
            <div className='flex flex-col w-full mt-5'>
                <div className=' px-2 text-sm text-zinc-500 flex flex-row items-center'>
                {usersTodo.length > 0  && <>
                    <span><InfoIcon /></span><span>Double click on todo or comment to modify.</span> 
                </>}
                </div>
                <div className='flex flex-col  border-[0.5px] border-zinc-200 max-h-[30rem] min-h-[2rem]  overflow-y-auto overflow-x-hidden'>
                    {usersTodo.length === 0 ? (
                        <div className='flex flex-col items-center py-5'>
                            <span className='text-zinc-400'>No todos available </span>
                            <span className='text-zinc-400'><ListIcon /></span>
                        </div>
                    ) : (
                        <>
                        {FilteredTodo().map((todo, index) => (
                            <div key={index} className={`px-2 flex flex-col min-h-[2.5rem] items-end  ${index % 2 === 0 ? 'bg-white' : 'bg-slate-100' }`}> 
                                <div className='flex w-full items-center space-x-2'>
                                    {todo.id !== 0 && <input type='checkbox' onChange={() => completeTodo(todo.id)} className='h-4 w-4' checked={todo.isComplete}/>}
                                    {!todo.isEditing 
                                        ? (<span title={todo.title} onDoubleClick={() => markAsEditing(todo.id)} className='flex-grow text-xl cursor-text text-ellipsis overflow-hidden'>{todo.title} </span>)
                                        : (<input type='text' className='w-full outline-none border-[0.5px] px-3' defaultValue={todo.title} onBlur={(event) => updateTodo(event, todo.id)} autoFocus/>)
                                    }
                                     {todo.id !== 0 && <><span title='Show comments' className='hover:rotate-[30deg] transition duration-300 ease-in-out cursor-pointer' onClick={() => showComment(todo.id)}>
                                        <CommentIcon /> 
                                    </span>
                                    <span title='Delete todo' className='hover:rotate-[30deg] transition duration-300 ease-in-out cursor-pointer' onClick={() => deleteTodo(todo.id)}>
                                        <TrashIcon /> 
                                    </span>
                                    </>}
                                </div>
                                {todo.isShowingComment && <Comments todo={todo} />}
                            </div>      
                        ))}
                        </>
                    )}
                </div>
                {usersTodo.length > 0  && <>
                    <div className='flex flex-row space-x-2 items-center'>
                        <span>Filter:</span>   
                        <div className='flex flex-row space-x-1'>
                            <input type="checkbox" onChange={() => setFilter('all')} checked={filter === 'all'} />
                            <span>All</span>
                        </div>
                        <div className='flex flex-row space-x-1'>
                            <input type="checkbox" onChange={() => setFilter('active')} checked={filter === 'active'} />
                            <span>Active</span>
                        </div>
                        <div className='flex flex-row space-x-1'>
                            <input type="checkbox" onChange={() => setFilter('completed')}  checked={filter === 'completed'} />
                            <span>Completed</span>
                        </div>
                    </div>
                </>}
                
            </div>
        </CommentsContext.Provider>
    )
}

export default TodoList
