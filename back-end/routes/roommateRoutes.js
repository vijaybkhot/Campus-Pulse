import express from 'express';
import {
    createRoommate,
    deleteRoommate,
    getAllRoommates,
    getRoommateById,
    updateRoommate,
} from '../controller/roommateController.js';

const router = express.Router();

router.route('/').get(getAllRoommates).post(createRoommate);
router.route('/:id').get(getRoommateById).put(updateRoommate).delete(deleteRoommate);

export default router;


