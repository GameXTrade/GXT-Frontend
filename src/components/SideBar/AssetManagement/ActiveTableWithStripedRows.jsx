import { Card, Typography,Tooltip,IconButton,Chip } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

import { useQuery } from '@tanstack/react-query';

import { Spinner } from "@material-tailwind/react";


import axios from '../../../api/axios';

const TABLE_HEAD = ["Name", "Status", "Date", "Price" ,""];

 
export function ActiveTableWithStripedRows() {

  const fetchItems = async () => {
    try {
          const response = await axios.get('/item');
          return response.data;
    } 
    catch (error){
          console.error('Error fetching items:', error);
    }
  };
  const {data: TABLE_ROWS, isLoading, error} = useQuery({
    queryKey: ['items'], 
    queryFn:  () => {
        return fetchItems()
    }
  });

  if (isLoading) return <div className="flex w-full h-full justify-center items-center"><Spinner className="h-12 w-12" /></div>;
  if (TABLE_ROWS && TABLE_ROWS.detail) {
    const errorMessage = TABLE_ROWS.detail;
    let response = ""
    if (errorMessage==="Invalid token type"){
      response = "Token existiert nicht: logge dich neu ein."
    }else if(errorMessage==="Not Found"){
      response = "Fehler beim laden der API URL"
    }
    return <div className="flex justify-center items-center text-4xl w-full h-full">{response}</div>;
  }

  if (!TABLE_ROWS || TABLE_ROWS.length === 0) {
    return <div className="flex justify-center items-center text-4xl w-full h-full">No data available</div>;
  }
  return (
    <Card className="overflow-scroll" style={{ maxHeight: "calc(100dvh - 85px)" }}>
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky top-0 bg-blue-gray-50">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
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
          { TABLE_ROWS.map(({ name, activated, created_at, price }, index) => (
            <tr key={name} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {name}
                </Typography>
              </td>
              <td className="p-4">
                <div className="w-max">
                  <Chip
                    size="sm"
                    variant="ghost"
                    value={activated ? "active" : "inactive"}
                    color={
                      activated
                        ? "green"
                        : "red"
                    }
                  />

                </div>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {new Date(created_at).toLocaleString()}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {price == 0 ? "free" : price.toString() + "€"}
                </Typography>
              </td>
              <td className="p-4">
                <Tooltip content="Edit Asset">
                  <IconButton variant="text">
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}