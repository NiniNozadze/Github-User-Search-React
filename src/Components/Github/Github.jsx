import axios from "axios";

import { useState } from "react";
import "./GitHub.css";
const Github = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState({});
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${inputValue}`
      );
      console.log(response);
      setData(response.data);
      setSearchPerformed(true);
      setError(null);
      console.log(response.data);
    } catch (error) {
      //   setData({});
      setError("No Results");
      console.log(error);
    }
  };

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
    updateBodyStyles(!isDarkMode);
  };
  const updateBodyStyles = (darkMode) => {
    const body = document.body;
    if (darkMode) {
      body.style.backgroundColor = "#F6F8FF";
    } else {
      body.style.backgroundColor = "#141D2F";
    }
  };

  const getFormattedDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div>
      <div className={`whole ${isDarkMode ? "dark" : "light"}`}>
        <div className="header">
          <h1 className={`title ${isDarkMode ? "title2" : ""}`}>devfinder</h1>
          <p className="mode" onClick={toggleMode}>
            <span className={isDarkMode ? "dark" : "light"}>
              {isDarkMode ? "DARK" : "LIGHT"}
            </span>
            <span>
              <img
                className="sun"
                src={
                  isDarkMode ? "assets/icon-moon.svg" : "assets/icon-sun.svg"
                }
                alt=""
              />
            </span>
          </p>
        </div>
        <div className={`searchbar ${isDarkMode ? "searchbar2" : ""}`}>
          <form
            className="forms"
            action="/search"
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
              fetchData();
            }}
          >
            <img className="image-search" src="./assets/icon-search.svg" />
            <input
              type="text"
              className={`search ${isDarkMode ? "search2" : ""}`}
              placeholder="Search GitHub username…"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />{" "}
            {error && <span className="result">{error}</span>}
            <input type="submit" value="Search" className="forSearch" />
          </form>
        </div>
        <div className={`main ${isDarkMode ? "main2" : ""}`}>
          <div className="info">
            <img
              className="cat"
              src={
                searchPerformed
                  ? data.avatar_url || "assets/cat.svg"
                  : "assets/cat.svg"
              }
              style={{ borderRadius: searchPerformed ? "50%" : "0" }}
              alt=""
            />
            <div className="info-part">
              <h2 className={`octocat ${isDarkMode ? "octocat2" : ""}`}>
                {data.name ? data.name : "The Octocat"}
              </h2>
              <p className="mail">
                {searchPerformed
                  ? data.email !== null
                    ? data.email
                    : "No email"
                  : "@octocat"}
              </p>
              <p className={`join ${isDarkMode ? "join2" : ""}`}>{`Joined ${
                data.created_at
                  ? getFormattedDate(data.created_at)
                  : "25 Jan 2011"
              }`}</p>
            </div>
          </div>

          <p className={`lorem ${isDarkMode ? "lorem2" : ""}`}>
            {searchPerformed && data.bio === null
              ? "This profile has no bio"
              : data.bio ||
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."}
          </p>
          <div className="flexed">
            <div className={`count ${isDarkMode ? "count2" : ""}`}>
              <div>
                <h3 className={`h3Class ${isDarkMode ? "h3Class2" : ""}`}>
                  Repos
                </h3>
                <p className={`num repos ${isDarkMode ? "num2" : ""}`}>
                  {searchPerformed ? data.public_repos || "0" : "8"}
                </p>
              </div>
              <div>
                <h3 className={`h3Class ${isDarkMode ? "h3Class2" : ""}`}>
                  Followers
                </h3>
                <p className={`num follower ${isDarkMode ? "num2" : ""}`}>
                  {" "}
                  {searchPerformed ? data.followers || "0" : "3938"}
                </p>
              </div>
              <div>
                <h3 className={`h3Class ${isDarkMode ? "h3Class2" : ""}`}>
                  Following
                </h3>
                <p className={`num following ${isDarkMode ? "num2" : ""}`}>
                  {searchPerformed ? data.following || "0" : "9"}
                </p>
              </div>
            </div>

            <div className="last">
              <div className="for">
                <img src="./assets/icon-location.svg" />
                <p className={`same fr ${isDarkMode ? "same2" : ""}`}>
                  {" "}
                  {searchPerformed
                    ? data.location || "No location"
                    : "San Francisco"}
                </p>
              </div>
              <div className="for">
                <img src="./assets/icon-website.svg" />
                <a
                  className={`same  ${isDarkMode ? "same2" : ""}`}
                  href={
                    searchPerformed
                      ? data.blog || "https://github.blog"
                      : "https://github.blog"
                  }
                >
                  {searchPerformed
                    ? data.blog || "https://github.blog"
                    : "https://github.blog"}
                </a>
              </div>
              <div className="secondPart">
                <div className="for">
                  <img src="./assets/icon-twitter.svg" />
                  <p className={`same twit ${isDarkMode ? "same2" : ""}`}>
                    {searchPerformed
                      ? data.twitter_username || "Not Available"
                      : "Not Available"}
                  </p>
                </div>
                <div className="for">
                  <img src="./assets/icon-company.svg" />
                  <p className={`same comp ${isDarkMode ? "same2" : ""}`}>
                    {" "}
                    {searchPerformed ? data.company || "No company" : "@github"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Github;
