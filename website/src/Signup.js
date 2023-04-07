import React from 'react';
import { useNavigate } from 'react-router-dom'

function Signup(){
  // firstName, lastName, username, password
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    let firstName = event.target[0].value;
    let lastName = event.target[1].value;
    let username = event.target[2].value;
    let password = event.target[3].value;
    console.log('event.target:\n',event)

    fetch('http://localhost:8080/signup', {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => {
      console.log('res.status',res.status);
      if(res.status === 200){
        alert('Account Registered')
        navigate('/login');
      }
      return res.json();
    })
    .catch(err => console.log('err:\n',err))
  }

  return(
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <h2>Register</h2>
        <div className='mb-3'>
          <label>First Name</label>
          <input type='text' className='form-control' placeholder='First Name' required/>
        </div>
        <div className='mb-3'>
          <label>Last Name</label>
          <input type='text' className='form-control' placeholder='Last Name' required/>
        </div>
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
            Signup
          </button>
        </div>
      </form>
    </>
  )
}

export default Signup;