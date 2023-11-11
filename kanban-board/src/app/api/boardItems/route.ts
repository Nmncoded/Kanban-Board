import connectMongodb from "@/libs/mongodb";
import Card from "@/models/cardModel";
import { NextResponse } from "next/server";

export async function POST(request:Request){
  const {title,chat,priority,boardId, workTypeId} = await request.json();
  await connectMongodb();
  await Card.create({title, chat, priority, boardId, workTypeId});
  return NextResponse.json({message:'success'},{status:200});
}

export async function DELETE(request:Request,second:any){
  // const id = request.;
  const urlParams = new URL(request.url);
 console.log({urlParams})
const serviceId = urlParams.searchParams.get("id")
  console.log(request,serviceId);
  await connectMongodb();
  await Card.findByIdAndDelete(serviceId);
  return NextResponse.json({message:'deleted successfully'},{status:200});
}

export async function PUT(request:Request,second:any){
  // const id = request.;
  const urlParams = new URL(request.url);
 console.log({urlParams})
const serviceId = urlParams.searchParams.get("id")
  console.log(request,serviceId);
  await connectMongodb();
  await Card.findByIdAndUpdate(serviceId,request.body);
  return NextResponse.json({message:'deleted successfully'},{status:200});
}