import React, { useState, useReducer, useEffect } from "react";
import { XMasonry, XBlock } from "react-xmasonry";
import { useQuery } from "@apollo/react-hooks";
import { useDebouncedCallback } from "use-debounce";
import { GET_FILTER } from "../../query/GET_FILTER";
import { Link } from "react-router-dom";
import PlaceImage1 from "../../assets/1.jpeg";
import PlaceImage2 from "../../assets/2.jpeg";
import PlaceImage3 from "../../assets/3.jpg";
import PlaceImage4 from "../../assets/4.jpg";
import PlaceImage5 from "../../assets/5.jpg";
import PlaceImage6 from "../../assets/6.jpg";
import PlaceImage7 from "../../assets/7.jpeg";
import PlaceImage8 from "../../assets/8.jpeg";
import PlaceImage9 from "../../assets/9.jpg";
import PlaceImage10 from "../../assets/10.png";
import PlaceImage11 from "../../assets/11.jpg";
import PlaceImage12 from "../../assets/12.jpg";

import "./index.scss";

export const Concerts = () => {
  const getRandomImage = () => {
    const arrOfImage = [
      PlaceImage1,
      PlaceImage2,
      PlaceImage3,
      PlaceImage4,
      PlaceImage5,
      PlaceImage6,
      PlaceImage7,
      PlaceImage8,
      PlaceImage9,
      PlaceImage10,
      PlaceImage11,
      PlaceImage12
    ];
    return arrOfImage[Math.floor(Math.random() * 11)];
  };

  console.log(Math.floor(Math.random() * 8));

  const [{ city, date, concerts, limit, skip }, setState] = useReducer(
    (s, a) => ({ ...s, ...a }),
    {
      city: "",
      date: "",
      concerts: "",
      limit: 8,
      skip: 0
    }
  );

  const [uniqCity, setUniqCity] = useState([]);
  const [uniqDate, setUniqDate] = useState([]);
  const [listOfDate, setListOfDate] = useState([]);
  const [listOfCity, setListOfCity] = useState([]);
  const [concertArr, setConcertArr] = useState([]);
  const [mounted, setMounted] = useState(false);
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
      !mounted && setMounted(true);
    }
    if (data) {
      const city = data.getFilter.map(build => build.city);
      setUniqCity([...new Set(city)]);
    }
  }, [data]);

  useEffect(() => {
    if (mounted) {
      setListOfDate(uniqDate);
      setListOfCity(uniqCity);
    }
  }, [mounted]);
  console.log(listOfDate, listOfCity);

  return (
    <div className="overlap">
      <div className="filter-zone">
        <input
          placeholder="Search"
          type="text"
          name="concerts"
          onChange={e => {
            debouncedCallback(e.target.value);
            setState({ skip: 0 });
          }}
          className="filter-input-concerts"
        />
      </div>
      <div className="select-bar">
        {loading || loadingAdditionalFilters ? (
          <div className="loading-block"></div>
        ) : (
          <select
            className="city-select select-concerts"
            name="city"
            value={city}
            onChange={handleChange}
          >
            {listOfCity.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        )}
        {loading || loadingAdditionalFilters ? (
          <div className="loading-block"></div>
        ) : (
          <select
            className="date-select select-concerts"
            name="date"
            value={date}
            onChange={handleChange}
          >
            {[
              listOfDate.map(date => (
                <option value={date} key={date}>
                  {date.split("T")[0]} {date.split("T")[1].slice(0, 8)}
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
        <div className="loading-spin">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <XMasonry maxColumns={3} className="masonry">
          {concertArr.slice(skip, limit).map(item => (
            <XBlock width={widthRandomize(1)}>
              <div
                className="card"
                key={item.id}
                style={{
                  background: `url('${getRandomImage()}')`,
                  backgroundSize: `cover`
                }}
              >
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
      {!loading && data.getFilter.length === 0 && (
        <div className="void-zone">
          <p className="void-message">No Concerts</p>
        </div>
      )}
      <div className="navigation-arrow-bar">
        {skip !== 0 && (
          <span
            className="fas fa-backward"
            onClick={e => {
              e.preventDefault();
              setState({ skip: skip - 8, limit: limit - 8 });
            }}
          />
        )}

        {!loading && data.getFilter.length >= limit && (
          <span
            className="fas fa-forward next"
            onClick={e => {
              e.preventDefault();
              setState({ skip: skip + 8, limit: limit + 8 });
            }}
          />
        )}
      </div>
    </div>
  );
};
