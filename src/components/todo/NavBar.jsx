import React, { useEffect, useState } from 'react'
import LogoutIcon from './LogoutIcon';

function NavBar(props) {
    const [user, setUser] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false)
  
    function getUserDetails() {
        const user = sessionStorage.getItem('loggedInUser')
        setUser(JSON.parse(user))
        setIsSuccess(true)
    }
    
    function logOutUser() {
        if (window.confirm('Are you sure you want to log out?')) {
            props.setIsLoggedIn(false)
            sessionStorage.removeItem('loggedInUser');
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className='w-full absolute flex flex-row h-16 top-0 border-[0.5px] justify-between'>
            <div></div>

            <div className='flex flex-row text-xl items-center px-5'>
                {isSuccess && 
                    <div className='flex flex-row space-x-3 items-center'>
                        <span> Hello, </span> 
                        <span> { user.username } </span>  
                        <span className='h-8 border-l-2'></span>
                        <button title='Logout' onClick={() => logOutUser()} className='flex flex-row items-center hover:-translate-x-1 transition duration-300 ease-in-out'>
                           <LogoutIcon />
                        </button>
                    </div>
                    }
            </div>   
        </div>
    )
}

export default NavBar
