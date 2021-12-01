import React from "react";
import Header from "../components/Header";
import Crud from "../components/Crud";
import Nav from "../components/Nav";
const Home = () => {
  return (
    <div className="container">
      <Header />
      <Nav />
      <Crud />
    </div>
  );
};

export default Home;

