import React from 'react'
import CheckIcon from './CheckIcon'
import CrossIcon from './CrossIcon'

function ConfirmPassword(props) {
  return (
    <div className='flex flex-row w-full items-center '>
        <div className='w-60 justify-between'>
            <span className='font-bold'>Confirm Password</span>
            <span>:</span>
        </div>

        <div className='flex flex-col w-full relative'>
            <div className='flex w-full flex-col relative' title={`${props.isPasswordMatch? 'Password does not match' : 'Password matched'}`}>
            <input id='confirmPassword' className='w-full outline-none border-[0.5px] border-zinc-400 p-1 rounded-md' onChange={(event) => props.handleConfirmPassword(event)}  type='password' />
            <span className={`absolute right-0 py-1 px-1 ${props.isPasswordMatch ? 'text-green-600' : 'text-red-600'} ${props.confirmPassword.length === 0 && 'hidden'}`}> 
                {props.isPasswordMatch ? (<CheckIcon />) : ( <CrossIcon />)} 
            </span>
        </div>
        <div className={`flex flex-row space-x-1 items-center ${props.confirmPassword.length === 0 && 'hidden'} `}>
            <span className={`font-bold ${props.isPasswordMatch ? 'text-green-400' :'text-red-400' } `}>{props.isPasswordMatch ? 'Passwords match' : 'Passwords do not match'}</span>
        </div>
        </div>
    </div>
  )
}

export default ConfirmPassword
