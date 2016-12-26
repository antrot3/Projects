<?php get_header(); ?>
    <div id="main-content" class="clearit">
	<?php 
		$adminemail = get_bloginfo('admin_email'); #the administrator email address, according to wordpress
		$website =  home_url();
		$websitename = get_bloginfo('name'); #sets the blog's name, according to wordpress
		$agent = $_SERVER["HTTP_USER_AGENT"];
		$ipaddress = $_SERVER["REMOTE_ADDR"];
		  if (!isset($_SERVER['HTTP_REFERER'])) { 
			#politely blames the user for all the problems they caused ?>
			 <div class="onefive simple-blue centerit">Whoa! What happened? It appears you tried going to </div>
			<?php #starts assembling an output paragraph 
			$casemessage = __('<div class="onefive simple-blue tac centerit"><em><strong>All is not lost!</strong></em></div><p>&nbsp;</p>','wordsmith-anvil');
		  } elseif (isset($_SERVER['HTTP_REFERER'])) {
			#this will help the user find what they want, and email you of a bad link ?>
			
			<div class="onefive simple-blue centerit">Uh oh! Whoops ... It looks like you clicked a link to  </div><!--END onefive simple-blue-->
           <?php #now the message says You clicked a link to...
				#setup a message to be sent to me
			$failuremess = "A user tried to go to $website" .$_SERVER['REQUEST_URI']." and received a 404 (page not found) error. " . "\n";
			$failuremess .= "It wasn't their fault, so try fixing it.  They came from ".$_SERVER['HTTP_REFERER'] . "\n";
			$failuremess .= "Here is a little more information about their system. ".$_SERVER['HTTP_USER_AGENT'] . "\n";
			$failuremess .= "And their IP Address is: ".$_SERVER['REMOTE_ADDR'];
			wp_mail($adminemail, "Bad Link To ".$_SERVER['REQUEST_URI'],
				$failuremess, "From: $websitename <noreply@$website>"); #email you about problem
		  }
		  #set a friendly message
		  
		  $notifymessage = __('<div class="onefive notice-blue tac centerit"><em><strong>An administrator has been emailed about this problem, too.</strong></em></div><p>&nbsp;</p>','wordsmith-anvil');
		  echo "<span><code><u>".$website.$_SERVER['REQUEST_URI']. "</u></code></span><p>&nbsp;</p>"; ?>		<div class="onefive simple-blue tac centerit"> ... and it doesn't exist. </div><p>&nbsp;</p>
		<?php echo $casemessage; ?>  
        <?php echo $notifymessage; ?>  
        <?php echo '<div class="onefive simple-red tac centerit">Your IP Address is:<br /> <strong>' . $ipaddress. '</strong></div><p>&nbsp;</p>' ; ?>
        <?php echo '<div class="onetwenty notice-red tac centerit">Your Browser &amp; Operating System Info:<br /> ' . $agent. '</div>' ; ?><p>&nbsp;</p><hr /><p>&nbsp;</p>
        <h6 class="simple-green centerit">You can click back and try again or search for what you're looking for:</h6>
       <p>&nbsp;</p>
       	<div class="squeezepad">
		  <div class="squeezepad"><?php get_search_form(); ?></div><!--END nested squeezepad-->
        </div><!--END squeezepad-->
          <p>&nbsp;</p>
           <h6 class="simple-green centerit">As another option, if you see a term below that relates to what you are looking for, feel free to click on that word or phrase to see more results:</h6>
          <p>&nbsp;</p>
           <div class="onefive tac aligncenter centerit"><?php wp_tag_cloud('smallest=12&largest=36&'); ?></div><!--END onefive tac-->
           <p>&nbsp;</p>
	</div><!-- END of main-content -->
<?php get_sidebar(); ?>
    <div class="clearit">
    <?php get_template_part( 'inc/above', 'footer');          // Above Footer Include  - locate_template() will not work - (inc/above-footer.php) ?>
    </div><!-- END clearit (wrap for above footer)-->
<?php get_footer(); ?>