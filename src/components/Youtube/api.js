import axios from 'axios'

const KEY = "AIzaSyDZrJW9j6hqzDr4vlEsHPx318W6mz4bE9U"

export default  axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: 5,
        key: KEY
    },
    headers:{}
})