import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function EcommerceCard({
  item, // Das ausgewählte Element
}) {
  const { name, price, owner_name, imagelink } = item;

  const navigate = useNavigate();
  const handleClick = () => {
    // Erstelle ein Date-Objekt, das 10 Minuten in der Zukunft liegt
    Cookies.set("SelectedItem", JSON.stringify(item));
    navigate("product");
  };

  return (
    <Card className="h-[25rem] justify-between">
      <CardHeader shadow={true} floated={false} className="">
        <img
          src={imagelink}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="">
        <div className="mb-2 flex flex-col items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            {price ? price + "€" : "free"}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75 flex items-center justify-center text"
        >
          {owner_name}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          onClick={handleClick}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          DETAILS
        </Button>
        {/* </Link> */}
      </CardFooter>
    </Card>
  );
}
