import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LikedPhotos from "./pages/LikedPhotos";
import Home from "./pages/Home";
import Error from "./pages/Error";
import SinglePhoto from "./pages/SinglePhoto";

import Navbar from "./components/Navbar";

const App = () => {
  const getLikedPhotos = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [likedPhotos, setLikedPhotos] = useState(getLikedPhotos);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(likedPhotos));
  }, [likedPhotos]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home likedPhotos={likedPhotos} setLikedPhotos={setLikedPhotos} />
        </Route>
        <Route path="/Liked-photos">
          <LikedPhotos
            likedPhotos={likedPhotos}
            setLikedPhotos={setLikedPhotos}
          />
        </Route>
        <Route path="/photos/single-photo/:id">
          <SinglePhoto />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
