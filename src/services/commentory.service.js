import { db } from "../config/db.js";
import { commentary } from "../config/schema.js";
import { desc, eq } from "drizzle-orm";

export async function getCommentariesService(matchId, limitQuery) {
    const MAX_LIMIT = 100;
    const DEFAULT_LIMIT = 100;
    const limit = Math.min(limitQuery ?? DEFAULT_LIMIT, MAX_LIMIT);

    return db
        .select()
        .from(commentary)
        .where(eq(commentary.matchId, matchId))
        .orderBy(desc(commentary.createdAt))
        .limit(limit);
}

export async function createCommentaryService(matchId, data) {
    const [created] = await db.insert(commentary).values({
        ...data,
        matchId,
    }).returning();

    return created;
}