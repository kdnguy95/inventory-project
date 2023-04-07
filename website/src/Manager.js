import { React, useContext, useEffect, useState } from 'react';
import { LoginContext } from './App.js';
import { useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap';

function Manager(prop) {
  const { loggedIn } = useContext(LoginContext);
  const [inventory, setInventory] = useState([])
  const navigate = useNavigate();

  // console.log('prop:\n', prop.manager)

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
    else {
      // console.log('user in useEffect:\n', user)
      fetch(`http://localhost:8080/inventory/${prop.manager}`)
        .then(res => res.json())
        .then(data => setInventory(data))
    }
  }, [loggedIn, prop.manager])

  const shortenDescription = (description) => {
    if(description.length > 100){
      let newDescription = description.slice(0,100) + '...';
      return newDescription
    }
    else return description
  }

  return (
    <>
      <h3 className="mt-3 mb-3">{prop.manager}'s Inventory</h3>
      <Table striped bordered hover variant='light'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.itemName}</td>
              <td>{shortenDescription(item.description)}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Manager;