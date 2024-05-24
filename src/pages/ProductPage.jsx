import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Typography, Button } from "@material-tailwind/react";
import {
  ArrowDownTrayIcon,
  EyeIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";

import { FeaturedImageGallery } from "../components/Productpage/FeaturedImageGallery";

export default function ProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  useEffect(() => {
    const cookieValue = Cookies.get("SelectedItem");
    if (cookieValue) {
      setProductInfo(JSON.parse(cookieValue));
    }
  }, []);
  if (!productInfo) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="flex px-20 pt-5">
      <title>GameXTrade | Productinfo</title>
      <div className="Card flex flex-col w-[50rem] h-[40rem] border rounded-xl bg-white p-1 justify-center items-center">
        <div className="body">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={productInfo.imagelink}
            alt=""
          />
        </div>
        <Button className="mt-2">Download</Button>
      </div>
      <div className="Infoboard flex flex-col rounded-xl ml-5 w-full pl-5">
        <Typography
          className="inline-block cursor-pointer "
          variant="h5"
          color="blue"
        >
          {productInfo.owner_name}
        </Typography>
        <Typography className="pt-3" variant="h2" color="black">
          {productInfo.name}
        </Typography>
        <div className="flex pt-3">
          <div className="s-info flex items-center">
            <ArrowDownTrayIcon className="h-6 w-6 text-gray-500" />
            <div className="pl-2">{productInfo.download_count}</div>
            <Typography className="pl-2" variant="paragraph" color="black">
              downloads
            </Typography>
          </div>
          <div className="d-info flex items-center pl-3">
            <EyeIcon className="h-6 w-6 text-gray-500" />
            <div className="pl-2">{productInfo.download_count}</div>
            <Typography className="pl-2" variant="paragraph" color="black">
              views
            </Typography>
          </div>
          <div className="d-info flex items-center pl-3">
            <LinkIcon className="h-6 w-6 text-gray-500" />
            <Typography className="pl-2" variant="paragraph" color="black">
              Metin2
            </Typography>
          </div>
        </div>
        <div>
          <div className="pt-3">
            <FeaturedImageGallery />
          </div>
        </div>
      </div>
    </div>
  );
}
