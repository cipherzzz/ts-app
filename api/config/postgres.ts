import { createConnection } from "typeorm";

export const initializeDbConnection = async (name = "default") => {
  return await createConnection(name)
};
