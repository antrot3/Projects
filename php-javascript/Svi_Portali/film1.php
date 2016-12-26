<?php
//get the q parameter from URL
ini_set('display_errors', 'off');
$q=$_GET["q"];

//find out which feed was selected
if($q=="net")
  {
  $xml=("http://net.hr.feedsportal.com/c/33283/f/564933/index.rss");
  }
elseif($q=="filmskiportal")
  {
  $xml=("http://www.moj-film.hr/service/rss/novosti/");
  }
  elseif($q=="trenutnokina")
  {
  $xml=("http://www.moj-film.hr/service/rss/u_kinima/");
  }
 elseif($q=="uskorokina")
  {
  $xml=("http://www.moj-film.hr/service/rss/uskoro_u_kinima/");
  }
  elseif($q=="tportal")
  {
  $xml=("http://www.tportal.hr/rss/showtimerss.xml");
  }


$xmlDoc = new DOMDocument();
$xmlDoc->load($xml);

//get elements from "<channel>"
$channel=$xmlDoc->getElementsByTagName('channel')->item(0);
$channel_title = $channel->getElementsByTagName('title')
->item(0)->childNodes->item(0)->nodeValue;
$channel_link = $channel->getElementsByTagName('link')
->item(0)->childNodes->item(0)->nodeValue;
$channel_desc = $channel->getElementsByTagName('description')
->item(0)->childNodes->item(0)->nodeValue;

//output elements from "<channel>"
echo("<p><a href='" . $channel_link
  . "'>" . $channel_title . "</a>");
echo("<br>");
echo($channel_desc . "</p>");
echo("<br>");

//get and output "<item>" elements
$x=$xmlDoc->getElementsByTagName('item');
for ($i=0; $i<=$x->length; $i++)
  {
  echo "<img src='ikone/film.png' >" ;
  $item_title=$x->item($i)->getElementsByTagName('title')
  ->item(0)->childNodes->item(0)->nodeValue;
  $item_link=$x->item($i)->getElementsByTagName('link')
  ->item(0)->childNodes->item(0)->nodeValue;
  $item_desc=$x->item($i)->getElementsByTagName('description')
  ->item(0)->childNodes->item(0)->nodeValue; 

  echo ("<p><a href='" . $item_link . "' target='_blank'>"
  . "'>" . $item_title . "</a>");
  echo ("<br>"); echo ("<br>");echo ("<br>");
  echo "bar";
  echo ($item_desc . "</p>");
  }
?> 