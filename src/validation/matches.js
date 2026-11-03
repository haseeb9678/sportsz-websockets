import { z } from "zod"

export const listMatchesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
})

export const MATCH_STATUS = {
  SCHEDULED: "scheduled",
  LIVE: "live",
  FINISHED: "finished",
}

export const matchIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
})

const isoDateStringSchema = z.string().datetime({ offset: true }).refine(
  (value) => !Number.isNaN(Date.parse(value)),
  "Invalid ISO date string",
)

export const createMatchSchema = z
  .object({
    sport: z.string().trim().min(1),
    homeTeam: z.string().trim().min(1),
    awayTeam: z.string().trim().min(1),
    startTime: isoDateStringSchema,
    endTime: isoDateStringSchema,
    homeScore: z.coerce.number().int().nonnegative().optional(),
    awayScore: z.coerce.number().int().nonnegative().optional(),
  })
  .superRefine((data, context) => {
    if (Date.parse(data.endTime) <= Date.parse(data.startTime)) {
      context.addIssue({
        code: "custom",
        path: ["endTime"],
        message: "endTime must be chronologically after startTime",
      })
    }
  })

export const updateScoreSchema = z.object({
  homeScore: z.coerce.number().int().nonnegative(),
  awayScore: z.coerce.number().int().nonnegative(),
})
