<?php
	/*
	This is the comment display template.
	*/
	?>
	<div id="comments">
	<?php if ( post_password_required() ) : ?>
				<p class="nopassword"><?php _e( 'This post is password protected. Enter the password to view any comments.', 'wordsmith-anvil' ); ?></p>
	<?php
		/* Stop the rest of comments.php from being processed,
		 * but don't kill the script entirely -- we still have
		 * to fully load the template.
		 */
		return;
	endif;
	if ( post_password_required() ) { echo'</div><!-- #comments -->'; } else {  } ?>

	<?php if ( have_comments() ) : ?>
			<h4 id="comments-title"><?php
			printf( _n( 'One Response to %2$s', '%1$s Responses to %2$s', get_comments_number(), 'wordsmith-anvil' ),
			number_format_i18n( get_comments_number() ), '<em>' . get_the_title() . '</em>' );
			?></h4>
       <?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // Are there comments to navigate through? ?>

	<div class="navigation">
		<div class="next-posts"> <?php previous_comments_link() ?> </div>
		<div class="prev-posts"> <?php next_comments_link() ?> </div>
	</div><!--END navigation (upper)-->
	<?php endif; // check for comment navigation ?>
	<ol class="commentlist">
		<?php wp_list_comments( array( 'callback' => 'anvil_comments' ) ); ?>
	</ol>
    
    <?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // Are there comments to navigate through? ?>

	<div class="navigation">
		<div class="next-posts"> <?php previous_comments_link() ?> </div>
		<div class="prev-posts"> <?php next_comments_link() ?> </div>
	</div><!--END navigation (lower)-->
    
    <?php endif; // check for comment navigation ?>
	
 <?php else : // this is displayed if there are no comments so far ?>

	<?php if ( comments_open() ) : ?>
		<!-- If comments are open, but there are no comments. -->
        <p class="simple-red tac squeezepad">budite prvi koji će ovo komentirati. <br /><br />
          <em>Bili bi smo vam zahvalni ako ostavite vaš komentar. </em></p>

	 <?php else : // comments are closed ?>
		<p class="nocomments"><?php (! is_page() ?  _e( 'Comments are closed.', 'wordsmith-anvil' ) : '' ); ?></p>
	<?php endif; ?>
<?php endif; ?>
<?php 

$fields =  array(
	'author' => '<div class="comment-form-info"><p class="comment-form-author">' . '<label for="author">' . __( 'Name' ) . '</label> ' . ( $req ? '<span class="required">*</span>' : '' ) .
	            '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" size="40" /></p>',
	'email'  => '<p class="comment-form-email"><label for="email">' . __( 'Email' ) . '</label> ' . ( $req ? '<span class="required">*</span>' : '' ) .
	            '<input id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="40"/></p>',
	'url'    => '<p class="comment-form-url"><label for="url">' . __( 'Website' ) . '</label>' .
	            '<input id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="40" /></p></div>',
);

comment_form(
array(
	'fields'               => apply_filters( 'comment_form_default_fields', $fields ),
	'comment_field'        => '<div class="comment-form-msg"><p class="comment-form-comment"><label for="comment">' . __( 'My Feedback is: ', 'wordsmith-anvil' ) . '</label><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea></p></div>',
	'comment_notes_before' => '<p class="comment-notes">' . __( 'Your email is safe here. It will not be published or shared.','wordsmith-anvil' ) . ( $req ? __( ' Required fields are marked <span class="required">*</span>', 'wordsmith-anvil' ) : '' ) . '</p>',
	'comment_notes_after'  => '<p class="form-allowed-tags">' . sprintf( __( 'You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes: %s', 'wordsmith-anvil' ), ' <br /><br /><code>' . allowed_tags() . '</code>' ) . '</p>',
	'id_submit'            => 'submit',
	'title_reply'          => __( 'Add Your Comment, Feedback or Opinion Here', 'wordsmith-anvil' ),
	'cancel_reply_link'    => __( '(Cancel Reply)', 'wordsmith-anvil' ),
	'label_submit'         => __( 'Add Comment', 'wordsmith-anvil'),
)
); 

?>
<div class="comments-rss"><?php post_comments_feed_link(__('Subscribe to comments', 'wordsmith-anvil')); // addedin 1.6.8 ?></div>
<br class="clearboth" />
</div><!-- #comments -->