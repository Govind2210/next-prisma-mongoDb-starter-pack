import { connectToDatabase } from "@/app/helpers/server-helper";
import {prisma}from '../../../../../prisma/index.ts' ;
import { NextResponse } from "next/server";

export const POST = async (req: Request) =>{
    try {
        console.log("start");
        const {  name, url} = await req.json()
        if(!name || !url) return NextResponse.json({message:"Data is invalid"});
        await connectToDatabase()
        // const newUser = await prisma.post.create({data:{}});
        const navBar = await prisma.navbar.create({data:{name, url}})
        console.log("navbar created")
        return NextResponse.json({navBar}, {status:201});
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
        const navBar = await prisma.navbar.findMany();
        console.log('users', navBar);
        return NextResponse.json({ navBar }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}