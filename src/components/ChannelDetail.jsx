import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((res) => setChannelDetail(res?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`).then((res) =>
      setVideos(res?.items),
    );
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(231,0,0,1) 0%, rgba(0,10,223,1) 100%)',
            zIndex: 10,
            height: '300px',
          }}
        />
        <ChannelCard marginTop="-110px" channelDetail={channelDetail} />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' } }} />
        {!videos.length ? (
          <CircularProgress color="error" size={100} sx={{ ml: '500px', mt: '100px' }} />
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
