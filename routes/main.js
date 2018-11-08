
var express = require("express");
var PopItem = require("../models/PopItem.js");
var PopItemRS = require("../models/PopItemRS.js");
var EterItem = require("../models/EterItem.js");
var moment = require("moment");
var router = express.Router();
var header_txt = "이터인포 - 한국형 좀비 아포칼립스 RPG! 이터널시티의 모든정보!";
var header_description = "한국형 좀비 아포칼립스 RPG! 이터널시티의 모든정보를 제공합니다. 무기. 불법무기. 공격력 시뮬레이션.";

router.get("/", function(req, res) {
  res.render("main/index",{title:header_txt,description:header_txt});
});

router.post("/getpopulitem", function(req, res) {
  var in_obj = {};
  var in_list = [];
  var out_obj = {};
  var out_list = [];
  var same = false;
  for(var i=0; i<7; i++) {
    in_obj = {};
    in_obj.reg_dt = moment().add((i-7),"days").format("YYYYMMDD");
    in_list.push(in_obj);
  }
  // console.log(in_list);
  PopItem.find({$or:in_list}).sort("item_id").exec(
    function(err, db_list){
      if(err) return res.json(err);
      for(var i in db_list) {
        // console.log("[리얼 ]" + db_list[i].item_id);
        same = false;
        if(i == '0') {
          // console.log("처음["+i+"] " + db_list[i].item_id);
          out_obj = {};
          result_in_obj = {};
          out_obj.item_id = db_list[i].item_id;
          out_obj.cnt = 1;
          out_list.push(out_obj);
        }else{
          for(var j in out_list) {
            if(db_list[i].item_id == out_list[j].item_id) {
              // console.log("같다 ["+i+"] " + db_list[i].item_id);
              out_obj = {};
              result_in_obj = {};
              out_obj.item_id = db_list[i].item_id;
              out_obj.cnt = out_list[j].cnt + 1;
              out_list.splice(j ,1);
              out_list.push(out_obj);
              same = true;
              break;
            }
          }

          if(!same) {
            // console.log("안같다 ["+i+"] " + db_list[i].item_id);
            out_obj = {};
            out_obj.item_id = db_list[i].item_id;
            out_obj.cnt = 1;
            out_list.push(out_obj);
          }
        }
      }
      res.json([]);
    }
  );
});

module.exports = router;
