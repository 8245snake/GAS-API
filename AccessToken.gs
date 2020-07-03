// APIを公開するユーザを制限している場合でもアクセストークンがあれば通信できる
// "Authorization: Bearer 【アクセストークン】"のヘッダを追加すればよい


function getAccessToken() {
  var name = DriveApp.getRootFolder().getName();
  return ScriptApp.getOAuthToken();
}

function update_file(){
  var FILE_ID = "1nAlU0culznO1vb8AAOEe3rxDtP2iWwTe";
  var file = DriveApp.getFileById(FILE_ID);
  var content = getAccessToken();
  file.setContent(content);
}