<meta name="robots" content="noindex, nofollow">
<?php
error_reporting(0);

/**
 * 테스트 중입니다 (미완성)
 */

$path = '';

if ($_GET["id"] === "1") { // <a href="download.php?id=1">t.pdf through download.php</a>

  $path = 'https://hellotblog.files.wordpress.com/2018/07/11.pdf';

  // $mime_type=mime_content_type($path);
  //
  // header("Pragma: public");
  // header("Expires: 0");
  // header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
  // header("Cache-Control: public");
  // header("Content-Description: File Transfer");
  // header("Content-Type: " . $mime_type);
  // header("Content-Length: " .(string)(filesize($path)) );
  // header('Content-Disposition: attachment; filename="'.basename($path).'"'); // filename=PHP다운로드예시파일입니다.pdf
  // header("Content-Transfer-Encoding: binary\n");
  // readfile($path);
  // exit();

  header("Content-disposition: attachment; filename=PHP다운로드예시파일입니다.pdf");
  header("Content-type: application/pdf");
  readfile( $path );
  exit();

} else {

  echo '<script>alert("다운로드 권한이 없습니다")</script>';
  // header( 'Location: ./../' );

}
