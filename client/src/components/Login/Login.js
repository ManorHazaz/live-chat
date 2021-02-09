import './Login.css';

import { useRef } from 'react';

function Login({ loginContact }) {

    const contactRef = useRef();

    function login()
    {
        loginContact( contactRef.current.value )
    }
    return (
        <div className='login'>
            <h1> Live Chat </h1>
            <input type='text' ref={contactRef} className='text-input' placeholder='Name'/>
            <input type='submit' className='btn' value='Enter chat' onClick={() => login()}/>
        </div>
    )
}

export default Login
