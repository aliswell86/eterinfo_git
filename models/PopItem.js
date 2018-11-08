
var mongoose = require("mongoose");

var PopItem = mongoose.Schema({
  reg_dt:{type:String},
  item_id:{type:String},
  trsc_dv_nm:{type:String}
});

var PopItem = mongoose.model("PopItem", PopItem);
module.exports = PopItem;
