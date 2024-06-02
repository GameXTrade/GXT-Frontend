import React, { useEffect, useState } from "react";
import { useItems } from "../services/queries";
import { Typography, Tooltip } from "@material-tailwind/react";
import ToggleButton from "./ToggleButton";

export default function RankingTable() {
  const allItemsQuery = useItems();
  const [itemsToShow, setItemsToShow] = useState([]);
  const [toggleState, setToggleState] = useState(false);

  useEffect(() => {
    if (
      !allItemsQuery.isLoading &&
      !allItemsQuery.isError &&
      allItemsQuery.data
    ) {
      let sortedItems;
      if (toggleState) {
        sortedItems = [...allItemsQuery.data].sort((a, b) => b.price - a.price);
      } else {
        // trend = views + download_count
        sortedItems = [...allItemsQuery.data].sort(
          (a, b) => b.views + b.download_count - (a.views + a.download_count)
        );
      }
      setItemsToShow(sortedItems.slice(0, 10));
    }
  }, [
    toggleState,
    allItemsQuery.isLoading,
    allItemsQuery.isError,
    allItemsQuery.data,
  ]);

  const handleToggle = (state) => {
    setToggleState(state);
  };

  if (allItemsQuery.isLoading) {
    return <>Loading...</>;
  }
  if (allItemsQuery.isError) {
    return <>Es gibt einen Fehler</>;
  }

  const topFiveItems = itemsToShow.slice(0, 5);
  const nextFiveItems = itemsToShow.slice(5, 10);

  const TABLE_HEAD = ["#", "Item", "Price"];

  return (
    <div className="px-4 lg:px-8 select-none mt-10">
      <div className="filter py-5">
        <div className="flex h-full justify-between items-center">
          <ToggleButton onToggle={handleToggle} />
          <Tooltip
            content="Function not yet available."
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <div className="bg-gray-100 px-3.5 rounded-xl py-3 hover:bg-gray-200 select-none">
              <Typography variant="small" color="black">
                View all
              </Typography>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-x-auto md:grid-cols-1">
        <div className="Table#1">
          <table className="w-full min-w-max text-left table-fixed">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`p-3.5 ${
                      index === 0 ? "w-1/12" : index === 1 ? "w-9/12" : "w-2/12"
                    }`}
                  >
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
                >
                  <td className="p-4 w-1/12">{index + 1}</td>
                  <td className="p-4 w-9/12 flex items-center">
                    <Tooltip
                      className="w-96 h-96 "
                      content={<img src={item.imagelink}></img>}
                    >
                      <img
                        className="w-[4rem] h-[4rem] rounded-lg border"
                        src={item.imagelink}
                        alt="image"
                      />
                    </Tooltip>
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
                  <td className="p-4 w-2/12 text-left">
                    {item.price === 0 ? "free" : `${item.price}€`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="Table#2">
          <table className="w-full min-w-max text-left table-fixed">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`p-3.5 ${
                      index === 0 ? "w-1/12" : index === 1 ? "w-9/12" : "w-2/12"
                    }`}
                  >
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
                  <td className="p-4 w-1/12">{index + 6}</td>
                  <td className="p-4 w-9/12 flex items-center">
                    <Tooltip
                      className="w-96 h-96"
                      content={<img src={item.imagelink}></img>}
                    >
                      <img
                        className="w-[4rem] h-[4rem] rounded-lg border"
                        src={item.imagelink}
                        alt="image"
                      />
                    </Tooltip>
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
                  <td className="p-4 w-2/12 text-left">
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
