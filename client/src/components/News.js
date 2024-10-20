import React, { useState, useEffect } from 'react';

const News = () => {
  const newsItems = [
    { id: 1, title: "Stevens Wins Hackathon", description: "Stevens Institute takes first place in national hackathon.", image: "/images/news1.png" },
    { id: 2, title: "New Research in AI", description: "Stevens faculty publish groundbreaking research in artificial intelligence.", image: "/images/news2.png" },
  ];

  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(newsItems);
  }, []);

  return (
    <div className="news-section">
      {news.map((item) => (
        <div key={item.id} className="news-item">
          <img className="news-image" src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default News;
