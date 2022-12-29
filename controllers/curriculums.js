import Curriculum from '../models/Curriculum.js'

export const getCurriculums = async (req, res) => {
    try {
        const curriculums = await Curriculum
            .find({ programId: req.params.programId })
            .populate('programId')
            .select('version year programId')
        if (curriculums.length !== 0)
            res.status(200).json(curriculums)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getCurriculum = async (req, res) => {
    try {
        const { id } = req.params
        const curriculum = await Curriculum.findById(id)
            .populate('programId')
            .select('version year programId')
        if (curriculum)
            res.status(200).json(curriculum)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addCurriculum = async (req, res) => {
    try {
        const { version, year } = req.body
        const programId = req.params.programId
        const newCurriculum = await Curriculum.create({
            version,
            year,
            programId
        })
        const savedCurriculum = await newCurriculum.save()
        res.status(201).json({ id: savedCurriculum._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteCurriculum = async (req, res) => {
    try {
        await Curriculum.deleteOne({ 
            programId: req.params.programId, 
            _id: req.params.id 
        })
        res.status(204).send()
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const updateCurriculum = async (req, res) => {
    try {
        const filter = { 
            programId: req.params.programId, 
            _id: req.params.id 
        }
        const { version, year } = req.body
        const update = { 
            version: version, 
            year: year
        }

        await Curriculum.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}