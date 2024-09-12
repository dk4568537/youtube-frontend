import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';
import Channels from '../channels';
import Category from '../category/category';

const CategoryPage = () => {
  const { category } = useParams(); // Access the dynamic route parameter

  // Simulated data for the example
  const audioItems = [
    { id: 1, title: "All", description: "A collection of all items" },
    { id: 2, title: "Music", description: "Enjoy a variety of music" },
    { id: 3, title: "MovieMusicals", description: "Musicals from popular movies" },
    { id: 4, title: "Javascript", description: "Learning resources for Javascript" },
    { id: 5, title: "Dramedy", description: "A blend of drama and comedy" },
    { id: 6, title: "Dubbing", description: "Content with voice dubbing" },
    { id: 7, title: "Mixes", description: "Various mixes and compilations" },
    { id: 8, title: "Jackie Shroff", description: "A collection of Jackie Shroff's work" },
    { id: 9, title: "Live", description: "Live performances and events" },
    { id: 10, title: "Nusrat Fateh Ali Khan", description: "Nusrat Fateh Ali Khan's songs" },
    { id: 11, title: "News", description: "Latest news and updates" },
    { id: 12, title: "Pakistani Dramas", description: "Popular Pakistani dramas" },
    { id: 13, title: "C++", description: "Learning resources for C++" },
    { id: 14, title: "Movies", description: "Popular movies" },
    { id: 15, title: "Urdu Song", description: "A collection of Urdu songs" },
    { id: 16, title: "Panjabi songs", description: "A collection of Panjabi songs" },
  ];

  // Find the current category's data
  const currentCategory = audioItems.find(item => item.title.toLowerCase() === category?.toLowerCase());

  return (
    <Box p={1}>
      {currentCategory ? (
        <>
        <Category/>
          <Heading as="h1" size="lg">{currentCategory.title}</Heading>
          <Text mt={2}>{currentCategory.description}</Text>
          <Channels/>
        </>
      ) : (
        <Text>No data found for this category.</Text>
      )}
    </Box>
  );
};

export default CategoryPage;
