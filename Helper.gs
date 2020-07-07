//指定したキーから行インデックスを探すなければ-1を返す
function getKeyIndexRow(sheet, key, key_col) {
  var result = 1;
  var lastRow = sheet.getLastRow();
  //key_colで指定した列だけもってくる
  var values = sheet.getRange(1, key_col, lastRow, 1).getValues();
  for(var i=0;i<values.length;i++){
    if (values[i][0] === key){
      return result;
    }
    result++;
  }
  return -1;
}

//指定したキーから列インデックスを探すなければ-1を返す
function getKeyIndexColmun(sheet, key, key_row, compare_method=null){
  var result = 1;
  var lastCol = sheet.getLastColumn();
  //key_colで指定した列だけもってくる
  var values = sheet.getRange(key_row, 1, 1, lastCol).getValues();
  for(var i=0;i<lastCol;i++){
    var value = values[0][i];
    if (!value){
      result++;
      continue;
    }
    if(!compare_method){
      //比較関数が未定義なら単純な値比較
      if (value == key){
        return result;
      }
    }else{
      if (compare_method(value, key)){
        return result;
      }
    }
    result++;
  }
  return -1;
}

function is_same_date(date1, date2){
  try{
    var uxtime = (date1 - 25569) * 86400000;
    //日付セルから
    date1 = new Date(uxtime);
    if (date1.getFullYear() != date2.getFullYear()){
      return false;
    }
    if (date1.getMonth() != date2.getMonth()){
      return false;
    }
    if (date1.getDate() != date2.getDate()){
      return false;
    }
    return true;
  }
  catch(e){
    return false;
  }

}
