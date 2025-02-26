// initial state for slot reducer
const initialState = {
  slots: Array.from({ length: 9 }, (_, i) => ({
    time: `${9 + i}:00 - ${10 + i}:00`,
    booked: false,
    user: null,
  })),
  loading: false,
  error: null,
};

function slotReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_SLOTS":
      return {
        ...state,
        slots: state.slots.map((slot, idx) => {
          const apiSlot = action.payload.find(
            (apiItem) => apiItem.index === idx || apiItem.id === slot.id
          );
          return apiSlot ? { ...slot, ...apiSlot, _id: apiSlot._id } : slot;
        }),
      };

    case "BOOK_SLOT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "BOOK_SLOT_SUCCESS":
      return {
        ...state,
        loading: false,
        slots: state.slots.map((slot, idx) =>
          idx === action.payload.index ? { ...slot, ...action.payload } : slot
        ),
      };

    case "BOOK_SLOT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CLEAR_SLOT":
      return {
        ...state,
        slots: state.slots.map((slot, index) =>
          index === action.payload.index
            ? { ...slot, booked: false, user: null }
            : slot
        ),
      };

    default:
      return state;
  }
}

export default slotReducer;
