//日付の行
const ROW_DATE = 2;
//メンバーの列
const COL_MEMBER = 2;
//シート
var sheetSchedule = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('スケジュール');

//指定日付の全員のスケジュールを取得する
function getScheduleAllMember(date=null){
  var sheet = sheetSchedule;
  if(!date){
    date = new Date();
  }
  var target_date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  //日付の列を決定する
  const col_index_date = getKeyIndexColmun(sheet, target_date, ROW_DATE, is_same_date);
  const lastRow = sheet.getLastRow();
  //メンバの配列
  var members = sheet.getRange(1, COL_MEMBER, lastRow, 1).getValues();
  //予定の配列（背景色をとりたいのでvalueではなくrangeのまま）
  var items = sheet.getRange(1, col_index_date, lastRow, 1);
  var schedules = [];
  for(var i = 0; i <= lastRow; i++) {
    var schedule = new Object();
    if (!members[i]){
      continue;
    }
    var member = members[i][0];
    if (!member){
      continue;
    }
    if (member.trim() == ""){
      continue;
    }
    if (member.length > 15){
      continue;
    }
    schedule.name = member.replace('\n',' ');

    var cell = items.getCell(i+1, 1)
    if (cell){
      schedule.item = cell.getValue();
      schedule.color = cell.getBackground();
    }else{
      schedule.item = "";
      schedule.color = "#ffffff";
    }
    schedule.day = Utilities.formatDate(target_date, "JST", "yyyy/MM/dd");
    schedules.push(schedule);
  }
  return schedules;
}

function testgetScheduleAllMember(){
  Logger.log(getScheduleAllMember(null));
}
