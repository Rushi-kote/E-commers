import React from "react";
import Card from "./Card";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Jewelery = () => {
    const [cards, setCards] = useState([{ rating: {rate:4} }]);

    useEffect(() => {
      axios
        .get("http://localhost:3001/jewelery")
        .then((response) => {
          console.log("response ", response);
          setCards(response.data.allData);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    return (
      <div className="MainContainer">
        <div className="flex-containerLoadMore">
          {cards.map((ele, index) => {
            return <Card card={ele} key={index} />;
          })}
        </div>
      </div>
    );
}

export default Jewelery