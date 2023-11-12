import connectMongodb from "@/libs/mongodb";
import WorkType from "@/models/workTypeModel";
import { NextResponse } from "next/server";

export async function POST(request:Request){
  const {name} = await request.json();
  await connectMongodb();
  const res = await WorkType.create({name});
  console.log(res);
  return NextResponse.json({message:'success'},{status:200});
}

export async function GET(request:Request){
  await connectMongodb();
  const data = await WorkType.find().populate("itemIds");
  return NextResponse.json({message:'success',data},{status:200});
}