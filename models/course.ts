import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    facultyId: { type: String, default: "" },
    enrolledStudentIds: [String],
  },
  { timestamps: true }
);

export const Course =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
