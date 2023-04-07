import { React, useContext, useEffect, useState } from 'react';
import { LoginContext } from './App.js';
import { useNavigate } from 'react-router-dom'
import { Col, Row, Form, Table, Button} from 'react-bootstrap';

function MyInventory() {
  const { loggedIn, user } = useContext(LoginContext);
  const [inventory, setInventory] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
    else {
      fetch(`http://localhost:8080/inventory/${user}`)
        .then(res => res.json())
        .then(data => {
          data.sort((a,b) => a.id - b.id);
          setInventory(data)
        })
    }
  }, [loggedIn])

  const updateHandler = (event) => {
    event.preventDefault();
    let updatedInventory = inventory.slice();
    for (let i = 0; i < event.target.length - 1; i++) {
      let newQuantity = event.target[i].value;
      if (newQuantity) {
        updatedInventory[i].quantity = Number(newQuantity);
      }
    }
    fetch(`http://localhost:8080/inventory/${user}`, {
      method: "PATCH",
      body: JSON.stringify(updatedInventory),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        data.sort((a,b) => a.id - b.id);
        setInventory(data)
        alert('Quantity updated')
      })
      .catch(err => alert(err))
  }

  const addHandler = (event) => {
    event.preventDefault();
    console.log('add values:\n', event)
    let newItem = {
      itemName: event.target[0].value,
      quantity: event.target[1].value,
      description: event.target[2].value
    };

    console.log('newItem:\n', newItem)
    fetch(`http://localhost:8080/inventory/${user}`, {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        data.sort((a,b) => a.id - b.id);
        setInventory(data)
        alert('New item added')
      })
      .catch(err => {
        console.log('Error:\n', err)
      })
  }

  const shortenDescription = (description) => {
    if(description.length > 100){
      let newDescription = description.slice(0,100) + '...';
      return newDescription
    }
    else return description
  }

  const deleteItem = (item) => {
    console.log('item.id:\n', item.id)
    fetch(`http://localhost:8080/inventory/${user}`, {
      method: "DELETE",
      body: JSON.stringify({id: item.id}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(data => {
      data.sort((a,b) => a.id -b.id);
      setInventory(data);
      alert(`${item.itemName} removed`)
    })
    .catch(err => {console.log('Error:\n', err)})
  }

  return (
    <>
      <h3 className="mt-3 mb-3">Your Inventory</h3>
      <Form onSubmit={(e) => updateHandler(e)}>
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
                <td>
                  <Form.Control type='number' placeholder={item.quantity} />
                  <Button size='sm' variant='dark' onClick={() => deleteItem(item)}>remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <button type='submit' className='btn btn-dark mb-3'>Update Quantity</button>
      </Form>
      <h3>Add an Item</h3>
      <Form onSubmit={(e) => addHandler(e)}>
        <Row className='mb-3'>
          <Col>
            <Form.Control placeholder="Item Name" required/>
          </Col>
          <Col>
            <Form.Control placeholder="Quantity" type='number' required/>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" placeholder="Description" rows={3} />
          </Form.Group>
        </Row>
        <button type='submit' className='btn btn-dark mb-3'>Add Item</button>
      </Form>
    </>
  )
}

export default MyInventory;