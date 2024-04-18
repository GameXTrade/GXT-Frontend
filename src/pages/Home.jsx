import React, { useEffect } from 'react';
import axios from '../api/axios';

function Home() {
  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       // Stellen Sie sicher, dass `withCredentials: true` gesetzt ist
  //       const response = await axios.get('/user', {});
  //       console.log('Server response:', response.data);
  //     } catch (error) {
  //       console.error('Error during token validation:', error);
  //     }
  //   };

  //   checkToken();
  // }, []);

  return (
    <div>Home</div>
  );
}

export default Home;
