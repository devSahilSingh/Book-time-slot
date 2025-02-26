import Slot from "../models/Slot.js";

export const getSlots = async (req, res) => {
  const slots = await Slot.find();
  res.json(slots);
};

export const getSlotByIndex = async (req, res) => {
  try {
    const slot = await Slot.findOne({ index: parseInt(req.params.index) });
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    res.json(slot);
  } catch (error) {
    console.error("Error fetching slot:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createSlot = async (req, res) => {
  const { id, index, time, booked, user } = req.body;
  const slot = new Slot({ id, index, time, booked, user });
  await slot.save();
  res.json(slot);
};

export const updateSlot = async (req, res) => {
  const { user } = req.body;
  const slot = await Slot.findByIdAndUpdate(
    req.params.id,
    { booked: true, user },
    { new: true }
  );
  res.json(slot);
};

export const deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    await Slot.findByIdAndDelete(req.params.id);
    res.json({ message: "Slot cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
