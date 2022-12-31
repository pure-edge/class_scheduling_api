import express from 'express'
import { getProgram, getPrograms, addProgram, updateProgram, deleteProgram } from '../controllers/programs.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getPrograms)
router.get('/:id', verifyToken, getProgram)
router.post('/', verifyToken, addProgram)
router.put('/:id', verifyToken, updateProgram)
router.delete('/:id', verifyToken, deleteProgram)

export default router
