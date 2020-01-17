import React, { useState, useEffect } from "react";
import axios from "axios";
// import { subscribeToTimer } from "../../utils/socket";
import Countdown from "react-countdown-now";
import openSocket from "socket.io-client";
import { AUTH } from "../../query/AUTH";
import { useQuery } from "@apollo/react-hooks";
import Modal from "react-modal";
import io from "socket.io-client";

import "./index.scss";

const socket = io.connect("http://localhost:8080");

export const About = () => {
  const [description, setDescription] = useState({});
  const [placeId, setPlaceId] = useState("");
  const [placeRow, setPlaceRow] = useState();
  const [placeColumn, setPlaceColumn] = useState();
  const [placeSchema, setPlaceSchema] = useState({});
  const [bookedPlaces, setBookedPlaces] = useState([]);
  const [modalStateBooking, setModalStateBooking] = useState(false);
  const queryUrl = window.location.href.split("/about/");
  const { loading, error, data } = useQuery(AUTH);

  useEffect(() => {
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
        `http://localhost:8080/booked/${data.auth.id}`,
        {
          bookedPlaces
        }
      );
    };
    fetchData();
  };

  console.log(placeSchema);
  console.log(bookedPlaces, 11);

  const columns = placeSchema[0] && placeSchema[0].length;

  const Completionist = () => <div>Time is over</div>;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setModalStateBooking(false);
      placeSchema[placeColumn][placeRow].booked = false;
      socket.emit("updateSchema", placeSchema);
      return <Completionist />;
    } else {
      return (
        <div>
          {minutes}:{seconds}
        </div>
      );
    }
  };
  socket.on("updateSchema", data => {
    setPlaceSchema(data);
  });
  return (
    <div className="about-overlap">
      <button onClick={() => socket.emit("updateSchema", placeSchema)}>
        +
      </button>
      <button
        onClick={() => {
          socket.emit("updateSchema", placeSchema);
          setModalStateBooking(true);
        }}
      >
        Book
      </button>
      <Modal isOpen={modalStateBooking} ariaHideApp={false}>
        <form>
          <Countdown date={Date.now() + 1000 * 60 * 15} renderer={renderer} />
          <p>Current price : </p>
          <select>
            <option value="">Cola</option>
            <option value="">Sprite</option>
          </select>
          <button onClick={handleSubmit}>Book this place</button>
          <button
            onClick={e => {
              e.preventDefault();
              setModalStateBooking(false);
              placeSchema[placeColumn][placeRow].booked = false;
              socket.emit("updateSchema", placeSchema);
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
                    setPlaceSchema(placeSchema);
                    if (!placeSchema[i][k].booked) {
                      placeSchema[i][k].booked = true;
                      setPlaceColumn(i);
                      setPlaceRow(k);
                      socket.emit("updateSchema", placeSchema);
                    }
                    setBookedPlaces(state => [...state, placeSchema[i][k].id]);
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
      </div>
      <div className="concert-description">
        {description.concert && <p>{description.concert.description}</p>}
      </div>
    </div>
  );
};
