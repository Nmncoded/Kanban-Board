import connectMongodb from "@/libs/mongodb";
import Card from "@/models/cardModel";
import WorkType from "@/models/workTypeModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, chat, priority, boardId, workTypeId } = await request.json();
  await connectMongodb();
  var id = new mongoose.mongo.ObjectId(workTypeId);
  const board = await WorkType.findById(workTypeId);
  const data = await Card.create({ title, chat, priority, boardId, workTypeId:id });
  const res = await WorkType.findByIdAndUpdate(id,{$push:{ itemIds : data.id }},{new:true});
  console.log(id,board,data,res);
  return NextResponse.json({ message: 'success',data}, { status: 200 });
}

export async function DELETE(request: Request) {
  // const urlParams = new URL(request.url);
  // const cardId = urlParams.searchParams.get("cardId");
  // const boardId = urlParams.searchParams.get("boardId");
  const { cardId, boardId } = await request.json();
  console.log(cardId, boardId);
  await connectMongodb();
  const data = await Card.findByIdAndDelete(cardId);
  await WorkType.findByIdAndUpdate(boardId,{$pull:{ itemIds : cardId }});
  return NextResponse.json({ message: 'deleted successfully' }, { status: 200 });
}

export async function PUT(request: Request) {
  // const urlParams = new URL(request.url);
  // const cardId = urlParams.searchParams.get("cardId")
  const { cardId, boardId, title } = await request.json();
  console.log(cardId, boardId, title );
  await connectMongodb();
  await Card.findByIdAndUpdate(cardId, { title });
  return NextResponse.json({ message: 'updated successfully' }, { status: 200 });
}