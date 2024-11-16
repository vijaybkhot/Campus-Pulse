import React from "react";
import FeedCard from "./FeedCard";
import { Container } from "react-bootstrap";

const sampleFeedData = [
    {
      profileImage: 'https://via.placeholder.com/50', // Placeholder image URL
      username: 'John Doe',
      handle: 'johndoe',
      content: 'Exploring React and Bootstrap to build amazing UIs! #webdevelopment',
      timestamp: '2h',
    },
    {
      profileImage: 'https://via.placeholder.com/50',
      username: 'Jane Smith',
      handle: 'janesmith',
      content: 'Just finished a marathon coding session. Time to take a break and grab some coffee ☕',
      timestamp: '4h',
    },
    {
      profileImage: 'https://via.placeholder.com/50',
      username: 'Alex Johnson',
      handle: 'alexj',
      content: 'Learning new things every day keeps life interesting! What are you learning today?',
      timestamp: '1d',
    },
    {
      profileImage: 'https://via.placeholder.com/50',
      username: 'Chris Lee',
      handle: 'chrisl',
      content: 'React Bootstrap makes UI development so much easier. Highly recommend it! 🚀',
      timestamp: '3d',
    },
    {
      profileImage: 'https://via.placeholder.com/50',
      username: 'Sam Wilson',
      handle: 'samwilson',
      content: 'Finally finished my project! Feeling accomplished and ready for the next challenge!',
      timestamp: '5d',
    },
  ];

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