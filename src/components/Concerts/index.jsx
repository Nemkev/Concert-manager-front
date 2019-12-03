import React, { useState } from "react";
import { XMasonry, XBlock } from "react-xmasonry";
import { useQuery } from "@apollo/react-hooks";
import { GET_CONCERTS } from "../../query/GET_CONCERTS";
import { useDebouncedCallback } from "use-debounce";

import "./index.scss";

export const Concerts = () => {
  const [concerts, setConcerts] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [debouncedCallback] = useDebouncedCallback(concerts => {
    setConcerts(concerts);
  }, 400);
  const { loading, error, data } = useQuery(GET_CONCERTS, {
    variables: { name: concerts, limit: limit, skip: skip }
  });

  if (loading) return <p>Loading ...</p>;
  console.log(data, 11);

  const widthRandomize = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  //ToDo make check and block buttons

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

      <XMasonry maxColumns={3}>
        {data.getConcerts.map(item => (
          <XBlock width={widthRandomize(3)} key={item.id}>
            <div className="card">
              <h2>Simple Card</h2>
              <p>{item.name}</p>
            </div>
          </XBlock>
        ))}
      </XMasonry>
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

      {data.getConcerts.length >= limit && (
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
