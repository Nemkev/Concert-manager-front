import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Countdown from "react-countdown-now";
import { AUTH } from "../../query/AUTH";
import { LIST_OF_ADDITIONAL } from "../../query/GET_ADDITIONAL";
import { useQuery } from "@apollo/react-hooks";
import Modal from "react-modal";
import io from "socket.io-client";

import "./index.scss";

const socket = io.connect("http://localhost:8080");

export const About = () => {
  const [description, setDescription] = useState({});
  const [modalStateBooking, setModalStateBooking] = useState(false);
  const queryUrl = window.location.href.split("/about/");
  const { loading, error, data } = useQuery(AUTH);
  const [additionIds, setAdditionIds] = useState([]);
  const time = Date.now() + 1000 * 60 * 15;

  const { loading: loadingAdditional, data: additionalData } = useQuery(
    LIST_OF_ADDITIONAL,
    {
      variables: { name: "", limit: 0, skip: 0 }
    }
  );

  const [
    {
      additionalArr,
      additionalPrice,
      placeId,
      placeColumn,
      placeRow,
      placeSchema,
      bookedPlaces,
      arrBookedPlaces
    },
    setState
  ] = useReducer((s, a) => ({ ...s, ...a }), {
    additionalArr: [],
    additionalPrice: 0,
    placeSchema: {},
    placeId: "",
    placeColumn: "",
    placeRow: "",
    bookedPlaces: [],
    arrBookedPlaces: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const concertData = await axios.get(
        `http://localhost:8080/about/${queryUrl[1]}`
      );
      setDescription(concertData.data);
      const roomData = await axios.get(
        `http://localhost:8080/place/${concertData.data.concert.roomId}`
      );
      setState({ placeSchema: roomData.data.schema.placeSchema });
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
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
      const bindAdditionalToTicket = await axios.put(
        `http://localhost:8080/ticket`,
        {
          bookedPlaces,
          additionalArr
        }
      );
    };
    fetchData();
  };

  const columns = placeSchema[0] && placeSchema[0].length;

  const Completionist = () => <div>Time is over</div>;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setModalStateBooking(false);
      for (let i = 0; i < arrBookedPlaces.length; i++) {
        placeSchema[arrBookedPlaces[i].column][
          arrBookedPlaces[i].row
        ].booked = false;
      }

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
    setState({ placeSchema: data });
  });

  return (
    <div className="about-overlap">
      <div className="user-attention-zone">
        <Modal
          isOpen={modalStateBooking}
          ariaHideApp={false}
          className="Modal"
          overlayClassName="Overlay"
        >
          <form
            className="booking-form"
            onSubmit={e => {
              for (let i = 0; i < arrBookedPlaces.length; i++) {
                placeSchema[arrBookedPlaces[i].column][
                  arrBookedPlaces[i].row
                ].price += additionalPrice;
              }
              handleSubmit();
              setModalStateBooking(false);
            }}
          >
            <div className="timer-block">
              <Countdown date={time} renderer={renderer} />
            </div>
            <span
              className="fas fa-times close-modal-button"
              onClick={e => {
                e.preventDefault();
                setModalStateBooking(false);
                for (let i = 0; i < arrBookedPlaces.length; i++) {
                  placeSchema[arrBookedPlaces[i].column][
                    arrBookedPlaces[i].row
                  ].booked = false;
                }
                socket.emit("updateSchema", placeSchema);
              }}
            />

            {loadingAdditional ? (
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <>
                <select className="select">
                  <option selected disabled hidden>
                    Choose additional
                  </option>
                  {additionalData.getAdditions.map(item => (
                    <option
                      key={String(item.id)}
                      onClick={e => {
                        e.preventDefault();
                        if (additionIds.length <= 4) {
                          setAdditionIds(state => [
                            ...state,
                            { id: String(item.id), name: String(item.name) }
                          ]);
                        }
                        setState({
                          additionalArr: [...additionalArr, item.id],
                          additionalPrice: additionalPrice + item.price
                        });
                      }}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            <ul>
              {additionIds.map(item => (
                <li key={String(item.id)} className="list-of-additional">
                  <p>{item.name}</p>
                  <i
                    className="fas fa-times close-additional-button"
                    onClick={e => {
                      e.preventDefault();
                      setAdditionIds(
                        additionIds.filter(el => el.id !== item.id)
                      );
                    }}
                  ></i>
                </li>
              ))}
            </ul>
            <button type="submit" className="submit-room-booking-button">
              Book this place
            </button>
          </form>
        </Modal>
        <div className="concert-place-view">
          {description.concert && (
            <h2 className="current-concert-name">{description.concert.name}</h2>
          )}
          <div className="place-schema-booking">
            <div className="legend-zone">
              <p className="square-free"></p>
              <p>Available</p>
              <p className="square-booked"></p>
              <p>Disable</p>
            </div>
            {placeSchema[0] && (
              <div
                className="square-schema"
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
                        if (
                          !placeSchema[i][k].booked &&
                          placeSchema[i][k] !== 0
                        ) {
                          placeSchema[i][k].booked = true;
                          setState({
                            placeId: placeSchema[i][k].id,
                            placeSchema,
                            placeColumn: i,
                            placeRow: k,
                            bookedPlaces: [
                              ...bookedPlaces,
                              placeSchema[i][k].id
                            ],
                            arrBookedPlaces: [
                              ...arrBookedPlaces,
                              { id: placeSchema[i][k].id, column: i, row: k }
                            ]
                          });

                          socket.emit("updateSchema", placeSchema);
                        }
                      }}
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor:
                          placeSchema[i][k] === 0
                            ? "#DFDFDF"
                            : !placeSchema[i][k].booked
                            ? "#4CD3AB"
                            : placeSchema[i][k].booked && "#999999",
                        border: "solid 3px white",
                        boxSizing: "border-box",
                        borderRadius: "30%"
                      }}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div className="booking-description-zone">
          <div className="concert-description">
            <p className="description-title">Description:</p>
            {description.concert && (
              <p className="concert-current-description">
                {description.concert.description}
              </p>
            )}
          </div>
          <div className="booking-button-schema">
            <span
              onClick={() => {
                socket.emit("updateSchema", placeSchema);
                setModalStateBooking(true);
              }}
            >
              Book
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
