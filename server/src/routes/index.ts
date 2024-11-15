import express from "express";
import { data } from "../../data";
const router = express.Router();

// This is recommended to
router.route("/").get(async (req, res) => {
  return res.status(200).json({ message: "Default api endpoint" });
});

router.route("/employees").get(async (req, res) => {
  console.log("we made here here...");
  return res.status(200).json({ employees: data });
});

export default router;
