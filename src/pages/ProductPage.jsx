import React, { useState, useEffect } from "react";
import { Typography, Button, Tooltip } from "@material-tailwind/react";
import {
  ArrowDownTrayIcon,
  EyeIcon,
  LinkIcon,
  FlagIcon,
} from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import ReportModal from "../components/Productpage/modal/ReportModal";

// import { FeaturedImageGallery } from "../components/Productpage/FeaturedImageGallery";

import { updateDownloadCount } from "../services/api";

import { useItem } from "../services/queries";

export default function ProductPage() {
  const { item_id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const navigate = useNavigate();
  const Item = useItem(item_id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (Item.data) {
      setProductInfo(Item.data);
    }
  }, [Item.data]);

  const handleProductAction = async () => {
    try {
      const response = await updateDownloadCount(item_id);
      console.log(response);
    } catch (e) {
      console.error("Fehler beim Aktualisieren der Download-Anzahl:", e);
    } finally {
      if (productInfo[0].price !== 0) {
        navigate("/me", { state: { openComponent: "Inbox" } });
      } else {
        window.open(productInfo[0].link, "_blank", "noopener,noreferrer");
      }
    }
  };

  if (Item.isPending) return <div>Loading...</div>;
  if (!productInfo || Object.keys(productInfo).length === 0) {
    return <div>Kein Element mit der angegebenen ID gefunden.</div>;
  }
  if (!productInfo) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="flex px-20 pt-5">
      <title>GameXTrade | Productinfo</title>
      <ReportModal open={isModalOpen} handleClose={toggleModal} />
      <div className="Card flex flex-col w-[50rem] h-[40rem] border rounded-xl bg-white p-1 justify-center items-center">
        <div className="body">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={productInfo[0].image_link}
            alt=""
          />
        </div>
        {/* <a href={productInfo.price === 0 ? productInfo.link : "/me"}> */}
        <Button className="mt-2" onClick={handleProductAction}>
          {productInfo[0].price === 0 ? "Download" : `buy`}
        </Button>
        {/* </a> */}
      </div>
      <div className="Infoboard flex flex-col rounded-xl ml-5 w-full pl-5">
        <Typography className="inline-block" variant="h5" color="blue">
          {productInfo[0].owner_name}
        </Typography>
        <Typography className="pt-3" variant="h2" color="black">
          {productInfo[0].name}
        </Typography>
        <div className="flex pt-3 justify-between">
          <div className="flex">
            <div className="s-info flex items-center">
              <ArrowDownTrayIcon className="h-6 w-6 text-gray-500" />
              <div className="pl-2">{productInfo[0].download_count}</div>
              <Typography className="pl-2" variant="paragraph" color="black">
                downloads
              </Typography>
            </div>
            <div className="d-info flex items-center pl-3">
              <EyeIcon className="h-6 w-6 text-gray-500" />
              <div className="pl-2">{productInfo[0].views}</div>
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
          <div className="flex cursor-pointer" onClick={toggleModal}>
            <Tooltip
              content="Report."
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <FlagIcon className="h-6 w-6 hover:text-red-500 text-gray-500" />
            </Tooltip>
          </div>
        </div>
        <div>
          <div className="pt-3 mt-3 border rounded-xl">
            {/* <FeaturedImageGallery /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
