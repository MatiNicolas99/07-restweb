

import { PrismaClient } from "@prisma/client/extension";
import { envs } from "../../config/envs";
import { PrismaPg } from "@prisma/adapter-pg";


const connectionString = `${envs.POSTGRES_URL}`
const adapter = new PrismaPg({connectionString});


export const prisma = new PrismaClient({adapter});