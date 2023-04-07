import { React, useContext } from 'react';
import { ItemsContext } from './App.js';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

function Home() {
  const { items } = useContext(ItemsContext);

  const shortenDescription = (description) => {
    const expandDescription = () => (
      <Tooltip>{description}</Tooltip>
    )
    if(description.length > 100){
      let newDescription = description.slice(0,100);
      return (
        <>
        <OverlayTrigger
          placement='right'
          delay={{show:250, hide:400}}
          overlay={expandDescription}>
        <span>{newDescription}...</span>
        </OverlayTrigger>
        </>
      )
    }
    else return description
  }

  return (
    <>
      <h3 className="mt-3 mb-3">All Inventory</h3>
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
          {items.map((item, index) => (
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

export default Home;