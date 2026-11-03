import { Router } from 'express';
import { createCommentary, getCommentories } from '../controllers/commentory.controller.js';
import { validateMiddle, validateParamsMiddle, validateQueryMiddle } from '../middlewares/validate.middleware.js';
import { matchIdParamSchema } from '../validation/matches.js';
import { createCommentarySchema, listCommentaryQuerySchema } from '../validation/commentary.js';

const commentoryRouter = Router({ mergeParams: true });

//GET
commentoryRouter.get(
    "/",
    validateParamsMiddle(matchIdParamSchema),
    validateQueryMiddle(listCommentaryQuerySchema),
    getCommentories
)

//POST
commentoryRouter.post(
    "/",
    validateParamsMiddle(matchIdParamSchema),
    validateMiddle(createCommentarySchema),
    createCommentary
)

export default commentoryRouter;