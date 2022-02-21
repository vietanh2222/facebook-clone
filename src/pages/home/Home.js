import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Contacts from "./Contacts";
import "./Home.css";
import React from "react";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Feed />
      <Contacts />
    </div>
  );
}

export default Home;
