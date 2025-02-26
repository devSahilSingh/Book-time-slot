import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function DetailsScreen() {
  const { index } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slot = useSelector((state) => state.slots[index]);

  const [user, setUser] = useState(
    slot?.user || { firstName: "", lastName: "", phone: "" }
  );
  const [errors, setErrors] = useState({});
  const [editSlotDetail, setEditSlotDetail] = useState({});

  //Get the detail of the booking slot via index
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/slots/index/${index}`)
      .then((response) => {
        setEditSlotDetail(response.data);
        const { user } = response.data;
        setUser({
          ...user,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
        });
      })
      .catch((error) => {
        console.error("Error fetching slot details:", error);
      });
  }, []);


  // Validate the booking slot form
  const validateForm = () => {
    let newErrors = {};

    if (!user.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!user.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!user.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(user.phone)) {
      newErrors.phone = "Phone Number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save and update the booking slot
  const handleSave = async () => {
    if (!validateForm()) return;

    // Update the booking slot if it already exists
    if (slot?._id || editSlotDetail?._id) {
      const updatedSlot = { ...slot, booked: true, user: { ...user } };
      dispatch({ type: "BOOK_SLOT_REQUEST" });

      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/slots/${
            slot?._id || editSlotDetail?._id
          }`,
          updatedSlot
        );
        dispatch({ type: "BOOK_SLOT_SUCCESS", payload: updatedSlot });
        navigate("/");
      } catch (error) {
        dispatch({ type: "BOOK_SLOT_FAILURE", payload: error.message });
      }
    } else {
      // Save the booking slot
      const updatedSlot = {
        id: uuidv4(),
        index: Number(index),
        booked: true,
        time: slot?.time || "Default Time",
        user: { ...user },
      };
      dispatch({ type: "BOOK_SLOT_REQUEST" });
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/slots`,
          updatedSlot
        );
        dispatch({ type: "BOOK_SLOT_SUCCESS", payload: response.data });
        navigate("/");
      } catch (error) {
        dispatch({ type: "BOOK_SLOT_FAILURE", payload: error.message });
      }
    }
  };
  return (
    <div className="container mt-5 slot-detail-wrapper">
      <h3 className="mt-5">Booking Details</h3>
      <input
        type="text"
        className={`form-control mt-4 mb-3 ${
          errors.firstName ? "is-invalid" : ""
        }`}
        placeholder="First Name"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      {errors.firstName && (
        <div className="text-danger">{errors.firstName}</div>
      )}
      <input
        type="text"
        className={`form-control mt-2 mb-3 ${
          errors.lastName ? "is-invalid" : ""
        }`}
        placeholder="Last Name"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      {errors.lastName && (
        <div className="text-danger mb-2">{errors.lastName}</div>
      )}
      <input
        type="text"
        className={`form-control mb-3 ${errors.phone ? "is-invalid" : ""}`}
        placeholder="Phone Number"
        value={user.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
      />
      {errors.phone && <div className="text-danger mb-2">{errors.phone}</div>}
      <button
        className={`btn  me-2 mt-4 ${
          slot._id || editSlotDetail._id ? "btn-primary" : "btn-success"
        }`}
        onClick={handleSave}
      >
        {slot._id || editSlotDetail._id ? " Update" : " Save"}
      </button>
      <button className="btn btn-danger mt-4" onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  );
}

export default DetailsScreen;
