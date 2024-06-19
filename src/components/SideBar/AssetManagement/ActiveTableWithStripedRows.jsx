import React, { useState } from "react";
import {
  Card,
  Typography,
  Tooltip,
  IconButton,
  Button,
  Chip,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import axios from "../../../api/axios";
import ItemFormModal from "../modals/ItemFormModal";

const TABLE_HEAD = [
  "Preview",
  "Name",
  "Status",
  "Downloads",
  "Price",
  "Actions",
];

export function ActiveTableWithStripedRows() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get("/item");
      return response.data;
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const {
    data: TABLE_ROWS,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (isLoading)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Spinner className="h-12 w-12" />
      </div>
    );

  if (TABLE_ROWS && TABLE_ROWS.detail) {
    const errorMessage = TABLE_ROWS.detail;
    let response = "";
    if (errorMessage === "Invalid token type") {
      response = "Token existiert nicht: logge dich neu ein.";
    } else if (errorMessage === "Not Found") {
      response = "Fehler beim laden der API URL";
    }
    return (
      <div className="flex justify-center items-center text-4xl w-full h-full">
        {response}
      </div>
    );
  }

  // if (!TABLE_ROWS || TABLE_ROWS.length === 0) {
  //   return <div className="flex justify-center items-center text-4xl w-full h-full">No data available</div>;
  // }

  const totalPages = Math.ceil(TABLE_ROWS.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const paginatedRows = TABLE_ROWS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card
      className="flex flex-col shadow-none border bg-white"
      style={{ height: "calc(100dvh - 83px)" }}
    >
      <CardHeader
        floated={false}
        className="rounded-none shadow-none m-0 h-20 bg-transparent p-2"
      >
        <div className="flex h-full  items-center justify-between px-3">
          <Typography
            variant="h2"
            color="black"
            className="leading-none opacity-70 font-semibold"
          >
            My Assets
          </Typography>
          <div>
            <Button className="w-13 h-13" onClick={toggleModal}>
              Upload Asset
            </Button>
          </div>
        </div>
        <ItemFormModal open={isModalOpen} handleClose={toggleModal} />
      </CardHeader>
      <CardBody className="flex-1 p-0 t-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="top-0">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b p-4">
                  <Typography
                    variant="h5"
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
            {paginatedRows.map(
              (
                { item_id, image_link, name, activated, download_count, price },
                index
              ) => (
                <tr
                  key={name}
                  className="border-b border-indigo-50 hover:bg-blue-gray-50/50"
                >
                  <dt className="p-4">
                    <img
                      className="w-10 h-10 rounded"
                      src={image_link}
                      alt=""
                    />
                  </dt>
                  <td className="p-4">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={activated ? "active" : "inactive"}
                        color={activated ? "green" : "red"}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {download_count}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {price === 0 ? "free" : `${price}€`}
                    </Typography>
                  </td>
                  <td
                    className="p-4"
                    onClick={() => {
                      console.log(paginatedRows);

                      console.log(item_id);
                    }}
                  >
                    <Tooltip content="Edit Asset">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <Button
          variant="outlined"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <IconButton
              key={index + 1}
              variant={currentPage === index + 1 ? "outlined" : "text"}
              size="sm"
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="outlined"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
