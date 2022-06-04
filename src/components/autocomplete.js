import React from "react";
import { useState } from "react";
import "../App.css";

const Autocomplete = () => {
  const [list, setList] = useState([]);
  const handleChange = async (text) => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population/cities"
    );
    const cities = await res.json();
    const data = cities.data;
    setList(
      data.filter((item) => {
        const regex = new RegExp(`^${text}`, "gi");
        return item.city.match(regex);
      })
    );
  };
  return (
    <div className="container">
      <h1>Search any city in all countries !</h1>
      <input
        onChange={(e) => handleChange(e.target.value)}
        className="input"
        type="text"
        placeholder="Enter your search here..."
      />
      <div className="results">
        {list.length > 0
          ? list.map((el) => {
              return (
                <p>
                  {el.city} <span>{el.country}</span>
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Autocomplete;
