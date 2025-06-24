import mongoose, { Schema, models } from "mongoose";

const StudentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    gpa: { type: Number, default: 0.0 },
    enrolledCourses: [
      {
        courseId: { type: String, required: true },
        grade: { type: Number, default: null },
        progress: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

export const Student =
  models.Student || mongoose.model("Student", StudentSchema);
