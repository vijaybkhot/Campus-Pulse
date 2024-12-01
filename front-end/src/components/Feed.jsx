import React from "react";
import FeedCard from "./FeedCard";
import { Container } from "react-bootstrap";
import DataService from "../api/DataService";

const sampleFeedData = await JSON.stringify(DataService.getAllPosts())

  const Feed = () => {

    return (
        <>
        <div className="mt-5 color-red">
            <h3>Discover What's News</h3>
        </div>
        <Container>
            {sampleFeedData.map((feed, index)=>(
                <FeedCard key={index} username={feed.username} handle={feed.handle} content={feed.content} timestamp={feed.timestamp} />
            ))}
        </Container>
        </>
    )

  }

  export default Feed