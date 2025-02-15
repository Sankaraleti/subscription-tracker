import { config } from "dotenv";
// config({ path: ".env" }); // this should be dynamic env as we have multiple environments

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, NODE_ENV } = process.env;

//NODE_ENV  is by default to developement
