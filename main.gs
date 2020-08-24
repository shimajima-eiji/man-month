/*
# 使い方
半角スペースを含む場合は呼び出し側で%20に置き換える

# 公開設定
## バージョン
13
## Execute the app as:
Me
## Who has access to the app:
Anyone, even anonymous
*/

function doGet( e )
{
  var p = e.parameter;

  // LanguageAppクラスを用いて翻訳を実行
  var translatedText = LanguageApp.translate( decodeURI( p.text ), p.source, p.target );
  // レスポンスボディの作成
  var body = ( translatedText )
    ? { code: 200, text: translatedText }
    : { code: 400, text: "Bad Request" }

  // レスポンスの作成
  var response = ContentService.createTextOutput();
  response.setMimeType( ContentService.MimeType.JSON );
  response.setContent( JSON.stringify( body ) );

  return response;
}
