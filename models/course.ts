import mongoose, { Schema, models } from "mongoose";

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    facultyId: { type: String, default: "" },
    enrolledStudentIds: [String],
  },
  { timestamps: true }
);

export const Course = models.Course || mongoose.model("Course", CourseSchema);
