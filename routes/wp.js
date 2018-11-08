
var express = require("express");
var router = express.Router();
var mongoose   = require("mongoose");
var EterItem = require("../models/EterItem.js");
var utils  = require("../utils");
var header_txt = "무기 - 이터널시티 - 이터인포";
var header_description = "한국형 좀비 아포칼립스 RPG! 이터널시티의 무기목록 및 강화별 공격력을 확인합니다.";

router.get("/", function(req, res) {
  res.render("wp/index",{title:header_txt,description:header_description});
});

router.post("/getitemdblist", function(req, res) {
  var in_list = [];
  if(req.body.clyn.length != '0') in_list.push({"clyn":req.body.clyn});
  if(req.body.illegal.length != '0') in_list.push({"illegal":req.body.illegal});
  if(req.body.stype1.length != '0') in_list.push({"stype1":req.body.stype1});
  if(req.body.tier.length != '0') in_list.push({"tier":req.body.tier});
  if(req.body.ctype.length != '0') in_list.push({"ctype":req.body.ctype});
  // console.log(in_list);

  EterItem.find({$and:in_list}).sort("order").sort("tier").exec(
    function(err, db_list){
      if(err) return res.json(err);
      res.json(db_list);
    }
  );
});

router.get("/:nameParam", function(req, res) {
  var id = req.params.nameParam;
  var result_obj = {};
  var up_list = [];

  EterItem.findOne({_id:id}).exec(
    function(err, db_obj) {
      if(err) return res.json(err);
      result_obj.item_info = db_obj;
      result_obj.up_obj = utils.calcWp(db_obj.dmg);
      result_obj.upnm_list = ["노강","1강","2강","3강","4강","5강","6강","7강","8강","9강","맥강","맥1강","맥2강","맥3강","맥4강","맥5강","맥6강","맥7강","맥8강","맥9강"];

      res.render("wp/view",{title:result_obj.item_info.item_nm+" - 강화별 무기공격력 - 이터널시티",
      description:header_description,data:result_obj});
    }
  );
});

module.exports = router;
