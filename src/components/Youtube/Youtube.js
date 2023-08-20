import React, { useState } from 'react'

import YouTube, { YouTubeProps } from 'react-youtube';
import Search from './Search';
import youtubeApi from './api'
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';
import { Box, Grid } from '@mui/material';
var getYouTubeID = require('get-youtube-id');
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
function Youtube() {
  const [videoMetaInfo, setVideoMetaInfo] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const handleSearch = async (keyword) => {
    const response = await youtubeApi.get("/search", {
      params: {
        q: keyword
      }
    });
    setVideoMetaInfo(response.data.items)
    setSelectedVideoId(response.data.items[0].id.videoId)
  }
  const onVideoSelected = (videoId) => {
    setSelectedVideoId(videoId)
  }
  return (
    <Box>
      <Grid container spacing={2} paddingLeft={1} paddingRight={1}>
        <Grid  item xs={12} md={9} sm={12} >
          <Search handleSearch={handleSearch} />
          <VideoPlayer videoId={selectedVideoId} />
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <VideoList
            onVideoSelected={onVideoSelected}
            data={videoMetaInfo}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Youtube
