import express from "express";
import {
  getSlots,
  getSlotByIndex,
  createSlot,
  updateSlot,
  deleteSlot,
} from "../controllers/slotController.js";

const router = express.Router();

router.get("/", getSlots);
router.get("/index/:index", getSlotByIndex);
router.post("/", createSlot);
router.put("/:id", updateSlot);
router.delete("/:id", deleteSlot);

export default router;
