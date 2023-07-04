import React, { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import CheckIcon from '../components/register/CheckIcon';
import CrossIcon from '../components/register/CrossIcon';
import { Link, useNavigate } from 'react-router-dom';
import Username from '../components/register/Username';
import Password from '../components/register/Password';
import ConfirmPassword from '../components/register/ConfirmPassword';

function Register() {
    const [users, setUsers] = useLocalStorage('registeredUsers', []);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordLabel, setPasswordLabel] = useState('');
    const [passwordColor, setPasswordColor] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)
    const [isPasswordVeryWeak, setIsPasswordVeryWeak] = useState(true)
    const [isPasswordMatch, setIsPasswordMatch] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const navigate = useNavigate();

    function handleUsername(event) {
        event.preventDefault();
        const value = event.target.value
        setUsername(value)
        const user = users.filter(user => {
            return user.username === value
        })

        if (user.length > 0) {
            setIsUsernameAvailable(false)
        } else {
            setIsUsernameAvailable(true)
        }
    }

    function handlePassword(event) {
        event.preventDefault();
        const password = event.target.value
        setPassword(password)

        if (password.length <= 5) {
            setIsPasswordVeryWeak(true)
            setPasswordColor('rgb(248 113 113)');
            setPasswordLabel('Very Weak');
        } else if (password.length < 9) {
            setPasswordColor('rgb(250 204 21)');
            setPasswordLabel('Weak');
            setIsPasswordVeryWeak(false)
        } else if (password.length >= 9) {
            setPasswordColor('rgb(74 222 128)');
            setPasswordLabel('Strong');
            setIsPasswordVeryWeak(false)
        } else {
            setPasswordColor('');
            setPasswordLabel('');
            setIsPasswordVeryWeak(false)
        }
    }

    function handleConfirmPassword(event) {
        event.preventDefault();
        if(event.target.id === 'password' && confirmPassword !== password ) {
            setIsPasswordMatch(false)
            return 
        }

        const value = event.target.value
        setConfirmPassword(value)
        if (value === password) {
            setIsPasswordMatch(true)
        } else {
            setIsPasswordMatch(false)
        }
    }

    function register() {
        if (!window.confirm('Are you sure you want to finalize registration?')) {
            return false
        }

        if (!isUsernameAvailable || !isPasswordMatch || isPasswordVeryWeak) {
            alert('Please add the correct and valid inputs')
            return false
        }

        const newUserCreds = [
            {
                username: username, 
                password: password, 
            }
        ]

        setUsers([...users, ...newUserCreds])
        setIsSuccess(true)
        window.alert('Registered successfully, You may now login.')
    }

    useEffect(() => {

        if (isSuccess === true) {
            navigate('/login');
        }
       
    }, [isSuccess])
  
    return (
        <div className='flex border-[0.5px] border-zinc-400 rounded-lg min-w-[25%] p-5'>
            <div className='flex flex-col w-full '>
                <div className='flex flex-row border-b-[0.5px] w-full justify-center'>
                    <span className='font-bold text-xl'>REGISTER</span>
                </div>
                <div className='flex flex-col w-full py-5 space-y-5'>
                    <Username isUsernameAvailable={isUsernameAvailable} handleUsername={handleUsername} username={username}/>
                    <Password 
                        password={password}
                        handlePassword={handlePassword} 
                        handleConfirmPassword={handleConfirmPassword} 
                        passwordColor={passwordColor}
                        passwordLabel={passwordLabel}
                    />
                    
                    <ConfirmPassword isPasswordMatch={isPasswordMatch} confirmPassword={confirmPassword} handleConfirmPassword={handleConfirmPassword} />
                </div>
                <div className='flex flex-col border-t-[0.5px] w-full justify'>
                    <div className='flex justify-center space-x-10 w-full py-3'>
                        <button className='border-[0.5px] border-zinc-400 rounded-md px-2 py-1' onClick={() => register()}>Submit</button>
                    </div>
                    <div className='flex justify-end'>
                        <Link to={'/login'} className='underline text-blue-400 text-sm'>Already have an account? Click hear to login.</Link>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Register
