import mongoose, { Schema, models } from "mongoose";

const StudentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    gpa: { type: Number, default: 0.0 },
    enrolledCourses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        grade: { type: Number, default: null },
        progress: { type: String, default: "" },
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Student =
  models.Student || mongoose.model("Student", StudentSchema);
