import mongoose,{Schema} from "mongoose";

const cardSchema = new Schema(
  {
    priority: { type: Number, default: Math.round(Math.random()*3) },
    boardId: { type: Number, default: Math.round(Math.random()*3) },
    title: { type: String, required: true },
    chat: { type: Number, default: Math.round(Math.random()*10) },
    workTypeId: { type: Schema.Types.ObjectId, ref: 'WorkType' },
  },
  {
    timestamps: true
  }
)

const Card = mongoose.model('Card',cardSchema);

export default Card;