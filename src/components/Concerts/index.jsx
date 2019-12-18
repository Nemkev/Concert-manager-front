import React, { useState, useReducer } from "react";
import { XMasonry, XBlock } from "react-xmasonry";
import { useQuery } from "@apollo/react-hooks";
import { useDebouncedCallback } from "use-debounce";
import { GET_FILTER } from "../../query/GET_FILTER";

import "./index.scss";

export const Concerts = () => {
  const [{ city, date, concerts }, setState] = useReducer(
    (s, a) => ({ ...s, ...a }),
    {
      city: "",
      date: "",
      concerts: ""
    }
  );
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [debouncedCallback] = useDebouncedCallback(concerts => {
    setState({ concerts });
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
            {additionalFiltersData.getFilter.map(item => (
              <option key={item.id} value={item.city}>
                {item.city}
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
            {/* <i class="arrow-down"></i> */}
            {[
              ...new Set(
                ...new Set(
                  additionalFiltersData.getFilter.map(item => {
                    return item.concerts.map(secondItem => (
                      <option key={item.id} value={secondItem.date}>
                        {secondItem.date}
                      </option>
                    ));
                  })
                )
              )
            ]}
          </select>
        )}
        <button
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
