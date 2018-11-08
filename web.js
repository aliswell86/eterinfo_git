
var express = require('express');
var mtehodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var app = express();

// DB setting
// mongoose.connect(process.env.MONGO_DB); // 1
mongoose.connect("mongodb://my_mean:dlskdud1@ds121321.mlab.com:21321/my_mean");
var db = mongoose.connection;
db.once("open", function(){
 console.log("DB connected");
});
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

app.set("view engine", "ejs");
app.set("views", "/home/hosting_users/balkwang/apps/balkwang_eterinfo/views");

app.use(express.static(__dirname+"/public"));
app.use(mtehodOverride("_method"));
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3

// app.get('/',function (req,res) { // '/' 위치에 'get'요청을 받는 경우,
//  res.send('Hello World! ' + __dirname); // "Hello World!"를 보냅니다.
// });

//Routes
app.use("/", require("./routes/main"));
// app.use("/", require("./routes/wp"));
app.use("/main", require("./routes/main"));
app.use("/wp", require("./routes/wp"));
app.use("/custom", require("./routes/custom"));
app.use("/notice", require("./routes/notice"));
app.use("/boxsim", require("./routes/boxsim"));
app.use("/dmgsim", require("./routes/dmgsim"));
app.use("/ybsim", require("./routes/ybsim"));

app.listen(8001, function() {
  console.log("server on:"+__dirname);
});
