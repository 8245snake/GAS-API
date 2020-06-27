const COL_ID = 1;
const COL_TITLE = 2;
const COL_DESCRIPTION = 3;
const COL_TIMELIMIT = 4;
const COL_COMPLETED = 5;

var sheetTask = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('TODO');

// タスクをすべて取得
function getMyTasks(omitCompleted=true) {
  var sheet = sheetTask;
  var tasks = [];
  const lastRow = sheet.getLastRow();
  for(var i = 2; i <= lastRow; i++) {
    //完了したタスクを無視するか
    completed = sheet.getRange(i, COL_COMPLETED).getValue();
    if (completed && omitCompleted){
      continue;
    }
    
    var task = new Object();
    task.id = sheet.getRange(i, COL_ID).getValue();
    task.title = sheet.getRange(i, COL_TITLE).getValue();
    task.description = sheet.getRange(i, COL_DESCRIPTION).getValue();
    task.timelimit = sheet.getRange(i, COL_TIMELIMIT).getValue();
    task.completed = completed;
    tasks.push(task);
  }
  return tasks;
}

// タスクを登録
function addMyTasks(tasks){
  var sheet = sheetTask;
  var reponse = [];
  const startRow = sheet.getLastRow() + 1;
  var row = startRow;
  tasks.forEach(function(task){
    var id = createUniqueID();
    task.id = id;
    sheet.getRange(row, COL_ID).setValue(task.id);
    sheet.getRange(row, COL_TITLE).setValue(task.title);
    sheet.getRange(row, COL_DESCRIPTION).setValue(task.description);
    sheet.getRange(row, COL_TIMELIMIT).setValue(task.timelimit);
    sheet.getRange(row, COL_COMPLETED).setValue(task.completed);
    row++;
    reponse.push(task);
  });
  return reponse;
}

// 一意なIDを作成
function createUniqueID(){
  // 生成する文字列の長さ
  var len = 8;
  // 生成する文字列に含める文字セット
  var chara = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var allLength = chara.length;
  var result = "";
  for(var i=0; i<len; i++){
    result += chara[Math.floor(Math.random() * allLength)];
  }
  return result;
}

//指定したIDのタスクを完了済みにする
function deleteTask(id){
  var rowIndex = getKeyIndexRow(sheetTask, id, COL_ID);
  if (rowIndex < 2){
    return;
  }
  sheetTask.getRange(rowIndex, COL_COMPLETED).setValue(true);
}


function TestgetKeyIndexRow(sheet, key, key_col) {
  var result = getKeyIndexRow(sheetTask, "I9F1PC88" ,1);
  Logger.log(result);
}
