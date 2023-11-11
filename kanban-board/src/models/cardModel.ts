import mongoose,{Schema} from "mongoose";

const cardSchema = new Schema(
  {
    priority: { type: Number, default: Math.round(Math.random()*3) },
    boardId: { type: Number, default: Math.round(Math.random()*3) },
    title: { type: String, required: true },
    chat: { type: Number, default: Math.round(Math.random()*10) },
    WorkTypeId: { type: Schema.Types.ObjectId, ref: "WorkType", require },
  },
  {
    timestamps: true
  }
)

const Card = mongoose.models.Card || mongoose.model('Card',cardSchema);

export default Card;