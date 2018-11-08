
var utils = {};

utils.replace = function(str,findstr,replacestr) {
  if(!str) return str;
  return str.replace(new RegExp(findstr,"g"),replacestr);
};

utils.formatComma = function(str) {
  if(str.length == "0") return "0";

  str += "";
  var x = str.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

utils.createHiddenField = function(formNm, fieldId, value) {
  var formObj = document.forms[formNm];
  var fieldObj = document.createElement("input");
  fieldObj.type = "text";
  fieldObj.id = fieldId;
  fieldObj.value = value;
  formObj.appendChild(fieldObj);
};

/*
* wpDmg:무기데미지,
* stat:스탯(체력or기술),
* itemUpDmg:템공상합,
* rimitDmg:해방공,
* bYn:변이여부 (1=변이,3=노변이)
* dpDv:공앰여부 (1=노공앰,2=일반공앰,3=고급공앰)
*/
utils.getIvDmg = function(wpDmg,stat,itemUpDmg,rimitDmg,bYn,dpDv) {
  var default_inven_dmg = Math.floor(Number(wpDmg)+Number(wpDmg)*(Number(stat)/100)+Number(stat));
  var item_inven_dmg = (default_inven_dmg/100)*Number(itemUpDmg);
  inven_dmg = Math.floor((default_inven_dmg + item_inven_dmg)*(1+(Number(rimitDmg)/100))*(1+Number(bYn)/10)*(1+Number(dpDv)/10));
  return inven_dmg;
};

utils.getIvCri = function(wpCri,stat,itemUpCri) {
  var resultObj = {};
  var inven_cri = Math.floor(((wpCri/5) * ((stat/100)+1)) + itemUpCri + 1);
  if(inven_cri > 50) inven_cri = 50;
  var head_atk_rt = (3+(stat/50)).toFixed(2);

  resultObj.inven_cri = inven_cri;
  resultObj.head_atk_rt = head_atk_rt;
  return resultObj;
};

utils.isMobile = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

utils.setAdSense = function() {
  if(utils.isMobile()) {
    $(".adsense").html("<div style=\"padding:4px;text-align:center;vertical-align:middle;\">    <ins class=\"adsbygoogle\"       style=\"display:inline-block;width:300px;height:250px\"       data-ad-client=\"ca-pub-1407998984163880\"       data-ad-slot=\"5633068152\"></ins>  <script>  (adsbygoogle = window.adsbygoogle || []).push({});  </script></div>");
  }else{
    $(".adsense").html("<div style=\"padding:4px;text-align:center;vertical-align:middle;\"><ins class=\"adsbygoogle\"     style=\"display:block\"     data-ad-client=\"ca-pub-1407998984163880\"     data-ad-slot=\"4971623568\"     data-ad-format=\"auto\"     data-full-width-responsive=\"true\"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>");
  }
};
