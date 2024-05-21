import React, { useEffect, useState } from "react";
import { useItems } from "../services/queries";
import { Typography, Tooltip } from "@material-tailwind/react";
import ToggleButton from "./ToggleButton";

export default function RankingTable() {
  const allItemsQuery = useItems();
  const [itemsToShow, setItemsToShow] = useState([]);
  const [toggleState, setToggleState] = useState(false);

  // Initial loading of items
  useEffect(() => {
    if (
      !allItemsQuery.isLoading &&
      !allItemsQuery.isError &&
      allItemsQuery.data
    ) {
      const items = allItemsQuery.data.slice(0, 10);
      setItemsToShow(items);
    }
  }, [allItemsQuery.isLoading, allItemsQuery.isError, allItemsQuery.data]);

  // Sorting items based on toggleState
  useEffect(() => {
    if (allItemsQuery.data) {
      const items = allItemsQuery.data.slice(0, 10);
      if (toggleState) {
        const sortedItems = [...items].sort((a, b) => b.price - a.price);
        setItemsToShow(sortedItems);
      } else {
        setItemsToShow(items);
      }
    }
  }, [toggleState, allItemsQuery.data]);

  const handleToggle = (state) => {
    // console.log("Current state:", state ? "Trending" : "Top");
    setToggleState(state);
  };

  if (allItemsQuery.isLoading) {
    return <>Loading...</>;
  }
  if (allItemsQuery.isError) {
    return <>There is an error</>;
  }

  const topFiveItems = itemsToShow.slice(0, 5);
  const nextFiveItems = itemsToShow.slice(5, 10);

  const TABLE_HEAD = ["#", "Item", "Price"];

  return (
    <div className="px-8">
      <div className="filter py-5 ">
        <div className="flex h-full justify-between items-center">
          <ToggleButton onToggle={handleToggle} />
          <Tooltip
            content="Feature not available yet."
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <div className="bg-gray-50 px-2.5 rounded-xl py-2 hover:bg-gray-100 select-none">
              <Typography variant="small" color="black">
                View all
              </Typography>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 lg:overflow-x-auto select-none">
        <div className="Table#1">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="p-3.5">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topFiveItems.map((item, index) => (
                <tr
                  key={item.name}
                  className="border-t border-indigo-50 hover:bg-gray-50 cursor-pointer"
                  // onClick={() => console.log(item)}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="flex p-4 items-center">
                    <img
                      className="w-12 h-12 rounded-lg border"
                      src={item.imagelink}
                      alt="image"
                    />
                    <div className="details pl-3">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {item.name}
                      </Typography>
                      owner: {item.owner_name}
                    </div>
                  </td>
                  <td className="p-4">
                    {item.price === 0 ? "free" : `${item.price}€`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="Table#2">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="top-0">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="p-3.5">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nextFiveItems.map((item, index) => (
                <tr
                  key={item.name}
                  className="border-t border-indigo-50 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">{index + 6}</td>
                  <td className="flex p-4 items-center">
                    <img
                      className="w-12 h-12 rounded-lg border"
                      src={item.imagelink}
                      alt="image"
                    />
                    <div className="details pl-3">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {item.name}
                      </Typography>
                      owner: {item.owner_name}
                    </div>
                  </td>
                  <td className="p-4">
                    {item.price === 0 ? "free" : `${item.price}€`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
