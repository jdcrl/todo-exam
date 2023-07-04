import React from 'react'
import CheckIcon from './CheckIcon'
import CrossIcon from './CrossIcon'

function Password(props) {
    return (
        <div className='flex flex-row w-full items-center'>
            <div className='w-60 justify-between'>
                <span className='font-bold'>Password</span>
                <span>:</span>
            </div>
            <div className='flex flex-col w-full relative'>
                
                <div className='flex w-full flex-col relative'  title={`${props.password.length < 5 ? 'Password is too short' : 'Password length is good'}`}>
                    <input id='password' className='w-full outline-none border-[0.5px] border-zinc-400 p-1 rounded-md' type='password' 
                        onChange={(event) => props.handlePassword(event)} 
                        onBlur={(event) => props.handleConfirmPassword(event)}
                    />
                    <span className={`absolute right-0 py-1 px-1 ${props.password.length > 5 ? 'text-green-600' : 'text-red-600'} ${props.password.length === 0 && 'hidden'}`}> 
                        {props.password.length > 5 ? (<CheckIcon />) : ( <CrossIcon />)} 
                    </span>
                </div>
                    {props.password.length > 0 && (
                        <div className='flex flex-row space-x-1 items-center'>
                            <div style={{backgroundColor: ((props.password.length <= 5 || props.password.length > 5) && props.passwordColor)}} className={`h-2 w-5 border-zinc-200 border-[0.5px]`}></div>
                            <div style={{backgroundColor: (((props.password.length > 5 && props.password.length < 9) || props.password.length > 8 ) && props.passwordColor)}} className={`h-2 w-5  border-zinc-200 border-[0.5px]`}></div>
                            <div style={{backgroundColor: (props.password.length >= 9 && props.passwordColor)}} className={`h-2 w-5  border-zinc-200 border-[0.5px]`}></div>
                            <span style={{color: props.passwordColor}} className={`font-bold`}>Password is {props.passwordLabel}</span>
                        </div>
                    )} 
            </div>
        </div> 
    )
}

export default Password
