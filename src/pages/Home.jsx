import RecentlyAddedCarousel from "../components/RecentlyAddedCarousel";
import { CarouselServerOrGame } from "../components/CarouselServerOrGame";

import RankingTable from "../components/RankingTable";
import UploadFileForm from "../components/UploadFileForm";

function Home() {
  return (
    <div className="px-20">
      <title>GameXTrade</title>
      {/* <UploadFileForm /> */}
      <CarouselServerOrGame />

      {/* Latest Added top 10 */}
      <RankingTable />
      <RecentlyAddedCarousel />
      {/* <img
        src="https://drive.google.com/thumbnail?id=1MUSEFuESibzl6xd66zqxqRV2HitmWLVs"
        alt="image"
      /> */}
    </div>
  );
}

export default Home;
