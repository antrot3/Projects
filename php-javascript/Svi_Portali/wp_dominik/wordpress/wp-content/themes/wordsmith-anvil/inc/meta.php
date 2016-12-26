	<?php global $options;
	if ( isset($options['disablethemeta']) && ($options['disablethemeta']!="") )  { ?>
		<?php if(function_exists('the_views')) : ?>
            <div class="postviewsnometa">
            <?php the_views(); ?> 
            </div><!--END postviews-->
        <?php endif; ?>
	<?php } else { ?>
    <div class="meta">
	<em>Postavljeno na datum:</em> <span class="date"><?php the_time('F jS, Y') ?></span><em>od korisnika</em><span class="author"><?php the_author_posts_link(); ?> </span>
    <?php if(is_sticky()) {?>  &bull;  <?php _e('Sticky','wordsmith-anvil'); ?><?php } ?>
    </div><!-- END of meta -->
    

    <?php if(function_exists('the_views')) : ?>
    <div class="postviews">
	<?php the_views(); ?> 
    </div><!--END postviews-->
    <?php endif; ?>
    <?php } ?>
    <?php 
		$zero = (! is_page() ? '<div class="postnocomments">Comments Requested</div>' : '' );
	 	$one =  (! is_page() ? '<div class="postcomments">1</div>' : '' );
	 	$more = (! is_page() ? '<div class="postcomments">%</div>' : '' );
		$none = (! is_page() ? '<span class="commentsclosed">Comments Disabled</span>' : '' );
	?>
    <?php comments_popup_link( $zero , $one , $more , '' ,$none); ?>
    <?php //if (comments_open()) anvil_comments_number(); ?>
	<br class="clearboth" />