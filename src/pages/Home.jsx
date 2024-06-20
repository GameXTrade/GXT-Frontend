import RecentlyAddedCarousel from "../components/HomeDisplays/RecentlyAddedCarousel";

import { CarouselServerOrGame } from "../components/HomeDisplays/CarouselServerOrGame";

import RankingTable from "../components/HomeDisplays/RankingTable";
// import UploadFileForm from "../components/UploadFileForm";
import Slider from "../components/Slider";

import {
  useRecentItems,
  useNotableItems,
  useMostDownloadedInDayItems,
} from "../services/queries";

function Home() {
  return (
    <div className="px-20">
      <title>GameXTrade</title>
      {/* <UploadFileForm /> */}
      <CarouselServerOrGame />
      {/* Latest Added top 10 Items*/}
      <RankingTable />
      {/*  */}
      {/* <RecentlyAddedCarousel /> */}

      {/* <img
        src="https://drive.google.com/thumbnail?id=1MUSEFuESibzl6xd66zqxqRV2HitmWLVs"
        alt="image"
      /> */}

      {/* Notable = viewed but not downloaded */}
      <Slider title={"Notable Items"} fetchitems={useNotableItems} />
      {/* receltly added items */}
      <Slider title={"Recently Added"} fetchitems={useRecentItems} />
      {/*  */}
      <Slider
        title={"Top 10 Downloads Today"}
        fetchitems={useMostDownloadedInDayItems}
      />
    </div>
  );
}

export default Home;
