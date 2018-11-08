var my = {};
var ctype_arr = ["무기"];

var list_table_datatable = null;

my.get_parsing_list = function() {
  var url = "/admin/getparsinglist";
  var data = data_get_parsing_list();
  myajax.ajaxSubmit(url,data,callback_get_parsing_list);
};

var data_get_parsing_list = function() {
  var obj = {};
  obj.clyn = $("input:radio[name=clyn]:checked").val();
  obj.item_dv = $("input:radio[name=item_dv]:checked").val();
  obj.item_dv1 = $("input:radio[name=item_dv1]:checked").val();
  obj.item_dv2 = $("input:radio[name=item_dv2]:checked").val();
  obj.item_dv3 = $("input:radio[name=item_dv3]:checked").val();
  obj.item_dv4 = $("input:radio[name=item_dv4]:checked").val();
  return obj;
};

var callback_get_parsing_list = function(data,textStatus,xhr) {
  if(!myajax.ajaxStatus(xhr,textStatus)) return;

  $("#list_table tbody tr").remove();
  var row_cnt = data.length;
  var html = "";

  if(row_cnt > 0) {
    $.each(data, function(i, obj) {
      html += "<tr>";
      html += "<td>" + obj.item_nm + "</td>";
      html += "</tr>";
    });

    $("#list_table tbody").html(html);

  }else{

  }

};

my.get_excel_list = function(formObj) {
  formObj.action = "/admin/getexcellist";
  formObj.method = "POST";
  formObj.submit();
};

my.get_db_list = function() {
  var url = "/admin/getdblist_filter";
  var data = data_get_parsing_list();
  myajax.ajaxSubmit(url,data,callback_get_parsing_list);
};

my.get_db_list_all = function() {
  var url = "/admin/getdblist";
  var data = {};
  myajax.ajaxSubmit(url,data,callback_get_parsing_list);
};

var callback_get_parsing_list = function(data,textStatus,xhr) {
  if(!myajax.ajaxStatus(xhr,textStatus)) return;

  $("#list_table tbody tr").remove();
  var row_cnt = data.length;
  var html = "";

  if(row_cnt > 0) {
    $.each(data, function(i, obj) {
      var ctype_nm = "";
      var stype1_nm = "";
      var stype2_nm = "";

      if(obj.ctype == "1") {
        ctype_nm = "무기";
        if(obj.stype1 == "1") {
          stype1_nm = "원거리";
        }else{
          stype1_nm = "근거리";
        }
      }else{
        ctype_nm = "방어구";
        if(obj.stype1 == "1") stype1_nm = "상의";
        else if(obj.stype1 == "2") stype1_nm = "하의";
        else if(obj.stype1 == "3") stype1_nm = "코트";
        else if(obj.stype1 == "4") stype1_nm = "모자";
        else if(obj.stype1 == "5") stype1_nm = "신발";
        else if(obj.stype1 == "6") stype1_nm = "가발";
        else if(obj.stype1 == "7") stype1_nm = "방패";

        if(obj.stype2 == "1") stype2_nm = "남자";
        else stype2_nm = "여자";
      }
      html += "<tr>";
      html += "<td>"+obj.tier+"급</td>";
      html += "<td>"+obj.item_dtl_dv+"</td>";
      html += "<td><a href='/admin/"+obj._id+"'>"+obj.item_nm+"</a></td>";
      html += "<td>"+obj.dmg+"</td>";
      html += "<td>"+obj.cri+"</td>";
      html += "<td>"+obj.speed+"</td>";
      html += "<td>"+obj.clyn+"</td>";
      html += "<td>"+obj.img_src+"</td>";
      html += "</tr>";
    });

    $("#list_table tbody").html(html);

  }else{

  }
};

my.set_excel_update = function(formObj,flag) {
  $("#excel_flag").val(flag);
  formObj.action = "/admin/setexcelupdate";
  formObj.method = "POST";
  formObj.enctype="multipart/form-data";
  formObj.submit();
};

my.get_itemdb_list = function(formObj) {
  var url = "/wp/getitemdblist";
  var data = data_get_parsing_list(formObj);
  myajax.ajaxSubmit(url,data,callback_get_itemdb_list);
};

var callback_get_itemdb_list = function(data,textStatus,xhr) {
  if(!myajax.ajaxStatus(xhr,textStatus)) return;

  list_table_datatable.destroy();

  $("#list_table tbody tr").remove();
  var row_cnt = data.length;
  var html = "";
  var html_th = "";
  var sort_num = 0;
  var item_dv = $("input:radio[name=item_dv]:checked").val();

  //분류별 분기
  if(item_dv == "1") {
    $("#list_table thead tr").remove();
    html_th += "<tr>";
    html_th += "<th>이름</th>";
    html_th += "<th>등급</th>";
    html_th += "<th>분류</th>";
    html_th += "<th>크기</th>";
    html_th += "<th>공격</th>";
    html_th += "<th>치명</th>";
    html_th += "<th>속도</th>";
    html_th += "<th>가격</th>";
    html_th += "<th class='order'>순번</th>";
    html_th += "</tr>";
    $("#list_table thead").html(html_th);
  }else{
    $("#list_table thead tr").remove();
    html_th += "<tr>";
    html_th += "<th>이름</th>";
    html_th += "<th>등급</th>";
    html_th += "<th>분류</th>";
    html_th += "<th>방어</th>";
    html_th += "<th>공격</th>";
    html_th += "<th>크리</th>";
    html_th += "<th>체력</th>";
    html_th += "<th>가격</th>";
    html_th += "<th class='order'>순번</th>";
    html_th += "</tr>";
    $("#list_table thead").html(html_th);
  }

  if(row_cnt > 0) {
    $.each(data, function(i, obj) {

      html += "<tr>";

      //분류별 분기
      if(item_dv == "1") {
        html += "<td class='item_nm'><img src='"+obj.img_src+"' style='width:60px; height:50px;margin-right:4px;' alt='"+obj.item_nm+"'>" +
        "<a href='#' onclick='my.get_itemdb_dtl(\""+obj._id+"\");' >"+obj.item_nm+"</a></td>";
        html += "<td class='tier'>"+obj.tier+"급</td>";
        html += "<td class='item_dtl_dv'>"+obj.item_dtl_dv+"</td>";
        html += "<td class='size'>"+obj.size+"</td>";
        html += "<td class='right bold dmg'>"+obj.dmg+"</td>";
        html += "<td class='right bold cri'>"+obj.cri+"</td>";
        html += "<td class='right speed'>"+obj.speed+"</td>";
      }else if(item_dv == "2") {
        html += "<td class='item_nm'><img src='"+obj.img_src+"' style='width:60px; height:50px;margin-right:4px;' alt='"+obj.item_nm+"'>" +
        "<a href='#' onclick='my.get_itemdb_dtl(\""+obj._id+"\");' >"+obj.item_nm+"</a></td>";
        html += "<td class='tier'>"+obj.tier+"급</td>";
        html += "<td class='item_dtl_dv'>"+obj.item_dtl_dv+"</td>";
        html += "<td class='right bold dfs'>"+obj.dfs+"</td>";
        html += "<td class='right bold dmg'>"+obj.dmg+"</td>";
        html += "<td class='right bold cri'>"+obj.cri+"</td>";
        html += "<td class='right con'>"+obj.con+"</td>";
      }else{
        html += "<td class='item_nm'><img src='"+obj.img_src+"' style='width:60px; height:50px;margin-right:4px;' alt='"+obj.item_nm+"'>" +
        "<a href='#'>"+obj.item_nm+"</a></td>";
        html += "<td class='tier'>"+obj.tier+"급</td>";
        html += "<td class='item_dtl_dv'>"+obj.item_dtl_dv+"</td>";
        html += "<td class='right bold dfs'>"+obj.dfs+"</td>";
        html += "<td class='right bold dmg'>"+obj.dmg+"</td>";
        html += "<td class='right bold cri'>"+obj.cri+"</td>";
        html += "<td class='right con'>"+obj.con+"</td>";
      }
      html += "<td class='right cost'>"+utils.formatComma(obj.cost)+"</td>";
      html += "<td class='right order'>"+Number(obj.order)+"</td>";
      html += "</tr>";
    });

    $("#list_table tbody").html(html);
  }

  list_table_datatable = $("#list_table").DataTable({
      "responsive": true, "paging": false, "info": false, "searching": false, "order": [[8, "asc"]],
      "language": { "emptyTable": "아이템정보가 없습니다." }
  });

  $(".dataTables_filter label").html("<label><input type='search' class='form-control input-sm' placeholder='아이템 검색' aria-controls='list_table'></label>");

};

my.get_itemdb_dtl = function(id) {
  var url = "/wp/getitemdbdtl";
  var obj = {};
  obj._id = id;
  myajax.ajaxSubmit(url,obj,callback_get_itemdb_dtl);
};

var callback_get_itemdb_dtl = function(data,textStatus,xhr) {
  if(!myajax.ajaxStatus(xhr,textStatus)) return;

  $('#myModal').modal('show');
  $("#myModalLabel").html(
    "<img id='myModalImgSrc' src='"+data[0].img_src+"' style='width:50px; height:50px;margin-right:2px;' alt='"+data[0].item_nm+"'>"+data[0].item_nm+"</img>"
  );

  var html = "";
  var upnm = "";
  var clyn = $("input:radio[name=clyn]:checked").val();

  $.each(data[0].up_list, function(i, obj) {
    if(i>0&&i<10) {
      if(clyn=='Y') upnm = "[CL] +"+i;
      else upnm = "+"+i;
    }else if(i==10) {
      if(clyn=='Y') upnm = "[CL-MAX]";
      else upnm = "[MAX]";
    }else if(i>10){
      if(clyn=='Y') upnm = "[CL-MAX] +"+(i-10);
      else upnm = "[MAX] +"+(i-10);
    }
    html += "<tr>";
    html += "<td class=''>" + upnm + "</td>";
    html += "<td class=''><b>" + obj.up1 + "</b></td>";
    html += "<td class=''><b>" + obj.up2 + "</b></td>";
    html += "<td class=''><b>" + obj.up3 + "</b></td>";
    html += "<td class=''><b>" + obj.up4 + "</b></td>";
    html += "<td class=''><b>" + obj.up5 + "</b></td>";
    html += "<td class=''><b>" + obj.up6 + "</b></td>";
    html += "<td class='last'><b>" + obj.up7 + "</b></td>";
    html += "</tr>";
  });

  $("#up_list tbody").html(html);
};

my.set_update = function(formObj) {
  formObj.action = "/admin/set_update";
  formObj.method = "POST";
  formObj.submit();
};

my.select_item_init = function(ctype) {
  var url = "/custom/selectitem";
  var obj = data_get_sel_wp(ctype);
  myajax.ajaxSubmit(url,obj,callback_selectitem_init);
};

var callback_selectitem_init = function(data,textStatus,xhr) {
  if(!myajax.ajaxStatus(xhr,textStatus)) return;

  $('#selModal').modal('show');
  $("#selModalLabel").html(ctype_arr[Number(data.ctype)-1] + "선택");
  add_data(data);
};

my.select_item = function(ctype) {
  var url = "/custom/selectitem";
  var obj = data_get_sel_wp(ctype);
  myajax.ajaxSubmit(url,obj,callback_selectitem);
};

var callback_selectitem = function(data,textStatus,xhr) {
  if(!myajax.ajaxStatus(xhr,textStatus)) return;
  add_data(data);
};

var add_data = function(data) {
  var row_cnt = data.db_list.length;
  var html = "";

  $("#sel_list_table tbody tr").remove();

  if(row_cnt > 0) {
    $.each(data.db_list, function(i, obj) {
      html += "<tr onclick='my.sel_item(this);'>";
      html += "<td class='item_nm'><img src='"+obj.img_src+"' style='width:60px; height:50px;margin-right:4px;' alt='"+obj.item_nm+"'>" +
      "<a href='#'>"+obj.item_nm+"</a></td>";
      html += "<td class='right bold dmg'>"+obj.dmg+"</td>";
      html += "<td class='right bold cri'>"+obj.cri+"</td>";
      html += "<td class='right bold dfs'>"+obj.dfs+"</td>";
      html += "<td class='right bold con'>"+obj.con+"</td>";
      html += "<td style='display:none;'>"+obj.ctype+"</td>";
      html += "<td style='display:none;'>"+obj.img_src+"</td>";
      html += "<td style='display:none;'>"+obj._id+"</td>";
      html += "</tr>";
    });
  }else{
    html += "<tr>";
    html += "<td colspan='5'>아이템정보가 없습니다.</td>";
    html += "</tr>";
  }

  $("#sel_list_table tbody").html(html);
};

var data_get_sel_wp = function(ctype){
  var obj = {};
  if(ctype == "1") {
    obj.clyn = $("input:radio[name=clyn]:checked").val();
    obj.item_dv1 = $("input:radio[name=item_dv1]:checked").val();
    obj.up_dv = $("input:radio[name=up_dv]:checked").val();
    obj.max_dv = $("input:radio[name=max_dv]:checked").val();
    obj.item_dv4 = $("input:radio[name=item_dv4]:checked").val();
    obj.ctype = ctype;
  }

  return obj;
};

my.sel_item = function(row) {
  var td = $(row).children();
  var item_nm = td.eq(0).text();
  var dmg = td.eq(1).text();
  var cri = td.eq(2).text();
  var dfs = td.eq(3).text();
  var con = td.eq(4).text();
  var ctype = td.eq(5).text();
  var img = td.eq(6).text();
  var _id = td.eq(7).text();
  var up = $("input:radio[name=up_dv]:checked").val();
  var up_nm = "";
  if(up=="1") up_nm = "기본튜닝";
  else if(up=="2") up_nm = "초보튜닝";
  else if(up=="3") up_nm = "숙련튜닝";
  else if(up=="4") up_nm = "전문튜닝";
  else if(up=="5") up_nm = "장인의";
  else if(up=="6") up_nm = "명인의";
  else if(up=="7") up_nm = "O.T.";

  cri = Math.floor(Number(cri) * 1.5); //전문튜닝고정 (크리)

  my.popul_item_save(_id);

  // var item_nmZ = "";
  // var item_nmA = item_nm.substr(0,item_nm.indexOf("+")+2);
  // var item_nmB = item_nm.substr(item_nm.indexOf("+")+2);
  // if(item_nm.indexOf("+") > -1) {
  //   item_nmZ = item_nmA+"<br/>"+item_nmB;
  // }else{
  //   item_nmZ = item_nm;
  // }

  var item_dv1 = $("input:radio[name=item_dv1]:checked").val();
  var cri_up_nm = "칼날";
  if(item_dv1=="1"||item_dv1=="3") cri_up_nm = "총열";
  else if(item_dv1=="2"||item_dv1=="4") cri_up_nm = "칼날";


  var td_html = "";

  td_html += "<div style='float:left'><img src='"+img+"' style='width:100px; height:90px;margin-right:0px;' alt='"+item_nm+"'></div>";
  td_html += "<div style='float:right;text-align:right;'>";
  td_html += "<div style='text-align:right;height:150px;'>";
  td_html += "<div class='item_nm' style='margin-bottom:5px;'>"+item_nm+"</div> ";
  td_html += "<span class='dmg bold'>파괴력:<span class='dmg_num'>"+dmg+"</span>";
  td_html += "<span class='up_classes"+up+"'> ("+up_nm+" 몸체)</span></span><br/>";
  td_html += "<span class='cri bold'>치명:<span class='cri_num'>"+cri+"</span>";
  td_html += "<span class='up_classes4'> (전문튜닝 "+cri_up_nm+")</span></span><br/>";
  // td_html += "<button type='button' class='btn btn-warning btn-circle' onclick=my.cancel_item("+ctype+")><i class='fa fa-times'></i></button>";
  td_html += "<div style='float:right;margin-top:5px;'><button type='button' class='btn btn-primary btn-sm' onclick='my.select_item_init("+ctype+")'>"+ctype_arr[Number(ctype)-1]+"선택</button></div>";
  td_html += "</div>";
  td_html += "</div>";
  $(".ctype1_sel").html(td_html);

  $('#selModal').modal('hide');

  my.getspecinfo();
};

my.cancel_item = function(ctype) {
  var td_html = "";
  td_html += "<div style='float:right;'><button type='button' class='btn btn-primary btn-sm' onclick='my.select_item_init("+ctype+")'>"+ctype_arr[Number(ctype)-1]+"</button></div>";
  $(".ctype1_sel").html(td_html);

  my.getspecinfo();
};

my.next = function() {
  alert("준비중입니다.");
  location.history(-1);
};

// my.set_stat_info = function() {
//   $('#statModal').modal('show');
// };

my.get_spec_info = function() {
  if($(".ctype1_sel").text().trim() == "무기선택") {
    alert("무기먼저 선택해주세요.");
    return;
  }

  my.getspecinfo();

  // var url = "/custom/getspecinfo";
  // var obj = {};
  // obj.dmg = Number($(".dmg_num").text());
  // obj.stat = stat;
  // obj.item_dmg = 75; //test
  // myajax.ajaxSubmit(url,obj,callback_get_spec_info);
};

var callback_get_spec_info = function(data,textStatus,xhr) {
  if(!myajax.ajaxStatus(xhr,textStatus)) return;
};

my.getspecinfo = function() {
  var stat = 0;
  var inven_dmg = 0;
  var item_dmg = Number($("#dmg_item_up").val());
  var dmg = Number($(".dmg_num").text());
  var item_dv1 = $("input:radio[name=item_dv1]:checked").val();
  if(item_dv1=="1"||item_dv1=="3") stat = Number($("#ski_stat").val());
  else if(item_dv1=="2"||item_dv1=="4") stat = Number($("#con_stat").val());
  var statup1_dv = $("#statup1_dv").text();
  var statup2_dv = $("#statup2_dv").text();
  var statup1 = 1;
  var statup2 = 1;
  var statup3 = 1;
  if(statup1_dv == "일반") statup1 = 1;
  else if(statup1_dv == "변이") statup1 = 1.3;
  if(statup2_dv == "없음") statup2 = 1;
  else if(statup2_dv == "공앰") statup2 = 1.2;
  else if(statup2_dv == "고급공앰") statup2 = 1.3;
  statup3 += Number($("#limit_dmg").val())/100;

  var default_inven_dmg = Math.floor(dmg+dmg*(stat/100)+stat);
  var item_inven_dmg = (default_inven_dmg/100)*item_dmg;
  inven_dmg = Math.floor((default_inven_dmg + item_inven_dmg)*statup1*statup2*statup3);

  var inven_cri = 1;
  var wp_cri =Number($(".cri_num").text());
  var ski_stat = Number($("#ski_stat").val());
  var item_cri = Number($("#cri_item_up").val());
  inven_cri = Math.floor(((wp_cri/5) * ((ski_stat/100)+1)) + item_cri + 1);
  if(inven_cri > 50) inven_cri = 50;
  var head_atk_rt = 0;
  head_atk_rt = (3+(ski_stat/50)).toFixed(2);


  $("#inven_dmg").text(utils.formatComma(String(inven_dmg)));
  $("#inven_cri").text(String(inven_cri)+"("+String(head_atk_rt)+"배)");
  // return inven_dmg;
};

my.popul_item_save = function(id) {
  var url = "/custom/populitemsave";
  var obj = {};
  obj.id = id;
  myajax.ajaxSubmit(url,obj,callback_selectitem);
};

my.box1_open = function() {
  var url = "/boxsim/box1open";
  var obj = {};
  obj.box1_dv = $("input:radio[name=box1_opt]:checked").val();
  obj.setep = $("#setep").val();
  obj.setep_num = $("#setep_num").val();
  myajax.ajaxSubmit(url,obj,callback_box1_open);
};

var callback_box1_open = function(data,textStatus,xhr) {
  if(!myajax.ajaxStatus(xhr,textStatus)) return;

  var x = 0;
  var html = "";
  var money_sum = 0;
  var ep_sum = 0;
  var cur_money = Number(utils.replace($(".cur_monye").text(),',',''));
  var cur_ep = Number(utils.replace($(".cur_ep").text(),',',''));
  var EP500 = 0;
  var EP1000 = 0;
  var EP3000 = 0;
  var EP5000 = 0;
  var EP10000 = 0;
  var EP30000 = 0;
  var EP50000 = 0;
  var EP100000 = 0;

  my.box1_open_init();

  $.each(data.result_ary, function(i, obj) {
    html = "";
    html += "<tr>";
    html += "<td style='text-align:right;'><img src='/resource/img/epcard"+obj.img_dv+".gif' style='width:40px;height:20px;margin-top:2px;margin-bottom:2px;' /></td>";
    html += "<td style='padding-left:10px;text-align:left;'><span id='result"+i+"'>"+String(obj.value) + " EP 카드 ("+(i+1)+"번째)</td>";
    html += "<td style='padding-left:10px;text-align:left;'>"+obj.per+" 확률</span></td>";
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

  //고급EP개수 통계테이블추가하기.
};

var htmldisp = function(i,money_sum,ep_sum,html,EP500,EP1000,EP3000,EP5000,EP10000,EP30000,EP50000,EP100000) {
  console.log("i : " + i);
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

  var offset = $(".cur_money").offset();
  $('html, body').animate({scrollTop : offset.top}, 0);
};

my.box1_open_init = function() {
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

my.get_popul_item = function() {
  var url = "/main/getpopulitem";
  var data = {};
  myajax.ajaxSubmit(url,data,callback_getpopulitem);
};

var callback_getpopulitem = function(data,textStatus,xhr) {
  if(!myajax.ajaxStatus(xhr,textStatus)) return;

  console.log(data);
};
