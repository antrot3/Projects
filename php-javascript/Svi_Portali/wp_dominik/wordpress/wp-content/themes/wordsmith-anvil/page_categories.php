<?php 
	/*
		Template Name: Categories Page
	*/
?>
<?php get_header(); the_post(); ?>
    <div id="main-content">
    	<div class="breadcrumbs">
			<?php
                if (function_exists('bcn_display')) {
                    bcn_display();
                }
            ?>
		</div><!--END breadcrumbs-->
    	<div id="product-groups">
		<?php
            $categoriesCF = get_post_meta($post->ID, "categories", true);
            // example value = "Website Traffic &amp; Marketing|35,Branding &amp; Magnetic Marketing|37"
            
            $allCategories = explode(",", $categoriesCF);
            // $allCategories[0] = "Website Traffic &amp; Marketing|35"
            // $allCategories[1] = "Branding &amp; Magnetic Marketing|37"
     
            foreach ($allCategories as $category) {
                $pieces = explode("|", $category);
                // $pieces[0] = "Website Traffic &amp; Marketing"
                // $pieces[1] = 35
                        
                $link = get_permalink($pieces[1]);
                echo "<div class='product-group clearit'>";
                echo "<h3><a href='$link'>" . $pieces[0] . "</a></h3>";
                query_posts("posts_per_page=-1&post_type=page&post_parent=$pieces[1]");
                while (have_posts()) : the_post(); ?>
                 <a href="<?php the_permalink(); ?>" class="product-jump" title="<?php echo "$" . get_post_meta($post->ID, "product_price", true); ?>" data-large="<?php get_post_meta($post->ID, "product_image", true); ?>">
                     <?php echo "<img src='" . get_post_meta($post->ID, "product_regular", true) . "' />"; ?>
                     <span class="product-title"><?php the_title(); ?></span>
                     <span class="product-code"><?php echo get_post_meta($post->ID, "product_code", true); ?></span>
                 </a>
                <?php endwhile; wp_reset_query();
                echo "</div><!--END product-group-->";
            };
        ?>
        </div> <!-- END product-groups-->  
	</div><!-- END of main-content -->
<?php get_sidebar(); ?>
    <div class="clearit">
    <?php get_template_part( 'inc/above', 'footer');          // Above Footer Include  - locate_template() will not work - (inc/above-footer.php) ?>
    </div><!-- END clearit (wrap for above footer)-->
<?php get_footer(); ?>