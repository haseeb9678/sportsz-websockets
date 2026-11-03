import { desc } from "drizzle-orm"
import { db } from "../config/db.js"
import { matches } from "../config/schema.js"
import { getMatchStatus } from "../utils/match-status.js"

export async function getMatchesService(limitQuery) {
    const MAX_LIMIT = 100
    const limit = Math.min(limitQuery ?? 10, MAX_LIMIT)

    const data = await db
        .select()
        .from(matches)
        .orderBy((desc(matches.createdAt)))
        .limit(limit)

    return data
}

export async function createMatchService(data) {
    const { startTime, endTime, homeScore, awayScore } = data

    const [event] = await db.insert(matches).values({
        ...data,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        homeScore: homeScore ?? 0,
        awayScore: awayScore ?? 0,
        status: getMatchStatus(startTime, endTime)
    }).returning()


    return event
}