wp = function() {

  var callback_get_itemdb_list = function(data,textStatus,xhr) {
    if(!myajax.ajaxStatus(xhr,textStatus)) return;

    $(".item_db_body .item_db_list").remove();
    var row_cnt = Number(data.length);
    var html = "";
    var view_data = [];
    var row_cnt_sum = 0;
    var row_cnt_sum2 = 0;
    var row_cnt_sum3 = 0;
    var kk = 0;
    var ad_num = 5;

    if(row_cnt > 0) {
      for(var j=0; j<row_cnt; j++) {
        if(j%ad_num=='0') row_cnt_sum++;
      }
      for(var jj=0; jj<row_cnt+row_cnt_sum; jj++) {
        if(jj%ad_num=='0') row_cnt_sum2++;
      }
      for(var jjj=0; jjj<row_cnt+row_cnt_sum2; jjj++) {
        if(jjj%ad_num=='0') row_cnt_sum3++;
      }
      for(var k=0; k<row_cnt+row_cnt_sum3; k++) {
        if(k%ad_num=='0') {
          view_data.push({});
        }else{
          view_data.push(data[kk]);
          kk++;
        }
      }

      html += "<div class='item_db_list'>";
      // console.log("view_data : " + view_data.length);
      $.each(view_data, function(i, obj) {
        if(i=='0' || i%6=='0'){
          html += "<div class='row'>";
        }

        if(i%ad_num=='0') {
          html += "<div class='col-lg-2 col-md-4 col-sm-6 portfolio-item'>";
          html += "<div class=\"card h-100\" style=\"border:0\">";
          if(!utils.isMobile()) html += "<p><div style=\"padding:4px;text-align:center;vertical-align:middle;\"><ins class=\"adsbygoogle\"     style=\"display:block\"     data-ad-client=\"ca-pub-1407998984163880\"     data-ad-slot=\"4971623568\"     data-ad-format=\"auto\"     data-full-width-responsive=\"true\"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div></p>";
          if(utils.isMobile()) html += "<p><div style=\"padding:4px;text-align:center;vertical-align:middle;\">  <ins class=\"adsbygoogle\"       style=\"display:inline-block;width:300px;height:250px\"       data-ad-client=\"ca-pub-1407998984163880\"       data-ad-slot=\"5633068152\"></ins>  <script>  (adsbygoogle = window.adsbygoogle || []).push({});  </script></div></p>";
          html += "</div></div>";
        }else{
          html += "<div class='col-lg-2 col-md-4 col-sm-6 portfolio-item'>";
          html += "<div class='card h-100'>";
          if(!utils.isMobile()) {
            html += "<a href='/wp/"+obj._id+"'><img class='card-img-top' src='"+obj.img_src+"' alt=''></a>";
          }
          html += "<div class='card-body'>";
          html += "<h5 class='card-title'>";
          if(!utils.isMobile()) {
            html += obj.item_nm;
          }
          if(utils.isMobile()) {
            html += "<a href='/wp/"+obj._id+"'><img src=\""+obj.img_src+"\" style=\"width:50px;height:50px;\" alt=\""+obj.item_nm+"\" />"+obj.item_nm+"</a>";
          }
          html += "</h5>";
          html += "<p class='card-text'>";
          html += "<div class=''>종류:"+obj.item_dtl_dv+"</div>";
          html += "<div class='dmg'>파괴력:"+obj.dmg+"</div>";
          html += "<div class='cri'>치명타:"+obj.cri+"</div>";
          html += "<div class='accuracy'>명중률:"+String(Math.floor(Number(obj.accuracy_rate)*100))+"%</div>";
          html += "<div class='point'>탄착률:"+String(Math.floor(Number(obj.point_rate)*100))+"%</div>";
          html += "<div class='speed'>속도:"+obj.speed+"회/1분</div>";
          html += "<div class=''>등급:"+obj.tier+"</div>";
          html += "<div class=''>크기:"+obj.size+"</div>";
          html += "<div style='margin-bottom:14px;'></div>";
          html += "<a class=\"btn btn-secondary\" href=\"/custom/"+obj._id+"\" type=\"button\">인벤공격력계산</a>";
          html += "<div style='margin-bottom:2px;'></div>";
          html += "<a class=\"btn btn-secondary\" href=\"/custom/cri/"+obj._id+"\" type=\"button\">인벤치명계산</a>";
          html += "<div style='margin-bottom:2px;'></div>";
          html += "<a class=\"btn btn-secondary\" href=\"/wp/"+obj._id+"\" type=\"button\">강화별상세보기</a>";
          html += "</p>";
          html += "</div>";
          html += "</div>";
          html += "</div>";
        }

        if(i==view_data.length-1||(String(i)!='0' && ((i+1)%6)=='0')) {
          html += "</div>";
        }
      });
      html += "</div>";
      $(".item_db_body").html(html);
    }

  };

  return {
    get_itemdb_list : function() {
      var url = "/wp/getitemdblist";
      var data = {};
      data.clyn = $("#in_clyn").val();
      data.illegal = $("#in_illegal").val();
      data.stype1 = $("#in_stype1").val();
      data.tier = $("#in_tier").val();
      data.ctype = $("#in_ctype").val();
      myajax.ajaxSubmit(url,data,callback_get_itemdb_list);
    }
  };
}();

boxsim = function() {
  var box1_open_init = function() {
    $("#box1_result_tab tbody").html("");
    $(".cur_money").html("0");
    $(".cur_ep").html("0");
    $(".EP500").text("0");
    $(".EP1000").text("0");
    $(".EP3000").text("0");
    $(".EP5000").text("0");
    $(".EP10000").text("0");
    $(".EP30000").text("0");
    $(".EP50000").text("0");
    $(".EP100000").text("0");
  };

  var htmldisp = function(i,money_sum,ep_sum,html,EP500,EP1000,EP3000,EP5000,EP10000,EP30000,EP50000,EP100000) {
    // console.log("i : " + i);
    $("#box1_result_tab tbody").append(html);
    $(".cur_money").html(utils.formatComma(String(money_sum)));
    $(".cur_ep").html(utils.formatComma(String(ep_sum)));

    $(".EP500").html(EP500 +"<br/>("+(EP500/(i+1)*100).toFixed(2) +"%)");
    $(".EP1000").html(EP1000 +"<br/>("+(EP1000/(i+1)*100).toFixed(2) +"%)");
    $(".EP3000").html(EP3000 +"<br/>("+(EP3000/(i+1)*100).toFixed(2) +"%)");
    $(".EP5000").html(EP5000 +"<br/>("+(EP5000/(i+1)*100).toFixed(2) +"%)");
    $(".EP10000").html(EP10000 +"<br/>("+(EP10000/(i+1)*100).toFixed(2) +"%)");
    $(".EP30000").html(EP30000 +"<br/>("+(EP30000/(i+1)*100).toFixed(2) +"%)");
    $(".EP50000").html(EP50000 +"<br/>("+(EP50000/(i+1)*100).toFixed(2) +"%)");
    $(".EP100000").html(EP100000 +"<br/>("+(EP100000/(i+1)*100).toFixed(2) +"%)");

    var offset = $(".EP500").offset();
    $('html, body').animate({scrollTop : offset.top-200}, 0);
  };

  var callback_box1_open = function(data,textStatus,xhr) {
    if(!myajax.ajaxStatus(xhr,textStatus)) return;

    var x = 0;
    var html = "";
    var money_sum = 0;
    var ep_sum = 0;
    var cur_money = Number(utils.replace($(".cur_money").text(),',',''));
    var cur_ep = Number(utils.replace($(".cur_ep").text(),',',''));
    var EP500 = 0;
    var EP1000 = 0;
    var EP3000 = 0;
    var EP5000 = 0;
    var EP10000 = 0;
    var EP30000 = 0;
    var EP50000 = 0;
    var EP100000 = 0;

    box1_open_init();

    $.each(data.result_ary, function(i, obj) {
      html = "";
      html += "<tr>";
      html += "<td style='text-align:center;'><img src='/resource/img/epcard"+obj.img_dv+".gif' style='width:40px;height:20px;margin-top:2px;margin-bottom:2px;' /></td>";
      html += "<td style='padding-left:10px;text-align:center;'><span id='result"+i+"'>"+String(obj.value) + " EP 카드 ("+(i+1)+"번째)</td>";
      html += "<td style='padding-left:10px;text-align:center;'>"+obj.per+" 확률</span></td>";
      html += "</tr>";
      ep_sum += obj.value;
      money_sum += 2500;
      if(obj.value == 500) EP500 += 1;
      if(obj.value == 1000) EP1000 += 1;
      if(obj.value == 3000) EP3000 += 1;
      if(obj.value == 5000) EP5000 += 1;
      if(obj.value == 10000) EP10000 += 1;
      if(obj.value == 30000) EP30000 += 1;
      if(obj.value == 50000) EP50000 += 1;
      if(obj.value == 100000) EP100000 += 1;

      if(i == '0') { //마지막
        money_sum += cur_money;
        ep_sum += cur_ep;
      }

      setTimeout(htmldisp,x,i,money_sum,ep_sum,html,EP500,EP1000,EP3000,EP5000,EP10000,EP30000,EP50000,EP100000);
      x += 50;
    });
  };
  return {
    box1_open : function() {
      var url = "/boxsim/box1open";
      var obj = {};
      obj.box1_dv = $("input:radio[name=box1_opt]:checked").val();
      obj.setep = $("#setep").val();
      obj.setep_num = $("#setep_num").val();
      myajax.ajaxSubmit(url,obj,callback_box1_open);
    },

    box1_open_init : function() {
      $("#box1_result_tab tbody").html("");
      $(".cur_money").html("0");
      $(".cur_ep").html("0");
      $(".EP500").text("0");
      $(".EP1000").text("0");
      $(".EP3000").text("0");
      $(".EP5000").text("0");
      $(".EP10000").text("0");
      $(".EP30000").text("0");
      $(".EP50000").text("0");
      $(".EP100000").text("0");
    }
  };
}();

ybsim = function() {
  var callback_getYbInfo = function(data,textStatus,xhr) {
    if(!myajax.ajaxStatus(xhr,textStatus)) return;

    $("#ybtab tbody tr").remove();
    var html = "";

    for(var i=0; i<5; i++) {
      html += "<tr>";
      html += "<td>"+data.upnm_list[(i*4)+0]+"</td>";
      html += "<td>"+data.upnm_list[(i*4)+1]+"</td>";
      html += "<td>"+data.upnm_list[(i*4)+2]+"</td>";
      html += "<td>"+data.upnm_list[(i*4)+3]+"</td>";
      html += "</tr><tr>";
      html += "<td><span class=\"dmg bold\">";
      html += "사공:"+utils.formatComma(String(data.dmg1_info_ary[(i*4)+0]))+"<br/>";
      html += "타공:"+utils.formatComma(String(data.dmg2_info_ary[(i*4)+0]))+"<br/>";
      html += "체력:"+utils.formatComma(String(data.con_info_ary[(i*4)+0]));
      html += "</span></td>";
      html += "<td><span class=\"dmg bold\">";
      html += "사공:"+utils.formatComma(String(data.dmg1_info_ary[(i*4)+1]))+"<br/>";
      html += "타공:"+utils.formatComma(String(data.dmg2_info_ary[(i*4)+1]))+"<br/>";
      html += "체력:"+utils.formatComma(String(data.con_info_ary[(i*4)+1]));
      html += "</span></td>";
      html += "<td><span class=\"dmg bold\">";
      html += "사공:"+utils.formatComma(String(data.dmg1_info_ary[(i*4)+2]))+"<br/>";
      html += "타공:"+utils.formatComma(String(data.dmg2_info_ary[(i*4)+2]))+"<br/>";
      html += "체력:"+utils.formatComma(String(data.con_info_ary[(i*4)+2]));
      html += "</span></td>";
      html += "<td><span class=\"dmg bold\">";
      html += "사공:"+utils.formatComma(String(data.dmg1_info_ary[(i*4)+3]))+"<br/>";
      html += "타공:"+utils.formatComma(String(data.dmg2_info_ary[(i*4)+3]))+"<br/>";
      html += "체력:"+utils.formatComma(String(data.con_info_ary[(i*4)+3]));
      html += "</span></td>";
      html += "</tr>";
    }

    $("#ybtab tbody").html(html);
  };
  return {
    getYbInfo : function() {
      var url = "/ybsim/getybinfo";
      var data = {};
      data.ybdmga = $("#ybDmgA").val();
      data.ybdmgb = $("#ybDmgB").val();
      data.ybcon = $("#ybCon").val();
      myajax.ajaxSubmit(url,data,callback_getYbInfo);
    }
  };
}();
