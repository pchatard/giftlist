import { Request, Response } from 'express';
import List from '../services/ListService';

export async function authorize(req: Request, _: Response, next: Function) {
    try {
        // get the listId
        const listId = req.params.listId;

        // Get the owner id
        const ownerId = (await List.getOne(req.db, listId)).ownerId;

        // Compare user ids
        if (ownerId === req.userId) {
            next();
        } else {
            throw new Error('Not authorized');
        }
    } catch (error) {
        next(error);
    }
}