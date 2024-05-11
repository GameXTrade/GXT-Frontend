import RecentlyAddedCarousel from "../components/RecentlyAddedCarousel";
import { CarouselServerOrGame } from "../components/CarouselServerOrGame";

function Home() {

  return (
    <div>
      <title>GameXTrade</title>
      <CarouselServerOrGame />

      {/* Latest Added top 10 */}
      <RecentlyAddedCarousel />
    </div>
  );
}

export default Home;
