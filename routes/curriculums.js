import express from 'express'
import { getCurriculum, getCurriculums, addCurriculum, updateCurriculum, deleteCurriculum } from '../controllers/curriculums.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getCurriculums)
router.get('/:id', verifyToken, getCurriculum)
router.post('/', verifyToken, addCurriculum)
router.put('/:id', verifyToken, updateCurriculum)
router.delete('/:id', verifyToken, deleteCurriculum)

export default router