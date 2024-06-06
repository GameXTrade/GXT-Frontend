import React, { useState, useEffect } from "react";

import { useRecentItems } from "../services/queries";

import { EcommerceCard } from "../components/EcommerceCard";
import { Spinner, Typography } from "@material-tailwind/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";

const antiflags = [
  "Frau",
  "Mann",
  "Krieger",
  "Ninja",
  "Sura",
  "Schamane",
  "ITEM_ANTIFLAG_GET",
  "ITEM_ANTIFLAG_DROP",
  "ITEM_ANTIFLAG_SELL",
  "ITEM_ANTIFLAG_EMPIRE_A",
  "ITEM_ANTIFLAG_EMPIRE_B",
  "ITEM_ANTIFLAG_EMPIRE_C",
  "ITEM_ANTIFLAG_SAVE",
  "ITEM_ANTIFLAG_GIVE",
  "ITEM_ANTIFLAG_PKDROP",
  "ITEM_ANTIFLAG_STACK",
  "ITEM_ANTIFLAG_MYSHOP",
  "ITEM_ANTIFLAG_SAFEBOX",
  "Lykaner",
  "ITEM_ANTIFLAG_UNK19",
  "ITEM_ANTIFLAG_UNK20",
  "ITEM_ANTIFLAG_UNK21",
  "ITEM_ANTIFLAG_UNK22",
  "ITEM_ANTIFLAG_CHANGELOOK",
  "ITEM_ANTIFLAG_ENERGY",
  "ITEM_ANTIFLAG_PETFEED",
  "ITEM_ANTIFLAG_APPLY",
  "ITEM_ANTIFLAG_ACCE",
  "ITEM_ANTIFLAG_MAIL",
];

export default function RecentlyAddedCarousel() {
  const [items, setItems] = useState([]);
  const recentlytemsQuery = useRecentItems();
  // const getIndividualAntiflagsFromSum = (antiflagSum) => {
  //   const selectedIndices = [];
  //   let remainingSum = antiflagSum;

  //   antiflags.forEach((flag, index) => {
  //       const flagValue = Math.pow(2, index);
  //       if ((antiflagSum & flagValue) !== 0) {
  //           selectedIndices.push(index);
  //           remainingSum -= flagValue;
  //       }
  //   });
  //   return selectedIndices.map((index) => {

  //     // console.log(antiflags[index])
  //     antiflags[index]
  //   }
  //   );
  // };

  useEffect(() => {
    if (
      !recentlytemsQuery.isLoading &&
      !recentlytemsQuery.isError &&
      recentlytemsQuery.data
    ) {
      const items = recentlytemsQuery.data;
      setItems(items);
    }
  }, [recentlytemsQuery.data]);

  return (
    <div className="mt-[6rem]">
      <div className="text-2xl py-4">
        <Typography variant="h4" color="black" className="title pl-1">
          Recently Added
        </Typography>
      </div>
      <div className="">
        <Swiper
          // effect={"coverflow"}
          grabCursor={true}
          slidesPerView={3}
          // centeredSlides={true}
          spaceBetween={"16px"}
          // loop={true}
          // coverflowEffect={{
          //   rotate: 0,
          //   stretch: 0,
          //   depth: 100,
          //   modifier: 3.5,
          //   slideShadows: false,
          // }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
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
