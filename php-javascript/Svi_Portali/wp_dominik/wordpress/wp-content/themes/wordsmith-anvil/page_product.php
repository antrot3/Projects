<?php 
	/*
		Template Name: Product Page
	*/
?>
<?php get_header(); ?>
    <div id="main-content">
    	<div class="breadcrumbs">
			<?php
                if (function_exists('bcn_display')) {
                    bcn_display();
                }
            ?>
		</div><!--END breadcrumbs-->
        <br class="clearboth" />
    	<h2 class="product-title"><?php the_title(); ?></h2>
	        <div class="product-info-box">
	            <img src='<?php echo get_post_meta($post->ID, 'product_large', true); ?>' />            
	            <ul>
                  <li><h5>Price</h5><?php echo get_post_meta($post->ID, 'price', true); ?></li>
	                <li><h5>Product Code</h5><?php echo get_post_meta($post->ID, 'product_code', true); ?></li>
	                <li><h5>Published</h5><?php echo get_post_meta($post->ID, 'published', true); ?></li>
                    <li><h5>Media Type: </h5><?php echo get_post_meta($post->ID, 'media_type', true); ?></li>
	                <li><a class="add_to_cart_btn" href="#">Add to Cart</a></li>
              </ul>
	        </div><!--END product info box-->

	        <p class="product-description"><?php echo get_post_meta($post->ID, 'product_description', true); ?></p>
            <h3>For more details, hover over the labels below ...</h3>
<ul class="details">
            	<li id="d1">&raquo; &raquo; <a href="#d1"><?php echo get_post_meta($post->ID, 'detail_label_one', true); ?> <i><?php echo get_post_meta($post->ID, 'details_one', true); ?></i></a></li>
                <li id="d2">&raquo; &raquo; <a href="#d2"><?php echo get_post_meta($post->ID, 'detail_label_two', true); ?> <i><?php echo get_post_meta($post->ID, 'details_two', true); ?></i></a></li>
                <li id="d3">&raquo; &raquo; <a href="#d3"><?php echo get_post_meta($post->ID, 'detail_label_three', true); ?> <i><?php echo get_post_meta($post->ID, 'details_three', true); ?></i></a></li>
                <li id="d4">&raquo; &raquo; <a href="#d4"><?php echo get_post_meta($post->ID, 'detail_label_four', true); ?> <i><?php echo get_post_meta($post->ID, 'details_four', true); ?></i></a></li>
                <li id="d5">&raquo; &raquo; <a href="#d5"><?php echo get_post_meta($post->ID, 'detail_label_five', true); ?> <i><?php echo get_post_meta($post->ID, 'details_five', true); ?></i></a></li>
                <li id="d6">&raquo; &raquo; <a href="#d6"><?php echo get_post_meta($post->ID, 'detail_label_image', true); ?><i><img class="aligncenter" src="<?php echo get_post_meta($post->ID, 'details_image', true); ?>" /></i></a></li>
            </ul>

	</div><!-- END of main-content -->
<?php get_sidebar(); ?>
    <div class="clearit">
    <?php get_template_part( 'inc/above', 'footer');          // Above Footer Include  - locate_template() will not work - (inc/above-footer.php) ?>
    </div><!-- END clearit (wrap for above footer)-->
<?php get_footer(); ?>