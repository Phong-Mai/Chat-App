import React from 'react'
import styled from 'styled-components';
import Video from './Video'

const VideoList = ({ data, onVideoSelected }) => {
    return (
        <VideoListContainer >
            <div>
                <h3>
                    Video List
                </h3>
                <Video data={data} onVideoSelected={onVideoSelected}></Video>
            </div>
        </VideoListContainer>
    )
}
export default VideoList;

const VideoListContainer = styled.div`
    > div >h3 {
        margin-left: 10px;
    }
`;