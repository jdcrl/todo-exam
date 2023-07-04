import React, { useEffect, useState } from 'react'
import { Link, navigate, useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage';


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [users] = useLocalStorage('registeredUsers', []);
    const [isSuccess, setIsSuccess] = useState();
    const navigate = useNavigate();

    function login() {
        const user = users.filter((user) =>  user.username === username && user.password === password).find((user) => true)
        if (user === undefined) {
            alert('Failed logging in, Check entered credentials')
            return
        }

        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        setIsSuccess(true);
        alert('Logged In Successfully')
        return
    }

    useEffect(() => {
        if(isSuccess) {
            navigate('/');
        }
    }, [isSuccess])

    return (
        <div className='flex border-[0.5px] border-zinc-400 rounded-lg min-w-[25%]  p-5'>
            <div className='flex flex-col w-full '>
                <div className='flex flex-row border-b-[0.5px] w-full justify-center'>
                    <span className='font-bold text-xl'>LOGIN</span>
                </div>
                <form action="#" onSubmit={login} className='flex flex-col w-full'>
                    <div className='flex flex-col w-full py-5 space-y-5'>
                        <div className='flex flex-row w-full items-center'>
                            <div className='w-28 justify-between'>
                                <span className='font-bold'>Username</span>
                                <span>:</span>
                            </div>
                            <input className='w-full outline-none border-[0.5px] border-zinc-400 py-1 px-3 rounded-md' onChange={(event) => setUsername(event.target.value)} type='text'/>
                        </div>
                        <div className='flex flex-row w-full items-center'>
                            <div className='w-28 justify-between'>
                                <span className='font-bold'>Password</span>
                                <span>:</span>
                            </div>
                            <input className='w-full outline-none border-[0.5px] border-zinc-400 p-1 rounded-md' onChange={(event) => setPassword(event.target.value)} type='password'/>
                        </div>
                    </div>
                    <div className='flex flex-row border-t-[0.5px] w-full justify'>
                        <div className='flex justify-center space-x-10 w-full py-3'>
                            <button className='border-[0.5px] border-zinc-400 rounded-md px-2 py-1' type="submit">Login</button>
                            <Link  to={'/register'} className='border-[0.5px] border-zinc-400 rounded-md px-2 py-1'>Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Login
