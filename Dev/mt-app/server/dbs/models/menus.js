import mongoos from "mongoose";

const MenusSchema = mongoos.Schema({
  menus: {
    type: Array,
    required: true
  }
});

export default mongoos.model("menus", MenusSchema);
