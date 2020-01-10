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
  const [limit, setLimit] = useState(0);
  const [concertArr, setConcertArr] = useState([]);
  const [debouncedCallback] = useDebouncedCallback(concerts => {
    setState({ concerts });
  }, 400);
  const { loading, error, data } = useQuery(GET_FILTER, {
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
    if (data !== undefined) {
      const listOfConcerts = [];
      const matrixOfConcert = data.getFilter.map(item => {
        return item.concerts.map(secondItem => {
          return secondItem;
        });
      });
      for (let i = 0; i < matrixOfConcert.length; i++) {
        for (let t = 0; t < matrixOfConcert[i].length; t++) {
          listOfConcerts.push(matrixOfConcert[i][t]);
        }
      }
      setConcertArr(listOfConcerts);
    }
  }, [data]);

  // console.log(concertArr);
  console.log(currentId);

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
              <div className="card">
                <h2>Simple Card</h2>
                <p>{item.name}</p>
              </div>
            </XBlock>
          ))}
        </XMasonry>
      )}

      {/* {data.getFilter.map(item => {
        item.concerts.map(concertItem => {
          return concertItem.name;
        });
      })} */}
      {/* data.map((item)=>{return item.concerts.map((secondItem)=>{return secondItem.name})}); */}
      {skip !== 0 && (
        <button
          onClick={e => {
            e.preventDefault();
            setSkip(skip - 8);
          }}
        >
          Get back
        </button>
      )}

      {!loading && data.getFilter.length >= limit && (
        <button
          onClick={e => {
            e.preventDefault();
            setSkip(skip + 8);
          }}
        >
          Show more
        </button>
      )}
    </div>
  );
};
