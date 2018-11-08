
var express = require("express");
var router = express.Router();
var mongoose   = require("mongoose");
var EterItem = require("../models/EterItem.js");
var Up = require("../models/Up.js");
var utils  = require("../utils");
var header_txt = "공격력 - 커스터마이징 - 이터널시티 - 이터인포";
var header_txt1 = "치명 - 커스터마이징 - 이터널시티 - 이터인포";
var header_description = "한국형 좀비 아포칼립스 RPG! 이터널시티의 무기를 착용한것에 대한 자신의 공격력을 미리 알아보는 화면입니다. 모든 스탯과 어떤 아이템을 착용하는가에 따라 공격력이 변화합니다.";
var header_description1 = "한국형 좀비 아포칼립스 RPG! 이터널시티의 인벤 치명과 헤드샷,카운터 데미지 비율을 계산합니다.";

router.get("/", function(req, res) {
  var result_obj = {};
  result_obj.item_info = {};
  result_obj.up_obj = {};
  result_obj.upnm_list = [];
  result_obj.numup_list_cl = [];
  result_obj.numup_list = [];
  result_obj.yn = "N";
  res.render("custom/index",{title:header_txt,description:header_description,data:result_obj});
});

router.get("/cri", function(req, res) {
  var result_obj = {};
  result_obj.item_info = {};
  result_obj.up_obj = {};
  result_obj.upnm_list = [];
  result_obj.numup_list_cl = [];
  result_obj.numup_list = [];
  result_obj.yn = "N";
  res.render("custom/cri",{title:header_txt1,description:header_description1,data:result_obj});
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
      result_obj.numup_list_cl = ["[CL]","[CL] +1","[CL] +2","[CL] +3","[CL] +4","[CL] +5","[CL] +6","[CL] +7","[CL] +8","[CL] +9","[CL-MAX]","[CL-MAX] +1","[CL-MAX] +2","[CL-MAX] +3","[CL-MAX] +4","[CL-MAX] +5","[CL-MAX] +6","[CL-MAX] +7","[CL-MAX] +8","[CL-MAX] +9"];
      result_obj.numup_list = ["","+1","+2","+3","+4","+5","+6","+7","+8","+9","[MAX]","[MAX] +1","[MAX] +2","[MAX] +3","[MAX] +4","[MAX] +5","[MAX] +6","[MAX] +7","[MAX] +8","[MAX] +9"];
      result_obj.yn = "Y";

      res.render("custom/index",{title:header_txt,description:header_description,data:result_obj});
    }
  );
});

router.get("/cri/:nameParam", function(req, res) {
  var id = req.params.nameParam;
  var result_obj = {};
  var up_list = [];

  EterItem.findOne({_id:id}).exec(
    function(err, db_obj) {
      if(err) return res.json(err);
      result_obj.item_info = db_obj;
      result_obj.up_obj = utils.calcWp(db_obj.dmg);
      result_obj.upnm_list = ["노강","1강","2강","3강","4강","5강","6강","7강","8강","9강","맥강","맥1강","맥2강","맥3강","맥4강","맥5강","맥6강","맥7강","맥8강","맥9강"];
      result_obj.numup_list_cl = ["[CL]","[CL] +1","[CL] +2","[CL] +3","[CL] +4","[CL] +5","[CL] +6","[CL] +7","[CL] +8","[CL] +9","[CL-MAX]","[CL-MAX] +1","[CL-MAX] +2","[CL-MAX] +3","[CL-MAX] +4","[CL-MAX] +5","[CL-MAX] +6","[CL-MAX] +7","[CL-MAX] +8","[CL-MAX] +9"];
      result_obj.numup_list = ["","+1","+2","+3","+4","+5","+6","+7","+8","+9","[MAX]","[MAX] +1","[MAX] +2","[MAX] +3","[MAX] +4","[MAX] +5","[MAX] +6","[MAX] +7","[MAX] +8","[MAX] +9"];
      result_obj.yn = "Y";

      res.render("custom/cri",{title:header_txt,description:header_description,data:result_obj});
    }
  );
});

router.post("/selectitem", function(req, res) {
  var in_list = get_in_list(req);
  var out_result = {};
  var out_list = [];
  var out_obj = {};
  var cl_upnm = ["[CL]","[CL] +1","[CL] +2","[CL] +3","[CL] +4","[CL] +5","[CL] +6","[CL] +7","[CL] +8","[CL] +9","[CL-MAX]","[CL-MAX] +1","[CL-MAX] +2","[CL-MAX] +3","[CL-MAX] +4","[CL-MAX] +5","[CL-MAX] +6","[CL-MAX] +7","[CL-MAX] +8","[CL-MAX] +9"];
  var noncl_upnm = ["","+1","+2","+3","+4","+5","+6","+7","+8","+9","[MAX]","[MAX] +1","[MAX] +2","[MAX] +3","[MAX] +4","[MAX] +5","[MAX] +6","[MAX] +7","[MAX] +8","[MAX] +9"];

  EterItem.find({$and:in_list}).sort("order").sort("tier").exec(
    function(err, db_list){
      if(err) return res.json(err);
      var upnm = "";
      for(var i in db_list) {
        out_obj = db_list[i];
        out_obj.dmg = calcWp(db_list[i].dmg,req.body.max_dv,req.body.up_dv);
        if(req.body.clyn == "Y") {
          if(db_list[i].item_nm.indexOf("[지원]") < 0) {
            out_obj.item_nm = cl_upnm[req.body.max_dv] + db_list[i].item_nm.substr(db_list[i].item_nm.indexOf("[CL]")+4);
          }else{
            out_obj.item_nm = noncl_upnm[req.body.max_dv] + " " + db_list[i].item_nm;
          }
        }else{
          out_obj.item_nm = noncl_upnm[req.body.max_dv] + " " + db_list[i].item_nm;
        }
        out_list.push(out_obj);
      }
      out_result.db_list = out_list;
      out_result.ctype = req.body.ctype;
      res.json(out_result);
    }
  );
});

module.exports = router;
