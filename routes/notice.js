
var express = require("express");
var router = express.Router();
var header_txt = "이터인포 - 공지사항";
var header_description = "이터인포 - 이터인포 방문을 환영합니다. 공지 내용및 업데이트 내역을 확인하는 화면입니다.";

router.get("/", function(req, res) {
  res.render("notice/index",{title:header_txt,description:header_description});
});

module.exports = router;
