import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createCommentaryService, getCommentariesService } from "../services/commentory.service.js";

export const getCommentories = asyncHandler(async (req, res) => {
    const data = await getCommentariesService(
        req.validatedParams.id,
        req.validatedQuery.limit
    );
    return res.status(200).json(
        new ApiResponse(200, "Commentaries fetched successfully", data)
    );

})
export const createCommentory = asyncHandler(async (req, res) => {
    const data = await createCommentaryService(req.validatedParams.id, req.body)

    const { broadcastMatchCommentary } = req.app.locals
    broadcastMatchCommentary?.(req.validatedParams.id, data)
    return res.status(201).json(
        new ApiResponse(201, "Commentary created successfully", data)
    )
})

export const createCommentary = createCommentory