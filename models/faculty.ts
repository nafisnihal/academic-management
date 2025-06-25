import { Schema, model, models } from "mongoose";

const FacultySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export const Faculty = models.Faculty || model("Faculty", FacultySchema);
