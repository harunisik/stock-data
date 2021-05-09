import moment from "moment";
import React, { useState } from "react";
import "./index.css";

export default function StockData() {
  const [stocks, setStocks] = useState(null);
  const [inputDate, setInputDate] = useState("");

  function handleChange(event) {
    setInputDate(event.target.value);
  }

  function handleSearch() {
    if (!moment(inputDate, "D-MMMM-YYYY", true).isValid()) {
      alert("Date format should be in d-mmmm-yyyy");
      return;
    }
    getStocks();
  }

  function getStocks() {
    return fetch("https://jsonmock.hackerrank.com/api/stocks?date=" + inputDate)
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        setStocks(jsonData.data);
      });
  }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="text"
          className="large"
          // placeholder="5-January-2000"
          id="app-input"
          data-testid="app-input"
          value={inputDate}
          onChange={handleChange}
        />
        <button
          className=""
          id="submit-button"
          data-testid="submit-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </section>
      {!stocks ? (
        <div></div>
      ) : stocks.length > 0 ? (
        stocks.map((stock, index) => {
          return (
            <ul
              className="mt-50 slide-up-fade-in styled"
              id="stockData"
              data-testid="stock-data"
              key={index}
            >
              <li className="py-10">Open: {stock.open}</li>
              <li className="py-10">Close: {stock.close}</li>
              <li className="py-10">High: {stock.high}</li>
              <li className="py-10">Low: {stock.low}</li>
            </ul>
          );
        })
      ) : (
        <div
          className="mt-50 slide-up-fade-in"
          id="no-result"
          data-testid="no-result"
        >
          No Results Found
        </div>
      )}
    </div>
  );
}
