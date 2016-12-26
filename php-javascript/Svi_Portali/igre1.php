<?php


//get the q parameter from URL
ini_set('display_errors', 'off');
$q=$_GET["q"];

//find out which feed was selected
if($q=="1lvl")
  {
  $xml=("http://www.1evel.com/feed/");
 
  }
  elseif($q=="bug")
  {
  $xml=("http://www.bug.hr/rss/gmvijesti/");
  }
   elseif($q=="gamersport")
  {
  $xml=("http://playtoy2.tportal.hr/rss/gamereportrss.xml");
  }
     elseif($q=="hcl")
  {
  $xml=("http://pipes.yahoo.com/pipes/pipe.run?_id=df2f38822734acf19b530739e70d7398&_render=rss");
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
echo("<p><a href='"  . $channel_link
  . "'>" . $channel_title . "</a>");
echo("<br>");
echo($channel_desc . "</p>");

//get and output "<item>" elements
$x=$xmlDoc->getElementsByTagName('item');
for ($i=0; $i<=$x->length; $i++)
  {    
	  echo "<img src='ikone/igre.png' >" ;
  $item_title=$x->item($i)->getElementsByTagName('title')
  ->item(0)->childNodes->item(0)->nodeValue;
  $item_link=$x->item($i)->getElementsByTagName('link')
  ->item(0)->childNodes->item(0)->nodeValue;
  $item_desc=$x->item($i)->getElementsByTagName('description')
  ->item(0)->childNodes->item(0)->nodeValue;

  echo ("<p><a href='" . $item_link . "' target='_blank'>"
  . "'>" . $item_title . "</a>");
  echo ("<br>");echo ("<br>");echo ("<br>");echo ("<br>");
  echo ($item_desc . "</p>");
  }
?> 