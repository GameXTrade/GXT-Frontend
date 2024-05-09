import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { EcommerceCard } from '../components/EcommerceCard';


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function RecentlyAddedCarousel() {

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
    }, []);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
    <div className='font-semibold'>
        <div className='text-xl pl-10 py-4'>Recently Added</div>
        <Carousel responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            containerClass="px-14"
        >
        {items && items.length > 0 ? 
            items.map(item => (
                <EcommerceCard
                    key={item.item_id}
                    productId={item.item_id}
                    productName={item.name}
                    productPrice={item.price? item.price + "€": "free"}
                    productDescription={item.owner_name}
                    imageUrl={item.imagelink}
                />
            ))
            : <div>Keine Elemente vorhanden oder Server bootet gerade.</div>
        }
        </Carousel>
  </div>
  )
}
