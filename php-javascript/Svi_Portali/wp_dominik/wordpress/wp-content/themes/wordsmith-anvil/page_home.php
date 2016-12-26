<?php 
	/*
		Template Name: Site Front Page
	*/
?>
<?php get_header(); ?>
    <div id="main-content">
    <p id="intro">
        <?php $intro = get_post_meta($post->ID, 'front-page-intro-text', true);
			if($intro) :
               echo $intro; ?>
          	<?php endif; ?> </p>
     
      <?php $bqone = get_post_meta($post->ID, 'bq-line-one', true);
			if(isset($bqone) && $bqone !="") : ?>
            <div id="main-quote">      
      
            	<blockquote>
					<?php echo get_post_meta($post->ID, 'bq-line-one', true); ?><br />
                	<?php echo get_post_meta($post->ID, 'bq-line-two', true); ?><br />
                    <?php echo get_post_meta($post->ID, 'bq-line-three', true); ?><br />
                	<cite><?php $dash = '&nbsp;&mdash;&nbsp;'; echo $dash; echo get_post_meta($post->ID, 'bq-line-cite', true); ?></cite>
                </blockquote>
               
                <!-- display an image based on custom-field value, if it exists -->

				<?php $image = get_post_meta($post->ID, 'front-page-quote-image', true);
                    if($image) : ?>
                    <img src="<?php echo $image; ?>" alt="" />
                   <?php endif; ?>  
          
      <br class="clearboth" />
            </div><!--END main-quote -->
             <?php endif; ?>
                <h2 class="featuredh2"><?php echo get_post_meta($post->ID, 'featured-products-title', true); ?></h2>
                
                <ul id="featured-books">
                <?php 
					// The Query
					$anvil_ph_firstquery = new WP_Query("posts_per_page=1&post_type=page&post_parent=35"); 
                   // The Loop
                    	if ($anvil_ph_firstquery->have_posts() ) : $anvil_ph_firstquery->the_post(); ?>
                	<li>
                    	<h3><?php the_title(); ?></h3>
                      
                      	<p><?php echo get_post_meta($post->ID, 'product_description', true); ?></p>
                       		<?php $prodimage = get_post_meta($post->ID, 'product_regular', true);
                    		if($prodimage) : ?>   
                        <img src="<?php echo get_post_meta($post->ID, 'product_regular', true); ?>" alt="Image of <?php the_title(); ?>" />
                        <?php endif;?>
                        
                        <a href="<?php the_permalink(); ?>" class="view_btn"><?php echo get_post_meta($post->ID, 'view-btn-txt', true); ?></a>
                    </li>
                    <?php endif; 
					// Reset Post Data
					wp_reset_postdata();?>
                    
                    <?php
                    // The Query
                     $anvil_ph_secondquery = new WP_Query("posts_per_page=1&post_type=page&post_parent=37"); 
					 
					// The Loop
                    	if ($anvil_ph_secondquery->have_posts() ) : $anvil_ph_secondquery->the_post(); ?>
                  	<li>
                    	<h3><?php the_title(); ?></h3>
                      	<p><?php echo get_post_meta($post->ID, 'product_description', true); ?></p>
                        <?php $prodimage = get_post_meta($post->ID, 'product_regular', true);
                    		if($prodimage) : ?>
                        <img src="<?php echo get_post_meta($post->ID, 'product_regular', true); ?>" alt="Image of <?php the_title(); ?>" />
                        <?php endif; ?> 
                        
                        <a href="<?php the_permalink(); ?>" class="view_btn"><?php echo get_post_meta($post->ID, 'view-btn-txt', true); ?></a>
                    </li>
                    <?php endif; ?> 
                </ul>
                <?php
				// Reset Post Data
					wp_reset_postdata();?>
                <?php
				 //if (have_posts()) : while (have_posts()) : the_post(); 
				 			 
				/* Get only the first Sticky Post */
				//$sticky = get_option( 'sticky_posts' );
				//query_posts( 'p=' . $sticky[0] ); the_post(); 
				
				/* Or Get all Sticky Posts */
				//$sticky = get_option( 'sticky_posts' );
				
				/* Sort Sticky Posts, newest at the top */
				//rsort( $sticky ); the_post();
				
				// Or four step proces to get Latest 3 Sticky Posts - Thx to Justin Tadlock &amp; Nathan Rice
				/* Get all sticky posts */
				$sticky = get_option( 'sticky_posts' );
			
				/* Sort the stickies with the newest ones at the top */
				rsort( $sticky );
			
				/* Get the 3 newest stickies (change 3 for a different number) */
				$sticky = array_slice( $sticky, 0, 3 );
			
				/* Query sticky posts - removed caller_get_posts deprecated v 3.1 */
				query_posts( array( 'post__in' => $sticky, 'ignore_sticky_posts' => 1 ) ); 
				if (have_posts()) : while (have_posts()) : the_post(); 	?>
                <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            	<div class="the-post-title">    
                <h4><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h4>
                </div><!-- END of posttitle -->
                    <div class="metabar">    
                    <?php get_template_part( 'inc/meta' );           // Meta Include File  - locate_template() will not work - (inc/meta.php) ?>
                    </div><!-- END of metabar --> 
                        <div class="entry postmain sticky">
                            <a href="<?php the_permalink() ?>"><?php if ( has_post_thumbnail($post->ID) ) the_post_thumbnail('small-thumb', array('class' => 'single-post-thm alignleft border') ); ?></a>
                            <?php the_excerpt(); ?>
                        </div><!-- END entry -->
    					<p>&nbsp;</p>
            	</div><!-- END post -->
                <?php endwhile; ?>
                <?php endif; ?>
                <?php if ( isset($options['display_coupon']) && ($options['display_coupon']!="") ) { ?>
          		<div class="couponhome">
				<?php $post_id = 10; $coupon = get_post_meta($post_id, 'the-coupon', true);
					if($coupon) :
						echo $coupon; ?>
                    <?php endif; ?></div><!--END coupon-->
                    <?php } ?>
	</div><!-- END of main-content -->
<?php get_sidebar(); ?>
<?php get_footer(); ?>