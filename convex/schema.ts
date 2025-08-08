import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  // Add your application tables here
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});