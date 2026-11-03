import {
    createMatchService,
    getMatchesService
} from "../services/matches.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const getMatches = asyncHandler(async (req, res) => {
    const data = await getMatchesService(req.query.limit)
    return res.status(200).json(
        new ApiResponse(200, "Matches fetched successfully", data)
    )
})

export const createMatch = asyncHandler(async (req, res) => {
    const data = await createMatchService(req.body)
    const broadcastMatchCreated = res.app.locals.broadcastMatchCreated

    if (broadcastMatchCreated) {
        broadcastMatchCreated(data)
    }
    return res.status(201).json(
        new ApiResponse(201, "Match created successfully", data)
    )
})