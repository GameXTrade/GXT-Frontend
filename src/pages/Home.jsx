import MyItemList from '../components/MyItemList';
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { EcommerceCard } from '../components/EcommerceCard';

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/item/all');
        // console.log(response.data)
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
      <title>GameXTrade</title>
      {/* <MyItemList /> */}
      <div className='p-9'>
        <h2 className='text-2xl pb-8'>Top 10</h2>
        <div className='flex flex-wrap'>
        {items && items.length > 0 ? 
          items.map(item => (
            <EcommerceCard
              key={item.item_id}
              productName={item.name}
              productPrice="$95.00"
              productDescription={item.owner_name}
              imageUrl={item.imagelink}
            />
          ))
          : <div>Keine Elemente vorhanden oder Server bootet gerade.</div>
        }

              
             
        </div>
      </div>
    </div>
  );
}

export default Home;
