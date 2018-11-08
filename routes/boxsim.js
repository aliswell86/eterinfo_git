
var express = require("express");
var utils  = require("../utils");
var router = express.Router();
var header_txt = "알쏭달쏭 폭죽패키지 - 이터널시티 - 이터인포";
var header_description = "한국형 좀비 아포칼립스 RPG! 이터널시티의 알쏭달쏭 폭죽패키지를 열어 봅니다. 구성품의 확률과 결과물을 확인합니다.";

router.get("/", function(req, res) {
  res.render("boxsim/box1",{title:header_txt,description:header_description});
});

router.post("/box1open", function(req, res) {
  var box1_dv = req.body.box1_dv;
  var setep = req.body.setep;
  var result = {};
  var result_cur_money = 0;
  var result_cur_ep = 0;
  var result_ary = [];
  var cnt = 0;
  // console.log("box1_dv : " + req.body.setep_num);
  if(box1_dv=="300") cnt = Number(req.body.setep_num);
  else cnt = Number(box1_dv);

  if(Number(box1_dv) <= 300) {
    for(var i=1; i<= cnt; i++) {
      var result_box = box1_get();
      // console.log("["+i+"] result_box.value : " + result_box.value);
      result_cur_money += 2500;
      result_cur_ep += result_box.value;
      result_ary.push(result_box);
    }
  }else if(box1_dv == "999") {
    var j=0;
    do {
      var result_box1 = box1_get();
      // console.log("["+j+"] result_box.value : " + result_box1.value);
      j++;
      result_cur_money += 2500;
      result_cur_ep += result_box1.value;
      result_ary.push(result_box1);
    } while(result_cur_ep < setep);
  }

  result.result_cur_money = result_cur_money;
  result.result_cur_ep = result_cur_ep;
  result.result_ary = result_ary;

  // console.log("result_ary : " + JSON.stringify(result).toString());

  res.json(result);
});

module.exports = router;

function box1_get() {
  var r_int = utils.getRandomInt(1,1000);
  var eq_val = [500,1000,3000,5000,10000,30000,50000,100000];


  if(r_int >= 1 && r_int <= 545) { //54.5%
    var obj = {};
    obj.value = eq_val[0];
    obj.per = "54.5%";
    obj.img_dv = "1";
    return obj;
  }else if(r_int >= 546 && r_int <= 762) { //21.7%
    var obj1 = {};
    obj1.value = eq_val[1];
    obj1.per = "21.7%";
    obj1.img_dv = "1";
    return obj1;
  }else if(r_int >= 763 && r_int <= 862) { //10%
    var obj2 = {};
    obj2.value = eq_val[2];
    obj2.per = "10.0%";
    obj2.img_dv = "1";
    return obj2;
  }else if(r_int >= 863 && r_int <= 942) { //8%
    var obj3 = {};
    obj3.value = eq_val[3];
    obj3.per = "8.0%";
    obj3.img_dv = "2";
    return obj3;
  }else if(r_int >= 943 && r_int <= 977) { //3.5%
    var obj4 = {};
    obj4.value = eq_val[4];
    obj4.per = "3.5%";
    obj4.img_dv = "3";
    return obj4;
  }else if(r_int >= 978 && r_int <= 990) { //1.3%
    var obj5 = {};
    obj5.value = eq_val[5];
    obj5.per = "1.3%";
    obj5.img_dv = "4";
    return obj5;
  }else if(r_int >= 991 && r_int <= 997) { //0.7%
    var obj6 = {};
    obj6.value = eq_val[6];
    obj6.per = "0.7%";
    obj6.img_dv = "5";
    return obj6;
  }else if(r_int >= 998 && r_int <= 1000) { //0.3%
    var obj7 = {};
    obj7.value = eq_val[7];
    obj7.per = "0.3%";
    obj7.img_dv = "6";
    return obj7;
  }
}
