import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams } from 'react-router-dom';
const SearchFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);
  const { search } = useParams();
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${search}`).then((data) => setVideos(data.items));
  }, [search]);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white' }}>
        Search results for: <span style={{ color: '#f31503' }}>{search}</span> videos
      </Typography>

      <Box display="flex">
        <Box sx={{ mr: { sm: '100px' } }}>{<Videos videos={videos} />}</Box>
      </Box>
    </Box>
  );
};

export default SearchFeed;
