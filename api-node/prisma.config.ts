import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres:Moa@123@localhost:5432/gopherscraper?schema=public"
  }
});