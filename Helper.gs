//指定したキーから行インデックスを探すなければ-1を返す
function getKeyIndexRow(sheet, key, key_col) {
  var result = 1;
  var lastRow = sheet.getLastRow();
  //key_colで指定した列だけもってくる
  var values = sheet.getRange(1, key_col, lastRow, 1).getValues();
  for(var i=0;i<values.length;i++){
    if (values[i][0] == key){
      return result;
    }
    result++;
  }
  return -1;
}

//指定したキーから列インデックスを探すなければ-1を返す
function getKeyIndexColmun(sheet, key, key_row) {
  var result = 1;
  var lastCol = sheet.getLastColumn();
  //key_colで指定した列だけもってくる
  var values = sheet.getRange(key_row, 1, 1, lastCol).getValues();
  for(var i=0;i<lastCol;i++){
    if (values[0][i] == key){
      return result;
    }
    result++;
  }
  return -1;
}
