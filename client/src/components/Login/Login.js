import './Login.css';

import { useRef } from 'react';

function Login({ loginUser }) {

    const usernameRef = useRef();

    function login()
    {
        loginUser( usernameRef.current.value )
    }
    return (
        <div className='login'>
            <h1> Live Chat </h1>
            <input type='text' ref={usernameRef} className='text-input' placeholder='username'/>
            <input type='submit' className='btn' value='Create User' onClick={() => login()}/>
        </div>
    )
}

export default Login
