'use client'
import { useRef } from "react";
import Slider from "react-elastic-carousel";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc"; // Import arrow icons from react-icons library

const breakPoints = [
  { width: 1, itemsToShow: 4 },
  { width: 550, itemsToShow: 10 },
  { width: 768, itemsToShow: 10 },
  { width: 1200, itemsToShow: 16 },
];

function SlickCarousel({ children }) {
  const carouselRef = useRef(null);

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Slider
        ref={carouselRef}
        itemsToScroll={1}
        itemsToShow={4}
        showArrows={false}
        itemPadding={[0, 5]}
        infinite
        pagination={false}
        breakPoints={breakPoints}
      >
        {children}
      </Slider>
      {/* <button onClick={handlePrevious} style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)", zIndex: 1, color: 'gray' }}>
        <VscChevronLeft size={40} />
      </button> */}
      {/* <button onClick={handleNext} style={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)", zIndex: 1, color: 'gray' }}>
        <VscChevronRight size={20} />
      </button> */}
    </div>
  );
}

export default SlickCarousel;
