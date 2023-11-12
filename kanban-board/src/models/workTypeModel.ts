import mongoose,{Schema} from "mongoose";

var workTypeSchema = new Schema(
  {
    name: String,
    itemIds: [{ type: Schema.Types.ObjectId, ref: "Card", default: [] }],
  },
  {
    timestamps: true
  }
)

var WorkType =  mongoose.models.WorkType || mongoose.model("WorkType",workTypeSchema);

export default WorkType;