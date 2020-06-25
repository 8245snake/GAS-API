//自分のカレンダー取得
var myCal = CalendarApp.getDefaultCalendar();

//指定日付のイベントを取得する
function getEvents(date){
  var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);
  
  var myEvents = myCal.getEvents(startDate, endDate);
  var events = [];
  
  myEvents.forEach(function(event){
    var data = new Object();
    data.title = event.getTitle();
    data.description = event.getDescription();
    data.start = Utilities.formatDate(event.getStartTime(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
    data.end = Utilities.formatDate(event.getEndTime(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
    data.location = event.getLocation();
    events.push(data);
  })

  return events;
}

// イベントを作成する
function createEvents(events){

  if(!events){
    return {"message":"eventsがありません"};
  }
  
  var respons = [];
  
  events.forEach(function(event){
    var title = event.title;
    var startTime = new Date(event.start);
    var endTime = new Date(event.end);
    var option = {
      description: event.description ,
      location: event.location
    };
    myCal.createEvent(title, startTime, endTime, option);
    respons.push({"title":title,
                  "start":Utilities.formatDate(startTime, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm'),
                  "end":Utilities.formatDate(endTime, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm'),
                  "description":option.description,
                  "location":option.location});
  })
  
  return respons;
}


function testCalender(){
  var d1 = new Date('');
  if (d1.toString() === "Invalid Date"){
    Logger.log("errro");
  }
  var d2 = new Date('2020-06-25');
  var d3 = new Date('2020/02/03');
  Logger.log(d3);
}













