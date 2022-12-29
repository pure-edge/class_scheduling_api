import mongoose from 'mongoose'
import { CourseSchema } from './Course.js'

const CurriculumSchema = new mongoose.Schema(
    {
        version: { type: String, required: true, unique: true },
        year: { type: Number, required: true },
        programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
        courses: [CourseSchema]
    }, 
    { timestamps: true }
)

const Curriculum = mongoose.model('Curriculum', CurriculumSchema)
export default Curriculum