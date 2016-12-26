<?php
//get the q parameter from URL
ini_set('display_errors', 'off');
$q=$_GET["q"];

//find out which feed was selected
if($q=="sds")
  {
  $xml=("http://www.slobodnadalmacija.hr/RssSport.aspx");
  }
elseif($q=="sportski net")
  {
  $xml=("http://feeds.net.hr/c/33283/f/578443/index.rss");
  }
  elseif($q=="hr sport")
  {
  $xml=("http://www.hrsport.net/rss/2/");
  }
 elseif($q=="24 sata sport")
  {
  $xml=("http://www.24sata.hr/feeds/sport.xml");
  }
   elseif($q=="tportal")
  {
  $xml=("http://www.tportal.hr/rss/sportrss.xml");
  }
  elseif($q=="index")
  {
  $xml=("http://www.index.hr/sport/rss.ashx");
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

//get and output "<item>" elements
$x=$xmlDoc->getElementsByTagName('item');
for ($i=0; $i<=$x->length; $i++)
  {
	  echo "<img src='ikone/sport.png' >" ;
  $item_title=$x->item($i)->getElementsByTagName('title')
  ->item(0)->childNodes->item(0)->nodeValue;
  $item_link=$x->item($i)->getElementsByTagName('link')
  ->item(0)->childNodes->item(0)->nodeValue;
  $item_desc=$x->item($i)->getElementsByTagName('description')
  ->item(0)->childNodes->item(0)->nodeValue;

  echo ("<p><a href='" . $item_link . "' target='_blank'>"
  . "'>" . $item_title . "</a>");
  echo ("<br>");
  echo ($item_desc . "</p>");
  }
?> 