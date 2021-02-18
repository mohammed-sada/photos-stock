import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Photo from "../components/Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App({ likedPhotos, setLikedPhotos }) {
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(2);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    let url;
    if (query) {
      url = searchUrl + clientID + urlPage + urlQuery;
    } else {
      url = mainUrl + clientID + urlPage;
    }
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          console.log(data);
          return [...data.results];
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && pathname === "/" && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 10
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <section className="section">
      <form className="search-form search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className="form-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="submit-btn" type="submit">
          <FaSearch />
        </button>
      </form>
      <div className="photos">
        <h3 style={{ padding: "1rem 0" }}>
          Double click the photo for more info
        </h3>
        <div className="photos-center ">
          {photos.map((photo, idx) => {
            return (
              <Photo
                likedPhotos={likedPhotos}
                setLikedPhotos={setLikedPhotos}
                photo={photo}
                key={idx}
                {...photo}
              />
            );
          })}
        </div>
      </div>
      {loading && <div className="loading" />}
    </section>
  );
}

export default App;
