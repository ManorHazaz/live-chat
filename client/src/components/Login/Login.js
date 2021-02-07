import './Login.css';

function Login() {
    return (
        <div className='login'>
            <h1> Live Chat </h1>
            <input type='text' className='text-input' placeholder='username'/>
            <input type='submit' className='btn' value='Create User'/>
        </div>
    )
}

export default Login
