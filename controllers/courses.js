import Curriculum from "../models/Curriculum.js"

export const getCourses = async (req, res) => {
    try {
        const curriculum = await Curriculum.findById(req.params.curriculumId)
        const { year, semester } = req.query

        if (year) {
            curriculum.courses = curriculum.courses.filter((item) => item.year == year)
        }
        if (semester) {
            curriculum.courses = curriculum.courses.filter((item) => item.semester == semester)
        }

        if (curriculum.courses.length !== 0)
            res.status(200).json(curriculum.courses)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getCourse = async (req, res) => {
    try {
        const {curriculumId, id } = req.params
        const curriculum = await Curriculum.findById(curriculumId)
        const course = curriculum.courses.id(id)
        if (course)
            res.status(200).json(course)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addCourse = async (req, res) => {
    try {
        const newCourse = req.body
        const curriculum = await Curriculum.findById(req.params.curriculumId)
        curriculum.courses.push(newCourse)
        await curriculum.save()
        const idNewCourse = curriculum.courses[curriculum.courses.length-1]._id
        res.status(201).json({ id: idNewCourse })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const {curriculumId, id } = req.params
        const curriculum = await Curriculum.findById(curriculumId)
        curriculum.courses.id(id).remove();
        await curriculum.save()
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateCourse = async (req, res) => {
    try {
        const {curriculumId, id } = req.params
        const curriculum = await Curriculum.findById(curriculumId)

        const {code, description, semester, year, lectureHours, labHours } = req.body
        curriculum.courses.id(id).code = code
        curriculum.courses.id(id).description = description
        curriculum.courses.id(id).semester = semester
        curriculum.courses.id(id).year = year
        curriculum.courses.id(id).lectureHours = lectureHours
        curriculum.courses.id(id).labHours = labHours

        await curriculum.save()
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}