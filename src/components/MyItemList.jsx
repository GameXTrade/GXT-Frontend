import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

function MyItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/item');
        console.log(response.data)
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic if needed
    };
  }, []); // Empty dependency array to only run effect on mount

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Antiflag</th>
            <th>Created At</th>
            <th>Image</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.item_id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.antiflag}</td>
              <td>{item.created_at}</td>
              <td><img src={item.imagelink} alt={item.name} style={{ maxWidth: '100px' }} /></td>
              <td><a href={item.link} target="_blank" rel="noopener noreferrer">Downloadlink</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyItemList;
