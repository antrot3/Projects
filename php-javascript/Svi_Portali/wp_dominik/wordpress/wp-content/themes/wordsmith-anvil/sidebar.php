<?php
global $options;
$options = get_option('anvil_theme_options'); 
?>
<aside>
		<?php if ( isset($options['sidebar_search']) && ($options['sidebar_search']!='') ) { // do nothing ?>
        
        <?php } else { ?>
		<?php get_search_form(); ?>
        <?php } ?>
            
            <nav id="leftNav">
            	<?php anvil_primary_menu(); ?>
            </nav><!-- Removed javascript for menu and placed it in wsmain.js -->
            
        <?php if ( isset($options['latest_post']) && ($options['latest_post'] !='') ) { // do nothing ?>
        <?php } else { ?>
		
            <div class="aside-widget latest-post">
            	<h4>Posljednje vijesti</h4>
                <?php  
					// The Query
					$args = array(
					'posts_per_page' => 1,
					'post__not_in'  => get_option( 'sticky_posts' )
					); 
					$anvil_sb_query = new WP_Query( $args );
					
					// The Loop
					while ( $anvil_sb_query->have_posts() ) : $anvil_sb_query->the_post(); ?> 
                    
                <div class="date"><small><?php the_date(); ?></small></div>
                <a href="<?php the_permalink(); ?>"><?php if ( has_post_thumbnail($post->ID) ) the_post_thumbnail('small-thumb', array('class' => 'single-post-thm alignleft border') ); ?></a>
                <h5 class="lp"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                <?php 
				global $options; // the commented out line below will display a full post on any page that is not the home page or the front page ... if that is what you want, then uncomment that line and then comment out the line below it; otherwise, you will see an excerpt in this sidebar post on pages that are not the home page or front page
					//if( isset($options['show_excerpt']) && ($options['show_excerpt']!='') ) {
					if( ( isset($options['show_excerpt']) && ($options['show_excerpt']!='') ) || (!is_home() ) || (!is_front_page() ) ){
						the_excerpt(); 
					} else { the_content(); }  ?>
            
            </div><!-- END aside-widget latest-post -->
            <?php endwhile;
				// Reset Post Data
				wp_reset_postdata(); ?>
        <?php } ?>
        
            	<?php if ( isset($options['external_feed']) && ($options['external_feed']!="") && ($options['feed_name']!="") ) { ?>
                <div class="aside-widget publishing-news">
                            <h4><?php echo stripslashes($options['feed_name']); ?></h4>

                <?php get_template_part('feed'); 
					
			 if (function_exists('fetch_feed')) { 
					if ( isset($options['feed_url']) && ($options['feed_url']!="") ) { ?>
               	
                <?php $feed_link = $options['feed_url']; 
					$feed = fetch_feed($feed_link);					
					 
					$limit = $feed->get_item_quantity(2);
					$items = $feed->get_items(0, $limit);
					
				if (!$items) {
					echo "There is no feed available";
				} else {
					foreach ($items as $item) { ?>
                    
                    
                        <div class="sidebar-post">
                            <div class="date"><small><?php echo $item->get_date('F jS, Y'); ?></small></div>
                            <h5 class="pn"><a href="<?php echo $item->get_permalink(); ?>" target="_blank"><?php echo $item->get_title(); ?></a></h5>
                            <p><?php echo $item->get_content(); ?></p>
                        </div><!-- END sidebar post -->     
                        <?php }
						}
                   	} ?>   
            <?php } ?>
            
           
            </div><!-- END aside-widget publishing-news -->
             <?php } ?>
            <!-- Newsbox Aside Widget -->
			<?php if (isset($options['news']) && ($options['news'] !="")) : ?>
            	<div class="aside-widget newsletter">
              		<h4>Novosti</h4> 
                		<?php if (isset($options['news']) && ($options['news_feed'] !="")) { 
							echo '<div id="newsletter">';
								echo '<h5>' . stripslashes($options['news_feed']). '</h5>';
							 } else {  
                        	echo '<div id="newsletter">';
								echo '<h5>Sign up for the newsletter</h5>';
                             } ?>
           		  <form class="newsletter" action="http://feedburner.google.com/fb/a/mailverify?uri=<?php echo stripslashes($options['news_name']); ?>" method="post">	
                        		<!-- <div> -->
                            <input id="news-email" class="text" name="email" type="text" value="<?php _e('Email address', 'wordsmith-anvil') ?>" onfocus="if (this.value == '<?php _e('Email address', 'wordsmith-anvil') ?>') {this.value = '';}" onblur="if (this.value == '') {this.value = '<?php _e('Email address', 'wordsmith-anvil') ?>';}"  /><input id="news-button" type="image" src="<?php echo get_template_directory_uri(); ?>/images/newsletter-go.png" alt="<?php _e('Go', 'wordsmith-anvil') ?>" class="button" />
                          </form>  
                      <?php if (isset($options['news']) && ($options['news_feed'] !="")) { 
                      echo '</div><!-- END newsletter -->';
                       } else { 
                      echo '</div><!-- END newsletter -->';
                       } ?>
                       
                </div><!-- END aside-widget newsletter --> 
				<?php endif; ?>      
                
               <br class="clearboth" />
                   	
					<?php if (is_active_sidebar('sidebar-widgets'))  :
					echo "\n";
					dynamic_sidebar('sidebar-widgets');
					echo "\n";
						 else :
					endif; ?>
            
            <br class="clearboth" />
</aside>