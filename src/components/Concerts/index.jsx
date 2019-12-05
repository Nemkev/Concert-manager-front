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
  const [date, setDate] = useState(":");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [debouncedCallback] = useDebouncedCallback(concerts => {
    setConcerts(concerts);
  }, 400);
  const { loading, error, data } = useQuery(GET_FILTER, {
    variables: { name: concerts, date, city, limit, skip }
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
      <select name="city" value="city" onChange={handleChangeCity}>
        <option value="Minsk">Minsk</option>
        <option value="Pinsk">Pinsk</option>
        <option value="Gomel">Gomel</option>
        <option value="Polotsk">Polotsk</option>
      </select>
      <select name="date" value="date" onChange={handleChangeDate}>
        <option value="2022">2022</option>
        <option value="2001">2001</option>
        <option value="2025">2025</option>
      </select>

      {/*Bug with date, if you write date like "2012-11-12", filter work incorrect*/}

      {loading ? (
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
