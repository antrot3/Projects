<?php
global $options; $options = get_option('anvil_theme_options'); 
?>
<?php get_header(); the_post(); ?>
	<section class="tblock">
        <div class="the-post-title">
        	<h2 class="singleonly"><?php the_title(); ?></h2>
        </div><!-- END of post-title -->
        <div class="metabar">
          <div class="metabox-left"></div>
        <?php get_template_part( 'inc/meta' );           // Meta Include File  - locate_template() will not work - (inc/meta.php) ?>
        </div><!-- END of metabar -->
   </section>     
        <div id="main-content">
        <div class="breadcrumbs">
			<?php
                if (function_exists('bcn_display')) {
                    bcn_display();
                }
            ?>
		</div><!--END breadcrumbs-->
            <article>
                <div <?php post_class() ?> id="post-<?php the_ID(); ?>">
                    <div class="entry">
                    	<?php if ( has_post_thumbnail($post->ID) ) the_post_thumbnail('page-thumbnail', array('class' => 'single-post-thm alignright border') ); ?>

                        <?php the_content(); ?><br class="clearboth" />
                        <?php wp_link_pages(array(
											'before' => '<div class="navigation wp-pagenavi nextpage"><span>' . __('Pages:') . '</span>', 
											'after' => '</div>',
											'link_before' => '', 'link_after' => '',
											'next_or_number' => 'number', 
											'nextpagelink' => '<span>' . __('&raquo;') . '</span>',
											'previouspagelink' => '<span>' . __('&laquo;') . '</span>', 
											'pagelink' => '{ % }',
											'echo' => 1 )); ?>
                        <?php the_tags( 'Tags: ', ', ', ''); ?>
                    </div><!-- END entry -->
                    <?php edit_post_link('Edit this entry','','.'); ?>
                </div><!-- END post -->
            <?php comments_template(); ?>
          </article>
       </div><!-- END main content -->
	<?php get_sidebar(); ?>
    <div class="clearit">
    <?php get_template_part( 'inc/above', 'footer');          // Above Footer Include  - locate_template() will not work - (inc/above-footer.php) ?>
    </div><!-- END clearit (wrap for above footer)-->
<?php get_footer(); ?>