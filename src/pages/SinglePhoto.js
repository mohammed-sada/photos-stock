import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const SinglePhoto = ({ likedPhotos, setLikedPhotos }) => {
  const { id } = useParams();

  const url = `https://api.unsplash.com/photos/${id}/${clientID}`;

  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

  function fetchData() {
    fetch(url)
      .then((respnose) => respnose.json())
      .then((result) => {
        setPhoto(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, [id]);

  const [alert, setAlert] = useState({ show: false, msg: "" });

  const handleLikedPhotos = (id) => {
    let exist = false;
    likedPhotos.map((photo) => {
      if (photo.id === id) {
        exist = true;
      }
    });
    !exist && setLikedPhotos([...likedPhotos, { ...photo }]);
    setAlert({ show: true, msg: "added to favorite" });
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  if (loading) return <div style={{ marginTop: "5rem" }} className="loading" />;

  const {
    id: singleId,
    likes,
    views,
    alt_description,
    urls: { regular },
    user: {
      name,
      portfolio_url,
      profile_image: { medium },
    },
    related_collections: { results },
  } = photo;
  return (
    <div className="section">
      <button
        onClick={() => handleLikedPhotos(singleId)}
        style={{ marginBottom: "1rem", margin: "1rem auto" }}
        className="submit-btn"
      >
        Add to favorite
      </button>
      <div className="single-photo">
        <div className="photo-header">
          <h4 className={`alert ${alert.show && "show"}`}>{alert.msg}</h4>

          <img src={regular} alt={alt_description} />
        </div>
        <div className="info">
          <div className="user-info">
            <h3>by: {name}</h3>
            <a href={portfolio_url}>
              <img src={medium} alt={name} />
            </a>
          </div>
          <div className="info-photo">
            <p>
              views: <span>{views}</span>
            </p>
            <p>
              likes: <span>{likes}</span>
            </p>
          </div>
          <div className="related">
            <h3>related photos</h3>
            {results.map((item) => {
              const {
                cover_photo: { id, urls, alt_description },
              } = item;
              return (
                <Link key={id} to={`/photos/single-photo/${id}`}>
                  <img src={urls.small} alt={alt_description} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePhoto;
