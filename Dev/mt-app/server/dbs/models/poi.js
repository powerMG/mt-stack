import mongoos from "mongoose";

const poiSchema = mongoos.Schema({
  name: {
    type: String
  },
  provice: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String
  },
  areaCode: {
    type: String
  },
  tel: {
    type: String
  },
  area: {
    type: String
  },
  add: {
    type: String
  },
  type: {
    type: String
  },
  module: {
    type: String
  },
  longtide: {
    type: String
  },
  latitude: {
    type: String
  }
});
export default mongoos.model("poi", poiSchema);
