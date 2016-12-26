<?php 
	/*
		Template Name: Blog Home Page
	*/
?>
<?php get_header(); ?>
    <div id="main-content">
    	<h1 class="giant"><?php wp_title("",true); ?></h1>
        <?php global $more; $more = 0;  ?>
        <?php if (have_posts()) : ?>
        <?php $paged = (get_query_var('paged')) ? get_query_var('paged') : 1; query_posts("post_type=post&paged=$paged"); ?>
        <?php while (have_posts()) : the_post(); ?>
     	<?php 
			// The Query //Unfortunately, the commented out Query and Loop and wp_reset_postdata() do not work
			//$paged = (get_query_var('paged')) ? get_query_var('paged') : 1; 
			//$anvil_pb_query = new WP_Query("post_type=post&paged=$paged"); 
			
			// The Loop
			//while ($anvil_pb_query->have_posts() ) : $anvil_pb_query->the_post(); ?>

            <div <?php post_class() ?> id="post-<?php the_ID(); ?>">
            	<div class="the-post-title">    
                <h4><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></h4>
                </div><!-- END of posttitle -->
                <div class="metabar">    
                <?php get_template_part( 'inc/meta' );           // Meta Include File  - locate_template() will not work - (inc/meta.php) locate_template() does not work ?>
                </div><!-- END of metabar --> 
                <div class="entry postmain">
                	<a href="<?php the_permalink() ?>"><?php if ( has_post_thumbnail($post->ID) ) the_post_thumbnail('small-thumb', array('class' => 'single-post-thm alignleft border') ); ?></a>
                	<?php // Display an Excerpt
						global $options;
						if( isset($options['show_excerpt']) && ($options['show_excerpt']!='') )  {
						the_excerpt(); 
						} else {  the_content();  } ?>
                    <br class="clearboth" />
                </div><!-- END entry -->
                <div class="postmetadata">
                    <?php the_tags('Tags: ', ', ', '<br />'); ?>
                    Postavljeno <?php the_category(', ') ?> | 
                </div><!-- END postmetadata -->
            </div><!-- END post -->
        <?php endwhile; ?>
        <?php get_template_part( 'inc/nav' );           // Navigation bar (inc/nav.php) locate_template() does not work
			 ?>
        <?php else : ?>
            <p><?php _e( 'Whoops. Oddly enough, it appears there were no results found that match your request. Perhaps searching will help find a related post.', 'wordsmith-anvil' ); ?></p>
			<div class="aligncenter"><?php get_search_form(); ?></div><!--END search_form()-->
        <?php endif; ?>
        <?php wp_reset_query()
			// Reset Post Data
				//wp_reset_postdata(); ?>
        <?php if ( isset($options['display_coupon_blog']) && ($options['display_coupon_blog']!="") ) { ?>
          		<div class="coupon">
				<?php $post_id = 164; $coupon = get_post_meta($post_id, 'the-coupon', true);
					if($coupon) :
						echo $coupon; ?>
                    <?php endif; ?></div><!--END coupon-->
                    <?php } ?>
	</div><!-- END of main-content -->
<?php get_sidebar(); ?>
    <div class="clearit">
    <?php get_template_part( 'inc/above', 'footer');          // Above Footer Include  - locate_template() will not work - (inc/above-footer.php) ?>
    </div><!-- END clearit (wrap for above footer)-->
<?php get_footer(); ?>