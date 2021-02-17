import React from "react";
import { FiHeart } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

const Photo = ({
  likedPhotosPage,
  photo,
  likedPhotos,
  setLikedPhotos,
  likes,
  description,
  urls: { regular },
  user: {
    name,
    profile_image: { medium },
    portfolio_url,
  },
}) => {
  const removePhoto = (id) => {
    const newPhotos = likedPhotos.filter((photo) => photo.id !== id);
    setLikedPhotos(newPhotos);
  };
  const handleLikedPhotos = (id) => {
    let exist = false;
    likedPhotos.map((photo) => {
      if (photo.id === id) {
        exist = true;
      }
    });
    !exist && setLikedPhotos([...likedPhotos, { ...photo }]);
  };
  return (
    <div className="photo">
      <img src={regular} alt={description} />
      <div className="photo-info">
        <div>
          <h3>{name}</h3>
          <h4>{likes} likes</h4>
        </div>
        {likedPhotosPage ? (
          <button className="icon" onClick={() => removePhoto(photo.id)}>
            <BsTrash />
          </button>
        ) : (
          <button className="icon" onClick={() => handleLikedPhotos(photo.id)}>
            <FiHeart />
          </button>
        )}
        <a href={portfolio_url} target="_blank" rel="noopener noreferrer">
          <img className="user-img" src={medium} alt={name} />
        </a>
      </div>
    </div>
  );
};

export default Photo;
