import mongoose from "mongoose";
const ProvinceSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model("province", ProvinceSchema);
