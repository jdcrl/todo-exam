import React from 'react'
import DashIcon from './DashIcon'
import DeleteCommentIcon from './DeleteCommentIcon'

function Comments(props) {
    return (
        <div className='flex flex-col w-full px-2'> 
            {props.comments.map((comment, index) => {
                return (comment.todo_id === props.todo.id) ? 
                <div className='w-full flex flex-row justify-between items-center' key={index}>
                        <DashIcon />
                        {!comment.isEditing 
                                ? (<span title={comment.comment} onDoubleClick={() => props.markCommentAsEditing(comment.id)} className='pl-5 w-full text-sm cursor-text text-ellipsis overflow-hidden'>{comment.comment} </span>)
                                : (<input type='text' className='ml-4 w-full text-sm outline-none border-[0.5px] px-1' defaultValue={comment.comment} onBlur={(event) => props.updateComment(event, comment.id)} autoFocus/>)
                            }
                        <span className='cursor-pointer' onClick={() => props.deleteComment(comment.id)}>
                            <DeleteCommentIcon />
                        </span>
                </div> : 
                ''
                })
            }
            <form action="#" className='py-2' onSubmit={(event) => props.addComment(event, props.todo.id)}>
                <input type="text" placeholder='Add comment for this todo..' id={props.todo.id} onChange={(event) => props.setCommentInput(event.target.value)} className='outline-none border-b-[0.5px] w-full'/>
            </form>
        </div>
    )
}

export default Comments
