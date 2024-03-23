import { connectToDatabase } from "@/app/helpers/server-helper";
import {prisma}from '../../../../../prisma/index.ts' ;
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) =>{
    try {
        console.log("start");
        const { email, name, password} = await req.json()
        if(!name || !email || !password) return NextResponse.json({message:"Invalid Database"}, {status:422})
        const hashedPassword = await bcrypt.hash(password,10);
        await connectToDatabase()
        const newUser = await prisma.post.create({data:{email,name, password:hashedPassword}});
        console.log('newUser', newUser);
        return NextResponse.json({newUser}, {status:201});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Server Error"}, {status:500});
    }finally{
        await prisma.$disconnect();
    }

}

export const GET = async (req: Request) => {
    try {
        console.log("start GET");
        await connectToDatabase();
        const users = await prisma.post.findMany();
        console.log('users', users);
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}