import Curriculum from "../models/Curriculum.js"

export const getCourses = async (req, res) => {
    try {
        const curriculum = await Curriculum.findOne({program: req.params.curriculumId})
        const { year, semester } = req.query
        
        if (year) {
            curriculum.courses = curriculum.courses.filter((item) => item.year == year)
        }
        if (semester) {
            curriculum.courses = curriculum.courses.filter((item) => item.semester == semester)
        }

        res.status(200).json(curriculum)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const getCourse = async (req, res) => {
    try {
        const {curriculumId, id } = req.params
        const curriculum = await Curriculum.findOne({program: curriculumId})
        const course = curriculum.courses.id(id)
        console.log(course)
        res.status(200).json(course)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const addCourse = async (req, res) => {
    try {
        const newCourse = req.body
        const curriculum = await Curriculum.findOne({program: req.params.curriculumId})
        curriculum.courses.push(newCourse)
        await curriculum.save()
        res.status(201).json(newCourse)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const {curriculumId, id } = req.params
        const curriculum = await Curriculum.findOne({program: curriculumId})
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
        const curriculum = await Curriculum.findOne({program: curriculumId})

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