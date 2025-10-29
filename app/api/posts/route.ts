import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const posts =await prisma.post.findMany();
    return NextResponse.json(posts)
}
export async function POST(req:Request){
    const {title,author}=await req.json();
    if(!title ||!author){
        return NextResponse.json({error:'all fields are required'});
    }
    const post =await prisma.post.create({data:{title,author}});
   return NextResponse.json(post);
}