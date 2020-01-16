import React, { useState, useEffect } from "react";
import axios from "axios";
// import { subscribeToTimer } from "../../utils/socket";
import Countdown from "react-countdown-now";
import openSocket from "socket.io-client";
import { AUTH } from "../../query/AUTH";
import { useQuery } from "@apollo/react-hooks";
import Modal from "react-modal";

import "./index.scss";

export const About = () => {
  const [description, setDescription] = useState({});
  const [placeId, setPlaceId] = useState("");
  const [placeSchema, setPlaceSchema] = useState({});
  const [modalStateBooking, setModalStateBooking] = useState(false);
  // const [timestamp, setTimeStamp] = useState("no timestamp yet");
  const queryUrl = window.location.href.split("/about/");
  const { loading, error, data } = useQuery(AUTH);
  useEffect(() => {
    const socket = openSocket("http://localhost:8080");
    const fetchData = async () => {
      const concertData = await axios.get(
        `http://localhost:8080/about/${queryUrl[1]}`
      );
      setDescription(concertData.data);
      const roomData = await axios.get(
        `http://localhost:8080/place/${concertData.data.concert.roomId}`
      );
      setPlaceSchema(roomData.data.schema.placeSchema);
    };
    fetchData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const fetchData = async () => {
      const concertData = await axios.get(
        `http://localhost:8080/about/${queryUrl[1]}`
      );
      const updateSchema = await axios.put(
        `http://localhost:8080/current/${concertData.data.concert.roomId}`,
        {
          placeSchema
        }
      );
      const roomData = await axios.get(
        `http://localhost:8080/place/${concertData.data.concert.roomId}`
      );
      const bindUserToTicket = await axios.put(
        `http://localhost:8080/place/${data.auth.id}/${placeId}`
      );
    };
    fetchData();
  };

  const columns = placeSchema[0] && placeSchema[0].length;

  const Completionist = () => <div>Time is over</div>;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <div>
          {minutes}:{seconds}
        </div>
      );
    }
  };

  return (
    <div className="about-overlap">
      <Modal isOpen={modalStateBooking} ariaHideApp={false}>
        <form>
          <Countdown date={Date.now() + 1000 * 60 * 15} renderer={renderer} />
          <p>Current price : </p>
          <select>
            <option value="">Cola</option>
            <option value="">Sprite</option>
          </select>
          <button
            onClick={e => {
              e.preventDefault();
              setModalStateBooking(false);
            }}
          >
            Close
          </button>
        </form>
      </Modal>
      <div className="place-schema-booking">
        {placeSchema[0] && (
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              gridTemplateColumns: `repeat(${columns},20px)`
            }}
          >
            {placeSchema.map((rowsArr, i) =>
              rowsArr.map((_, k) => (
                <div
                  key={`${i}-${k}`}
                  onClick={() => {
                    setPlaceId(placeSchema[i][k].id);
                    placeSchema[i][k].booked = true;
                    setPlaceSchema(placeSchema);
                    setModalStateBooking(true);
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor:
                      placeSchema[i][k] === 0
                        ? "gray"
                        : !placeSchema[i][k].booked
                        ? "green"
                        : placeSchema[i][k].booked && "blue",
                    border: "solid 1px black"
                  }}
                />
              ))
            )}
          </div>
        )}
        <button onClick={handleSubmit}>Book this place</button>
      </div>
      <div className="concert-description">
        {description.concert && <p>{description.concert.description}</p>}
      </div>
    </div>
  );
};
