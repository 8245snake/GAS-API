// GETリクエストに対する処理
function doGet(e) {
  request = e.parameter;
  //パラメータチェック
  if (!request.type){
    var response = new Object();
    response.message = 'typeがありません';
    var output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify(response));
    return output;
  }
  
  var response = new Object();
  //リクエストを振り分ける
  switch (request.type) {
  case 'events':
      var targetDate = new Date();
      if (request.day){
        tmpDate = new Date(request.day);
        if (tmpDate.toString() !== "Invalid Date"){
          targetDate = tmpDate;
        }
      }
    var response = {"events" : getEvents(targetDate)};
    break;
  case "tasks":
      if (request.method == "delete"){
        deleteTask(request.id);
        response = {"message" : request.id + "を完了済みにしました"};
      }else{
        response = {"tasks" : getMyTasks()};
      }
    break;
  case "bus":
    break;
  default:
    break;
  }
 
  // 結果の返却
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(response));

  return output;
}

// POSTリクエストに対する処理
function doPost(e) {
  // JSONをパース
  if (e == null || e.postData == null || e.postData.contents == null) {
    return;
  }
  
  var request = JSON.parse(e.postData.contents);
  //パラメータチェック
  if (!request.type){
    var response = new Object();
    response.message = 'typeがありません';
    var output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify(response));
    return output;
  }
  
  var response = new Object();
  
  //リクエストを振り分ける
  switch (request.type) {
  case 'events':
    response.events = createEvents(request.events);
    break;
  case "tasks":
    response.tasks = addMyTasks(request.tasks);
    break;
  case "bus":
    break;
  default:
    break;
  }

  //返却
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(response));

  return output;
  
}


// doGet をテストする
function testDoGet() {
  
  var data = {"type":"tasks", "method":"delete", "id":"I9F1PC88"};
  var e = new Object();
  e.parameter = data;
  doGet(e);
}


// doPost をテストする
function testDoPost() {
  
  var data = {"key":"value"};
  
  var postData = new Object();
  postData.type = "application/json";
  postData.contents = JSON.stringify(data);
  var e = new Object();
  e.postData = postData;

  doPost(e);
}