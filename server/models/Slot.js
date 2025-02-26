import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  id: String,
  index: Number,
  time: String,
  booked: Boolean,
  user: {
    firstName: String,
    lastName: String,
    phone: String,
  },
});

const Slot = mongoose.model("Slot", SlotSchema);
export default Slot;
