import Slider from "react-slick";
import type { FunctionComponent, MouseEventHandler } from "react";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";

const LeftArrow: FunctionComponent<{ onClick: MouseEventHandler }> = ({
  onClick,
}) => {
  return (
    <FiArrowLeftCircle
      className="absolute top-1/2 z-10 ml-2 -translate-y-1/2 rounded-full bg-white text-3xl text-black hover:cursor-pointer "
      onClick={(e) => {
        console.log("CLICK");
        onClick(e);
      }}
    />
  );
};

const RightArrow: FunctionComponent<{ onClick: MouseEventHandler }> = ({
  onClick,
}) => {
  return (
    <FiArrowRightCircle
      className="absolute top-1/2 right-0 z-10 mr-2 -translate-y-1/2 rounded-full bg-white text-3xl text-black hover:cursor-pointer"
      onClick={(e) => {
        console.log("CLICK");
        onClick(e);
      }}
    />
  );
};

const Carousel: FunctionComponent<{
  images: string[];
  buildingName: string;
}> = ({ images, buildingName }) => {
  return (
    <Slider
      infinite={true}
      speed={500}
      slidesToScroll={1}
      arrows={true}
      //@ts-ignore
      prevArrow={<LeftArrow />}
      //@ts-ignore
      nextArrow={<RightArrow />}
      className="relative my-2 min-h-[10rem] w-full rounded-md bg-gray-200"
    >
      {images.map((imageKey) => (
        <div className="relative w-full pt-2" key={imageKey}>
          <img
            className="m-auto h-40 rounded-md"
            src={`http://localhost:3000/resources/${imageKey}`}
            alt={buildingName}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
