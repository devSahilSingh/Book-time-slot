import Slot from "../models/Slot.js";

// Get all booking slots
export const getSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    // If no slots found, return an empty array with a message
    if (!slots || slots.length === 0) {
      return res.status(404).json({ message: "No slots found." });
    }
    res.status(200).json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get booking slot by index
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

// Create a new booking slot
export const createSlot = async (req, res) => {
  try {
    const { id, index, time, booked, user } = req.body;
    // Create new slot
    const slot = new Slot({
      id,
      index,
      time,
      booked: booked || false,
      user: user || null,
    });
    // Save to database
    await slot.save();
    res.status(201).json(slot);
  } catch (error) {
    console.error("Error creating slot:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update a booking slot
export const updateSlot = async (req, res) => {
  try {
    const { user } = req.body;
    // Check if user data is provided
    if (!user) {
      return res.status(400).json({ message: "User details are required." });
    }
    // Find and update the slot
    const slot = await Slot.findByIdAndUpdate(
      req.params.id,
      { booked: true, user },
      { new: true, runValidators: true }
    );
    // If slot is not found
    if (!slot) {
      return res.status(404).json({ message: "Slot not found." });
    }
    res.json(slot);
  } catch (error) {
    console.error("Error updating slot:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a booking slot
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
