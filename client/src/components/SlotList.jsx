import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import clear from "../assets/clear.svg";

function SlotList() {
  const slots = useSelector((state) => state.slots);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/slots")
      .then((response) => {
        dispatch({ type: "UPDATE_SLOTS", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
      });
  }, [dispatch]);

  const handleClear = (id, index) => {
    axios
      .delete(`http://localhost:5000/slots/${id}`)
      .then(() => {
        dispatch({ type: "CLEAR_SLOT", payload: { index } });
      })
      .catch((error) => {
        console.error("Error clearing slot:", error);
      });
  };

  return (
    <div className="container d-flex flex-column flex-wrap justify-content-center align-items-center slot-wrapper">
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`d-flex justify-content-between align-items-center pt-2 pb-2 px-3 m-2 border slot-box 
            ${index === 0 ? "mt-5" : ""} 
            ${index === slots.length - 1 ? "mb-5" : ""}`}
          style={{
            backgroundColor: slot.booked ? "red" : "green",
            color: "white",
          }}
          onClick={() => navigate(`/details/${index}`)}
        >
          <div className="flex-grow-1">{slot.time}</div>
          <div>
            {slot.booked && (
              <img
                src={clear}
                alt="clear"
                className="ms-2"
                width={24}
                style={{ cursor: "pointer", filter: "invert(1)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear(slot._id, index);
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SlotList;
