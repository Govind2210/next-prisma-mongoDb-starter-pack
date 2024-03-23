import {prisma} from '../../../prisma/index.ts' ;

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        console.log("error", error);
        throw new Error("Unable to connect to database");
    }
}