import mongoose from 'mongoose'

export const CourseSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        semester: { type: Number, required: true },
        year: { type: Number, required: true },
        specialization: String,
        lectureHours: { type: Number, required: true },
        labHours: { type: Number, required: true }
    }, 
    { timestamps: true }
)

const Course = mongoose.model('Course', CourseSchema)
export default Course