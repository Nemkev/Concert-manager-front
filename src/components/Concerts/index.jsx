import React from "react";
import { XMasonry, XBlock } from "react-xmasonry";

import "./index.scss";

export const Concerts = () => {
  return (
    <>
      <div className="overlap">
        <div className="filter-zone">
          <input type="text" className="filter-input"></input>
        </div>

        <XMasonry maxColumns={5}>
          <XBlock>
            <div className="card">
              <h1>Simple Card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock width={2}>
            <div className="card">
              <h1>Wider card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock>
            <div className="card">
              <h1>Simple Card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock width={3}>
            <div className="card">
              <h1>Wider card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock>
            <div className="card">
              <h1>Simple Card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock width={2}>
            <div className="card">
              <h1>Wider card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock>
            <div className="card">
              <h1>Simple Card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock width={2}>
            <div className="card">
              <h1>Wider card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock>
            <div className="card">
              <h1>Simple Card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock width={5}>
            <div className="card">
              <h1>Wider card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock>
            <div className="card">
              <h1>Simple Card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock width={2}>
            <div className="card">
              <h1>Wider card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock>
            <div className="card">
              <h1>Simple Card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
          <XBlock width={2}>
            <div className="card">
              <h1>Wider card</h1>
              <p>Any text!</p>
            </div>
          </XBlock>
        </XMasonry>
      </div>
    </>
  );
};
