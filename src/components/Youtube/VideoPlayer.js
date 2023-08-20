import React from 'react'
import styled from 'styled-components';

const VideoPlayer = ({ videoId }) => {
    if (!videoId) {
        return (
            <p style={{ textAlign: 'center' }}>Search for a video</p>
        )
    }
    return (
        <VideoPlayerContainer>
            <iframe
                title={videoId}
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
                frameBorder="0"
            />
            {/* <iframe width="1000" height="600" src={`https://www.youtube.com/embed/${videoId}`} title={videoId} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        </VideoPlayerContainer>
    )
}
export default VideoPlayer;

const VideoPlayerContainer = styled.div`
    text-align: center;
    > iframe {
        width: 100%;
        height: 650px;
    }
  
`;