
var express = require("express");
var router = express.Router();
var utils  = require("../utils");
var header_txt = "용병계산기 - 이터널시티 - 이터인포";
var header_description = "이터인포 - 한국형 좀비 아포칼립스 RPG! 이터널시티의 용병 강화에 따른 공격력을 계산합니다.";

router.get("/", function(req, res) {
  res.render("ybsim/index",{title:header_txt,description:header_description});
});

router.post("/getybinfo", function(req, res) {
  var result_obj = {};
  result_obj = utils.calcYb(req.body.ybdmga,req.body.ybdmgb,req.body.ybcon);
  res.json(result_obj);
});

module.exports = router;
