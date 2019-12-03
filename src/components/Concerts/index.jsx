import React, { useState } from "react";
import { XMasonry, XBlock } from "react-xmasonry";
import { useQuery } from "@apollo/react-hooks";
import { GET_CONCERTS } from "../../query/GET_CONCERTS";
import { useDebouncedCallback } from "use-debounce";

import "./index.scss";

export const Concerts = () => {
  const [concerts, setConcerts] = useState("");
  const [debouncedCallback] = useDebouncedCallback(concerts => {
    setConcerts(concerts);
  }, 1000);
  const { loading, error, data } = useQuery(GET_CONCERTS, {
    variables: { name: concerts }
  });

  if (loading) return <p>Loading ...</p>;
  console.log(data.getConcerts, 11);

  return (
    <div className="overlap">
      <div className="filter-zone">
        <input
          type="text"
          name="concerts"
          onChange={e => debouncedCallback(e.target.value)}
          className="filter-input"
        ></input>
      </div>

      <XMasonry maxColumns={4}>
        <XBlock>
          <div className="card">
            <h2>Simple Card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock width={2}>
          <div className="card">
            <h2>Wider card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock>
          <div className="card">
            <h2>Simple Card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock width={3}>
          <div className="card">
            <h2>Wider card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock>
          <div className="card">
            <h2>Simple Card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock width={2}>
          <div className="card">
            <h2>Wider card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock>
          <div className="card">
            <h2>Simple Card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock width={2}>
          <div className="card">
            <h2>Wider card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock>
          <div className="card">
            <h2>Simple Card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock width={5}>
          <div className="card">
            <h2>Wider card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock>
          <div className="card">
            <h2>Simple Card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock width={2}>
          <div className="card">
            <h2>Wider card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock>
          <div className="card">
            <h2>Simple Card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock width={2}>
          <div className="card">
            <h2>Wider card</h2>
            <p>Any text!</p>
          </div>
        </XBlock>
      </XMasonry>
    </div>
  );
};
