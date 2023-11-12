import connectMongodb from "@/libs/mongodb";
import Card from "@/models/cardModel";
import WorkType from "@/models/workTypeModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { cardId, activeBoardId, overBoardId } = await request.json();
  console.log(cardId, activeBoardId, overBoardId );
  await connectMongodb();
  const oldRes = await WorkType.findByIdAndUpdate(activeBoardId,{$pull:{ itemIds : cardId }},{new:true});
  const res = await WorkType.findByIdAndUpdate(overBoardId,{$push:{ itemIds : cardId }},{new:true});
  const data = await Card.findByIdAndUpdate(cardId, { workTypeId : res.id },{new:true});
  console.log(data, oldRes,res );
  return NextResponse.json({ message: 'updated successfully',data,res,oldRes }, { status: 200 });
}