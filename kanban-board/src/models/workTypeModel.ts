import mongoose,{Schema} from "mongoose";

const workTypeSchema = new Schema(
  {
    name: String,
    itemIds: [{ type: Schema.Types.ObjectId, ref: 'Card', default: [] }],
  },
  {
    timestamps: true
  }
)

const WorkType = mongoose.models.WorkType ||  mongoose.model('WorkType',workTypeSchema);

export default WorkType;