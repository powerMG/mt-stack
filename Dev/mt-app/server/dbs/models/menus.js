import mongoos from "mongoose";

const MenusSchema = mongoos.Schema({
  menu: {
    type: Array,
    required: true
  }
});

export default mongoos.model("menu", MenusSchema);
