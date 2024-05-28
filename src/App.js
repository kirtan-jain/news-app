import React, { useState, useEffect } from "react";
import "./App.css";
import "./NewsCard.css";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [search, setsearch] = useState("");
  const [saved, setsaved] = useState(
    () => JSON.parse(localStorage.getItem("saved")) || []
  );
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${
            search || "latest"
          }&apiKey=6990ff3ec11e4f04a7081930045f7e82`
        );
        const data = await response.json();
        const filteredArticles = data.articles.filter(
          (article) => article.urlToImage && article.urlToImage !== ""
        );
        console.log(filteredArticles);
        setArticles(filteredArticles);
      } catch (error) {
        console.error("couldnt fetchhh", error);
      }
    };

    fetchArticles();
  }, [search]);

  const saveArticle = (article) => {
    const updated = [...saved, article];
    setsaved(updated);
    localStorage.setItem("saved", JSON.stringify(updated));
  };

  const NewsCard = ({ article, onSave }) => {
    return (
      <div className="news-card">
        <img src={article.urlToImage} alt={article.title} />
        <div className="news-content">
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <button class="button-10">
            <a href={article.url}>Read more</a>{" "}
          </button>
          <button
            class="button-10"
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
  const ViewSaved = ({ savedArticles }) => {
    return (
      <div className="news-card">
        <h2>Saved Articles</h2>
        <div className="news-container">
          {savedArticles.map((article, index) => (
            <div>
              <img src={article.urlToImage} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url}>Read more</a>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const goToSaved = () => {
    const ele = document.getElementById("saved-section");
    console.log(ele);
    ele.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="app">
      <header className="app-header">
        <h1>News App</h1>
        <input
          type="text"
          placeholder="Search here for news..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button class="button-10" onClick={goToSaved}>
          View Saved
        </button>
      </header>
      <div className="news-container">
        {articles.map((article) => (
          <NewsCard
            key={article.url}
            onSave={() => saveArticle(article)}
            article={article}
          />
        ))}
      </div>
      <div id="saved-section">
        <ViewSaved savedArticles={saved} />
      </div>
    </div>
  );
};

export default App;
