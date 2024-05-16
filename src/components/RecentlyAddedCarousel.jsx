import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { EcommerceCard } from '../components/EcommerceCard';
import { Spinner } from "@material-tailwind/react";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useQuery } from '@tanstack/react-query';

const antiflags = [
  "Frau", "Mann", "Krieger", "Ninja", "Sura", "Schamane",
  "ITEM_ANTIFLAG_GET", "ITEM_ANTIFLAG_DROP", "ITEM_ANTIFLAG_SELL",
  "ITEM_ANTIFLAG_EMPIRE_A", "ITEM_ANTIFLAG_EMPIRE_B", "ITEM_ANTIFLAG_EMPIRE_C",
  "ITEM_ANTIFLAG_SAVE", "ITEM_ANTIFLAG_GIVE", "ITEM_ANTIFLAG_PKDROP",
  "ITEM_ANTIFLAG_STACK", "ITEM_ANTIFLAG_MYSHOP", "ITEM_ANTIFLAG_SAFEBOX",
  "Lykaner", "ITEM_ANTIFLAG_UNK19", "ITEM_ANTIFLAG_UNK20", "ITEM_ANTIFLAG_UNK21",
  "ITEM_ANTIFLAG_UNK22", "ITEM_ANTIFLAG_CHANGELOOK", "ITEM_ANTIFLAG_ENERGY",
  "ITEM_ANTIFLAG_PETFEED", "ITEM_ANTIFLAG_APPLY", "ITEM_ANTIFLAG_ACCE",
  "ITEM_ANTIFLAG_MAIL"
];


export default function RecentlyAddedCarousel() {

    const [items, setItems] = useState([]);


    const getIndividualAntiflagsFromSum = (antiflagSum) => {
      const selectedIndices = [];
      let remainingSum = antiflagSum;
  
      antiflags.forEach((flag, index) => {
          const flagValue = Math.pow(2, index);
          if ((antiflagSum & flagValue) !== 0) {
              selectedIndices.push(index);
              remainingSum -= flagValue;
          }
      });
      return selectedIndices.map((index) => {
        
        // console.log(antiflags[index])
        antiflags[index]
      }
      );
    };

    useEffect(() => {
        const fetchItems = async () => {
        try {
            const response = await axios.get('/item/recent');
            
            console.log(response.data)
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
        };

        fetchItems();

        return () => {
        // Cleanup logic if needed
        };
    }, []);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 3000, min: 1024 },
          items: 6
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
    <div className='font-semibold mt-10'>
        <div className='text-xl pl-10 py-4'>Recently Added</div>
        <Carousel responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            containerClass="pl-6"
            partialVisible={true}
        
        >
        {items && items.length > 0 ? 
          items
              // .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sortiere nach created_at absteigend
              .map(item => (
                  <EcommerceCard
                      key={item.item_id}
                      productId={item.item_id}
                      productName={item.name}
                      productPrice={item.price ? item.price + "€" : "free"}
                      productDescription={item.owner_name}
                      imageUrl={item.imagelink}
                  />
              ))
          : <Spinner className="h-12 w-12" />
        }
        </Carousel>
  </div>
  )
}
