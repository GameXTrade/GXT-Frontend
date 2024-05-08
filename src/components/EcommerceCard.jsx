import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function EcommerceCard({ productName, productPrice, productDescription, imageUrl }) {

    return (
        <Card className="min-w-64 max-w-64 max-h-80 m-2">
          <CardHeader shadow={true} floated={false}>
            <img
              src={imageUrl}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex flex-col items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {productName}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                {productPrice}
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75 flex items-center justify-center text"
            >
                {productDescription}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              DETAILS
            </Button>
          </CardFooter>
        </Card>
      );
  }