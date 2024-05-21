import { Carousel, Typography } from "@material-tailwind/react";

export function CarouselServerOrGame() {
  return (
    <Carousel autoplay={true} loop={true} className="rounded-xl my-6 h-[50dvh]">
      <div className="relative h-full w-full">
        <video
          className="h-full w-full object-cover rounded-lg"
          controls
          autoPlay
          muted
          loop
          style={{ objectFit: "cover", objectPosition: "center" }}
        >
          <source
            src="https://docs.material-tailwind.com/demo.mp4"
            // src="https://www.velor2.global/video/header.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/[.25]">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
          </div>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}
