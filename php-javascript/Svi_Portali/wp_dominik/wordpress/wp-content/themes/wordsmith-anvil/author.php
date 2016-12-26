<?php global $options; $options = get_option('anvil_theme_options'); ?>
<?php get_header(); ?>
	<div id="main-content">
	<?php
        /* Queue the first post, that way we know who
         * the author is when we try to get their name,
         * URL, description, avatar, etc.
         *
         * We reset this later so we can run the loop
         * properly with a call to rewind_posts().
         */
        if ( have_posts() )
            the_post();
    ?>

		<h2 class="page-title author"><?php printf( __( 'Author Archives: %s', 'wordsmith-anvil' ), "<span class='vcard'><a class='url fn n' href='" . get_author_posts_url( get_the_author_meta( 'ID' ) ) . "' title='" . esc_attr( get_the_author() ) . "' rel='me'>" . get_the_author() . "</a></span>" ); ?></h2>

			<?php
            // If a user has filled out their description, show a bio on their entries.
            if ( get_the_author_meta( 'description' ) ) : ?>
			<div id="entry-author-info" class=" class="clearit">
				<div id="author-avatar">
						<?php echo get_avatar( get_the_author_meta( 'user_email' ) ); ?>
				</div><!-- END author-avatar -->
				<div id="author-description">
					<h2><?php printf( __( 'A little author bio about %s', 'wordsmith-anvil' ), get_the_author() ); ?></h2>
						<?php the_author_meta( 'description' ); ?>
				</div><!-- END author-description	-->
			</div><!-- END entry-author-info -->
	<?php endif; ?>

	<?php
		/* Since we called the_post() above ...
		 * This is where we rewind_posts (run the loop back to the beginning) 
		 * se we can run the loop properly, in full.
		 */
		rewind_posts();
	?>
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div <?php post_class() ?> id="post-<?php the_ID(); ?>">
			<h2 class="post-title author"><a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
			<div class="metabar">    
                <?php get_template_part( 'inc/meta' );           // Meta Include File  - locate_template() will not work - (inc/meta.php) ?>
            </div><!-- END of metabar --> 
            <?php 
				if( has_post_thumbnail($post->ID) &&
				( /* $src, $width, $height */ $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'post-thumbnail' ) ) &&
				$image[1] < 600 ) {
				// Use as small thumbnail beow headline ?>
				<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute( ); ?>" rel="bookmark">
				<?php echo get_the_post_thumbnail( $post->ID, 'thumbnail', 'class=index-post-thm alignleft'); ?>
				</a>
			<?php } ?>
			<div class="author-text">
			<?php the_excerpt(); ?>
            </div><!--END author-text-->
		</div><!-- END posts -->
	<?php endwhile; ?>
	<?php get_template_part( 'inc/nav' );           // Navigation bar (inc/nav.php) ?>
	<?php else : ?>
		<p><?php _e( 'Whoops. Oddly enough, it appears there were no results found that match your request. Perhaps searching will help find a related post.', 'wordsmith-anvil' ); ?></p>
			<div class="aligncenter"><?php get_search_form(); ?></div><!--END search_form()-->

	<?php endif; ?>
    </div><!-- END main content -->
<?php get_sidebar(); ?>
    <div class="clearit">
    <?php get_template_part( 'inc/above', 'footer');          // Above Footer Include  - locate_template() will not work - (inc/above-footer.php) ?>
    </div><!-- END clearit (wrap for above footer)-->
<?php get_footer(); ?>