import Program from "../models/Program.js"

export const getPrograms = async (req, res) => {
    try {
        const programs = await Program.find()
        res.status(200).json(programs)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const getProgram = async (req, res) => {
    try {
        const { id } = req.params
        const program = await Program.findById(id)
        res.status(200).json(program)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const addProgram = async (req, res) => {
    try {
        const { code, fullName, years, specialization } = req.body
        const newProgram = await Program.create({
            code,
            fullName,
            years,
            specialization
        })
        const savedProgram = await newProgram.save()
        res.status(201).json(savedProgram)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteProgram = async (req, res) => {
    try {
        await Program.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateProgram = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const { code, fullName, years } = req.body
        const update = { 
            code: code, 
            fullName: fullName, 
            years: years 
        }

        await Program.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}