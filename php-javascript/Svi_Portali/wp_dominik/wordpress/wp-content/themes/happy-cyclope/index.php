<?php get_header(); ?>
	<div id="content">
		<?php get_sidebar(); ?>
		
		
		
		
		<div id="posts">
		<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post(); ?>
			<div class="post" id="post-<?php the_ID(); ?>">
				<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
				<div class="metadata"><?php the_time('F jS, Y') ?> by <?php the_author() ?> in <?php the_category(', ') ?></div>
				<div class="postcontent"><?php the_content('Read the rest of this entry &raquo;'); ?></div>
				<div class="commentlink"><?php comments_popup_link('No Comments, add yours', '1 Comment, add yours', '% Comments, add yours'); ?></div>
			</div>
		<?php endwhile; ?>
			<div class="navigation">
				<div class="alignleft"><?php next_posts_link('&laquo; Older Entries') ?></div>
				<div class="alignright"><?php previous_posts_link('Newer Entries &raquo;') ?></div>
			</div>
		<?php else : ?>
			<h2 class="center">Not Found</h2>
			<p class="center">Sorry, but you are looking for something that isn't here.</p>
		<?php include (TEMPLATEPATH . "/searchform.php"); ?>
		<?php endif; ?>
		</div>
	</div>
<?php get_footer(); ?>