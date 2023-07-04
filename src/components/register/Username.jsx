import React from 'react'
import CheckIcon from './CheckIcon'
import CrossIcon from './CrossIcon'

function Username(props) {
  return (
    <div className='flex flex-row w-full items-center'>
        <div className='w-60 justify-between'>
            <span className='font-bold'>Username</span>
            <span>:</span>
        </div>
        <div className='flex w-full flex-col relative'  title={`${props.isUsernameAvailable? 'Username is availble.' : 'Username is not Available'}`}>
            <input className='w-full outline-none border-[0.5px] border-zinc-400 py-1 px-3 rounded-md' onChange={(event) => props.handleUsername(event)} type='text' />
            <span className={`absolute right-0 py-1 px-1 ${props.isUsernameAvailable ? 'text-green-600' : 'text-red-600'} ${props.username.length === 0 && 'hidden'}`}> 
                {props.isUsernameAvailable ? (<CheckIcon />) : ( <CrossIcon />)} 
            </span>
            <div className={`flex flex-row space-x-1 items-center ${props.username.length === 0 && 'hidden'} `}>
                <span className={`font-bold ${props.isUsernameAvailable ? 'text-green-400' :'text-red-400' } `}>{props.isUsernameAvailable ? 'Username is available' : 'Username is already taken'}</span>
            </div>
        </div>
    </div>
  )
}

export default Username
