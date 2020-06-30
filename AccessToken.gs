// APIを公開するユーザを制限している場合でもアクセストークンがあれば通信できる
// "Authorization: Bearer 【アクセストークン】"のヘッダを追加すればよい


function getAccessToken() {
  Logger.log(DriveApp.getRootFolder().getName());
  Logger.log(ScriptApp.getOAuthToken());
}