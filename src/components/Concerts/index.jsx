import React, { useState, useReducer, useEffect } from "react";
import { XMasonry, XBlock } from "react-xmasonry";
import { useQuery } from "@apollo/react-hooks";
import { useDebouncedCallback } from "use-debounce";
import { GET_FILTER } from "../../query/GET_FILTER";
import { Link } from "react-router-dom";

import "./index.scss";

const mainData = {
  city: "",
  date: "",
  concerts: ""
};
export const Concerts = () => {
  const [{ city, date, concerts }, setState] = useReducer(
    (s, a) => ({ ...s, ...a }),
    mainData
  );

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [uniqCity, setUniqCity] = useState([]);
  const [uniqDate, setUniqDate] = useState([]);
  const [concertArr, setConcertArr] = useState([]);
  const [debouncedCallback] = useDebouncedCallback(concerts => {
    setState({ concerts });
  }, 400);

  const { loading, data } = useQuery(GET_FILTER, {
    variables: { name: concerts, date, city, limit: 0, skip: 0 }
  });

  const { loading: loadingAdditionalFilters } = useQuery(GET_FILTER, {
    variables: { name: "", date: "", city: "", limit: 0, skip: 0 }
  });

  const handleChange = ({ target: { value, name } }) =>
    setState({
      [name]: value
    });

  const clearFilters = () => {
    setState({ city: "", date: "", concerts: "" });
  };

  const widthRandomize = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  useEffect(() => {
    if (data) {
      const matrixOfConcert = data.getFilter.reduce(
        (acc, curr) => [
          ...acc,
          ...curr.concerts.map(concert => ({
            ...concert,
            buildingName: curr.name
          }))
        ],
        []
      );
      const date = matrixOfConcert.map(item => item.date);

      setUniqDate([...new Set(date)]);
      setConcertArr(matrixOfConcert);
    }
    if (data) {
      const city = data.getFilter.map(build => build.city);
      setUniqCity(city);
    }
  }, [data]);

  console.log(skip, limit);

  return (
    <div className="overlap">
      <div className="filter-zone">
        <input
          placeholder="Search"
          type="text"
          name="concerts"
          onChange={e => {
            debouncedCallback(e.target.value);
            setSkip(0);
          }}
          className="filter-input-concerts"
        />
      </div>
      <div className="select-bar">
        {loading || loadingAdditionalFilters ? (
          <p>Loading ...</p>
        ) : (
          <select
            className="city-select select-concerts"
            name="city"
            value={city}
            onChange={handleChange}
          >
            {uniqCity.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        )}
        {loading || loadingAdditionalFilters ? (
          <p>Loading ...</p>
        ) : (
          <select
            className="date-select select-concerts"
            name="date"
            value={date}
            onChange={handleChange}
          >
            {[
              uniqDate.map(date => (
                <option value={date} key={date}>
                  {date}
                </option>
              ))
            ]}
          </select>
        )}
        <button
          className="clear-button"
          onClick={e => {
            e.preventDefault();
            clearFilters();
          }}
        >
          Clean filters
        </button>
      </div>

      {loading || loadingAdditionalFilters ? (
        <p>Loading ...</p>
      ) : (
        <XMasonry maxColumns={3} className="masonry">
          {concertArr.slice(skip, limit).map(item => (
            <XBlock width={widthRandomize(1)}>
              <div className="card" key={item.id}>
                <div className="card-list-description">
                  <h2 className="building-name-list-item">
                    {item.buildingName}
                  </h2>
                  <p className="concert-name-list-item">{item.name}</p>
                </div>
                <Link className="concert-link" to={`/about/${item.id}`}>
                  About
                </Link>
              </div>
            </XBlock>
          ))}
        </XMasonry>
      )}
      <div className="navigation-arrow-bar">
        {skip !== 0 && (
          <span
            className="fas fa-backward"
            onClick={e => {
              e.preventDefault();
              setSkip(skip - 3);
            }}
          />
        )}

        {!loading && data.getFilter.length >= limit && (
          <span
            className="fas fa-forward next"
            onClick={e => {
              e.preventDefault();
              setSkip(skip + 3);
            }}
          />
        )}
      </div>
    </div>
  );
};
