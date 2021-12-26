import * as React from "react";


import { Routes, Route} from "react-router-dom";

import "./App.css";
import Splash from "./components/Splash";
import CardList from "./components/CardList";
import EditCard from "./components/EditCard";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Splash />} />
        <Route path="/card-list" element={<CardList />} />
        <Route path="/edit-card" element={<EditCard />} />
      </Routes>
    </div>
  );
}

