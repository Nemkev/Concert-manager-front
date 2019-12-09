import React, { useState } from "react";
import { XMasonry, XBlock } from "react-xmasonry";
import { useQuery } from "@apollo/react-hooks";
import { GET_CONCERTS } from "../../query/GET_CONCERTS";
import { useDebouncedCallback } from "use-debounce";

import "./index.scss";
import { GET_FILTER } from "../../query/GET_FILTER";

export const Concerts = () => {
  const [concerts, setConcerts] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [debouncedCallback] = useDebouncedCallback(concerts => {
    setConcerts(concerts);
  }, 400);
  const { loading, error, data } = useQuery(GET_FILTER, {
    variables: { name: concerts, date, city, limit, skip }
  });

  const {
    loading: loadingAdditionalFilters,
    error: additionalFiltersError,
    data: additionalFiltersData
  } = useQuery(GET_FILTER, {
    variables: { name: "", date, city, limit, skip }
  });

  const handleChangeCity = event => {
    setCity(event.target.value);
  };

  const handleChangeDate = event => {
    setDate(event.target.value);
  };

  const widthRandomize = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

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
        ></input>
      </div>

      {loading || loadingAdditionalFilters ? (
        <p>Loading ...</p>
      ) : (
        <select name="city" value="city" onChange={handleChangeCity}>
          {[
            additionalFiltersData.getFilter.map(item => (
              <option value={item.city}>{item.city}</option>
            ))
          ]}
        </select>
      )}
      {loading || loadingAdditionalFilters ? (
        <p>Loading ...</p>
      ) : (
        <select name="date" value="date" onChange={handleChangeDate}>
          {[
            ...new Set(
              ...new Set(
                additionalFiltersData.getFilter.map(item => {
                  return item.concerts.map(secondItem => (
                    <option value={secondItem.date}>{secondItem.date}</option>
                  ));
                })
              )
            )
          ]}
        </select>
      )}

      {loading || loadingAdditionalFilters ? (
        <p>Loading ...</p>
      ) : (
        <XMasonry maxColumns={3}>
          {data.getFilter.map(item => (
            <XBlock width={widthRandomize(3)} key={item.id}>
              <div className="card">
                <h2>Simple Card</h2>
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
