import React from "react";
import { Link } from "react-router-dom";
import Photo from "../components/Photo";

const LikedPhotos = ({ likedPhotos, setLikedPhotos }) => {
  if (!likedPhotos.length > 0) {
    return (
      <div className="section error">
        <h2>you didn't like any photo yet !</h2>
        <button className="submit-btn">
          <Link to="/">back to home</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="photos">
      <button
        className="submit-btn clear-btn"
        onClick={() => setLikedPhotos([])}
      >
        clear
      </button>
      <div className="photos-center ">
        {likedPhotos.map((photo, idx) => {
          return (
            <Photo
              key={idx}
              likedPhotos={likedPhotos}
              setLikedPhotos={setLikedPhotos}
              likedPhotosPage
              photo={photo}
              {...photo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LikedPhotos;
