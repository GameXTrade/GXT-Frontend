import React, { useState, useEffect } from "react";

// import { useRecentItems } from "../services/queries";

import { EcommerceCard } from "../components/EcommerceCard";
import { Spinner, Typography } from "@material-tailwind/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";

function Slider({ title, fetchitems }) {
  const [items, setItems] = useState([]);
  const allItems = fetchitems();

  useEffect(() => {
    if (!allItems.isLoading && !allItems.isError && allItems.data) {
      const items = allItems.data;
      setItems(items);
    }
  }, [allItems.data]);

  return (
    <div className="mt-[1rem]">
      <div className="text-2xl py-4">
        <Typography variant="h4" color="black" className="title pl-1">
          {title}
        </Typography>
      </div>
      <div className="">
        <Swiper
          grabCursor={true}
          //   slidesPerView={3}
          spaceBetween={55}
          // pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
          breakpoints={{
            500: {
              slidesPerView: 1,
            },
            696: {
              slidesPerView: 2,
            },
            960: {
              slidesPerView: 3,
            },
            1218: {
              slidesPerView: 4,
            },
            1500: {
              slidesPerView: 5,
            },
          }}
        >
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <SwiperSlide key={item.item_id} className="py-2 ">
                <EcommerceCard Item={item} />
              </SwiperSlide>
            ))
          ) : (
            <Spinner className="h-12 w-12" />
          )}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow"></div>
            <div className="swiper-button-next slider-arrow"></div>
            <div className="swiper-pagination flex justify-center bottom-0 pb-2"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
