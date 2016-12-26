<?php
//get the q parameter from URL
ini_set('display_errors', 'off');
$q=$_GET["q"];

//find out which feed was selected
if($q=="net")
  {
  $xml=("http://feeds.net.hr/c/33283/f/564932/index.rss");
  }
elseif($q=="index")
  {
  $xml=("http://www.index.hr/najnovije/rss.ashx");
  }
  elseif($q=="slobodna dalmacija")
  {
  $xml=("http://www.slobodnadalmacija.hr/RssNajnovije.aspx");
  }
 elseif($q=="vecernji list")
  {
  $xml=("http://www.vecernji.hr/rss/");
  }
  elseif($q=="24 sata")
  {
  $xml=("http://www.24sata.hr/feeds/news.xml");
  }
    elseif($q=="tportal")
  {
  $xml=("http://www.tportal.hr/rss/vijestirss.xml");
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
  . "'>"  . $channel_title . "</a>"); 
echo("<br>");
echo($channel_desc . "</p>");
echo("<br>");
//get and output "<item>" elements
$x=$xmlDoc->getElementsByTagName('item'); 
for ($i=0; $i<=$x->length; $i++)
  {
  echo "<img src='ikone/v.png' >" ;
  $item_title=$x->item($i)->getElementsByTagName('title') 
  ->item(0)->childNodes->item(0)->nodeValue;
  $item_link=$x->item($i)->getElementsByTagName('link') 
  ->item(0)->childNodes->item(0)->nodeValue;
  $item_desc=$x->item($i)->getElementsByTagName('description') 
  ->item(0)->childNodes->item(0)->nodeValue;
 echo ("<br>");
  echo ("<p><a href='" . $item_link . "' target='_blank'>"
  . "'>" . $item_title . "</a>");
echo ("<br>");
echo "bar";
  
  
 
  echo ($item_desc . "</p>");
  }
?> 