import React, { useState, useReducer, useEffect } from "react";
import { XMasonry, XBlock } from "react-xmasonry";
import { useQuery } from "@apollo/react-hooks";
import { useDebouncedCallback } from "use-debounce";
import { GET_FILTER } from "../../query/GET_FILTER";

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
  const [currentId, setCurrentId] = useState("");
  const [uniqCity, setUniqCity] = useState([]);
  const [uniqDate, setUniqDate] = useState([]);
  const [limit] = useState(8);
  const [concertArr, setConcertArr] = useState([]);
  const [debouncedCallback] = useDebouncedCallback(concerts => {
    setState({ concerts });
  }, 400);
  const { loading, data } = useQuery(GET_FILTER, {
    variables: { name: concerts, date, city, limit, skip }
  });

  const {
    loading: loadingAdditionalFilters,
    data: additionalFiltersData
  } = useQuery(GET_FILTER, {
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
  }, [data]);

  useEffect(() => {
    if (data) {
      const city = data.getFilter.map(city => city.city);
      setUniqCity(city);
    }
  }, [data]);

  return (
    <div className="overlap">
      <div className="filter-zone">
        <input
          type="text"
          name="concerts"
          onChange={e => {
            debouncedCallback(e.target.value);
            setSkip(0);
          }}
          className="filter-input"
        />
      </div>
      <div className="select-bar">
        {loading || loadingAdditionalFilters ? (
          <p>Loading ...</p>
        ) : (
          <select
            className="city-select"
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
            className="date-select"
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
          {concertArr.map(item => (
            <XBlock
              width={widthRandomize(3)}
              onClick={e => {
                e.preventDefault();
                setCurrentId(item.id);
              }}
            >
              <div className="card" key={item.id}>
                <h2>{item.buildingName}</h2>
                <p>{item.name}</p>
              </div>
            </XBlock>
          ))}
        </XMasonry>
      )}
      {skip !== 0 && (
        <button
          onClick={e => {
            e.preventDefault();
            setSkip(skip - limit);
          }}
        >
          Get back
        </button>
      )}

      {!loading && data.getFilter.length >= limit && (
        <button
          onClick={e => {
            e.preventDefault();
            setSkip(skip + limit);
          }}
        >
          Show more
        </button>
      )}
    </div>
  );
};
