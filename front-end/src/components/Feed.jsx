import React from "react";
import FeedCard from "./FeedCard";
import { Container } from "react-bootstrap";
import DataService from "../api/DataService";

const sampleFeedData = await DataService.getAllPosts()
console.log(sampleFeedData.data.data)

  const Feed = () => {

    return (
        <>
        <div className="mt-5 color-red">
            <h3>Discover What's News</h3>
        </div>
        <Container>
            {sampleFeedData.data.data.map((feed, index)=>(
                <FeedCard key={index} username={feed.author} handle={feed._id} content={feed.content} timestamp={feed.createdAt} />
            ))}
        </Container>
        </>
    )

  }

  export default Feed