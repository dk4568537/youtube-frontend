import { Button, Box } from "@chakra-ui/react";
import React from "react";
import SlickCarousel from "../../slickCarosel/slickCarosel";
import { Link } from "react-router-dom";

const Category = () => {
  const audioItems = [
    { title: "All" },
    { title: "Music" },
    { title: "MovieMusicals" },
    { title: "Javascript" },
    { title: "Dramedy" },
    { title: "Dubbing" },
    { title: "Mixes" },
    { title: "Jackie Shroff" },
    { title: "Live" },
    { title: "Nusrat Fateh Ali Khan" },
    { title: "News" },
    { title: "Pakistani Dramas" },
    { title: "C++" },
    { title: "Movies" },
    { title: "Urdu Song" },
    { title: "Panjabi songs" },
  ];

  return (
    <Box data-carousel="slide">
      <SlickCarousel>
        {audioItems.map((item, index) => (
          <div key={index}>
            <Link to={`/category/${item.title.toLowerCase()}`}>
              <Button size="xs" fontSize="13px">
                {item.title}
              </Button>
            </Link>
          </div>
        ))}
      </SlickCarousel>
    </Box>
  );
};

export default Category;
