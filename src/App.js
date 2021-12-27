import * as React from "react";


import { Routes, Route} from "react-router-dom";

import "./App.css";
import Splash from "./components/Splash";
import CardList from "./components/CardList";
import EditCard from "./components/EditCard";
import EditCard2 from "./components/EditCard2";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Splash />} />
        <Route path="/card-list" element={<CardList />} />
        <Route path="/edit-card" element={<EditCard />} />
        <Route path="/edit-card2" element={<EditCard2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

