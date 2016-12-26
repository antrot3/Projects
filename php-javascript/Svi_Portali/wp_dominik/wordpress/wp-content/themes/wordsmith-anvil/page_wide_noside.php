<?php 
	/*
		Template Name: Wide Page No Sidebar
	*/
?>
<?php
global $options;
$options = get_option('anvil_theme_options'); 
?>
<?php get_header(); ?>
    <div id="wide-container">
    	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
			<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
			<div class="metabar">
				<?php get_template_part( 'inc/meta' );           // Meta Include File  - locate_template() will not work - (inc/meta.php) ?>
            </div><!-- END of metabar -->
			<div class="entry">
                <?php if ( has_post_thumbnail($post->ID) ) the_post_thumbnail('page-thumbnail', array('class' => 'page-thm alignright border') ); ?>
						<?php if ( isset($options['top_adcode']) && ($options['top_adcode']!="") ) { ?>
                        <div class="toppostadcode">
                        <?php echo(stripslashes ($options['top_adcode'])); ?>
                        </div><!--END top ad code-->
                        <?php } ?>
                        <?php the_content(); ?><br class="clearboth" />
						<?php if ( isset($options['bottom_adcode']) && ($options['bottom_adcode']!="") ) 						{ ?>
                       <div class="btmpostadcode"> 
                        <?php echo(stripslashes ($options['bottom_adcode'])); ?>
                       </div> <!--END bottom ad code-->
                        <?php } ?>
				<?php wp_link_pages(array(
											'before' => '<div class="navigation wp-pagenavi nextpage"><span>' . __('Pages:') . '</span>', 
											'after' => '</div>',
											'link_before' => '', 'link_after' => '',
											'next_or_number' => 'number', 
											'nextpagelink' => '<span>' . __('&raquo;') . '</span>',
											'previouspagelink' => '<span>' . __('&laquo;') . '</span>', 
											'pagelink' => '{ % }',
											'echo' => 1 )); ?>
			</div><!--END entry-->
			<?php edit_post_link('Edit this entry.', '<p>', '</p>'); ?>
		</div><!--END post-->
		<?php  comments_template(); //uncomment to add a comment template to this page ?>
		<?php endwhile; endif; ?>
	</div><!-- END of wide-container -->
    <div class="clearit">
    <?php get_template_part( 'inc/above', 'footer');          // Above Footer Include  - locate_template() will not work - (inc/above-footer.php) ?>
    </div><!-- END clearit (wrap for above footer)-->
<?php get_footer(); ?>