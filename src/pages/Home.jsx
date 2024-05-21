import RecentlyAddedCarousel from "../components/RecentlyAddedCarousel";
import { CarouselServerOrGame } from "../components/CarouselServerOrGame";

import RankingTable from "../components/RankingTable";
function Home() {
  return (
    <div className="px-20">
      <title>GameXTrade</title>

      <CarouselServerOrGame />

      {/* Latest Added top 10 */}
      <RankingTable />
      <RecentlyAddedCarousel />
    </div>
  );
}

export default Home;
