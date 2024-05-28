import React, { onSave } from "react";
import "./NewsCard.css";

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
      <img src={article.urlToImage} alt={article.title} />
      <div className="news-content">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
        >
          {" "}
          Save
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
