import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { LoginContext, ManagersContext } from './App.js';

function Login(){
  const { setLoggedIn, setUser } = useContext(LoginContext);
  const { setManagers } = useContext(ManagersContext);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    let username = event.target[0].value;
    let password = event.target[1].value;

    fetch('http://localhost:8080/login', {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => {
      if(res.status === 200){
        setLoggedIn(true);
        setUser(username);
        navigate('/myinventory');
      }
      return res.json();
    })
    .then(data => {
      let managersList = data.message.filter(manager => manager !== username)
      setManagers(managersList)
    })
    .catch(err => console.log('err:\n',err))
  }

  return(
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <h2>Login</h2>
        <div className='mb-3'>
          <label>Username</label>
          <input type='text' className='form-control' placeholder='Username' required/>
        </div>
        <div className='mb-3'>
          <label>Password</label>
          <input type='password' className='form-control' placeholder='Password' required/>
        </div>
        <div className='d-grid'>
          <button type='submit' className='btn btn-dark'>
            Login
          </button>
        </div>
      </form>
    </>
  )
}

export default Login;