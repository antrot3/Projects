<?php // Do not delete these lines
    if ('comments.php' == basename($_SERVER['SCRIPT_FILENAME']))
        die ('Please do not load this page directly. Thanks!');

        if (!empty($post->post_password)) { // if there's a password
            if ($_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password) {  // and it doesn't match the cookie
                ?>
                
                <p class="nocomments"><?php _e("This post is password protected. Enter the password to view comments."); ?><p>
                
                <?php
                return;
            }
        }

        /* This variable is for alternating comment background */
        $oddcomment = "graybox";
        $commentcount = 1;
?> 



<?php if ( !empty($post->post_password) && $_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password) : ?>
<p><?php _e('Enter your password to view comments.'); ?></p>
<?php return; endif; ?>

<h2 id="commentstitle"><?php comments_number(__('No Comments'), __('1 Comment'), __('% Comments')); ?>
<?php if ( comments_open() ) : ?>
	<a href="#postcomment" title="<?php _e("Leave a comment"); ?>">&raquo;</a>
<?php endif; ?>
</h2>

<?php if ( $comments ) : ?>
	<ul id="commentlist">
    <?php foreach ($comments as $comment) : ?>
        <?php if( $comment->comment_author == "ColdForged" ) { ?>
        <li class="cfpost" id="comment-<?php comment_ID()?>">
        <?php } else { ?>
        <li class="<?php echo $oddcomment; ?>" id="comment-<?php comment_ID() ?>">
        <?php }?>
            
            <div class="commentheader">
            	<cite><?php comment_author_link() ?></cite>
            	<span class="commentnumber">#<?php echo $commentcount++;?> - <a href="#comment-<?php comment_ID() ?>" title="">Comment permalink</a></span>
            	<small class="commentmetadata"><?php comment_date('F jS, Y') ?> at <?php comment_time() ?>
            	<?php if ($comment->comment_approved == '0') : ?>
            	<br /><em>This comment is awaiting moderation.</em>
            	<?php endif; ?></small>
            </div>
            <div class="commenttext">
            <?php comment_text() ?>
			</div>
        </li>
        
        <?php /* Changes every other comment to a different class */    
            if("graybox" == $oddcomment) {$oddcomment="lightgraybox";}
            else { $oddcomment="graybox"; }
        ?>

    <?php endforeach; /* end for each comment */ ?>

    </ul> 

<?php else : // If there are no comments yet ?>
	<p><?php _e('No comments yet.'); ?></p>
<?php endif; ?>

<?php if ( comments_open() ) : ?>
<h2 id="postcomment"><?php _e('Leave a comment'); ?></h2>

<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
<p><?php printf(__('You must be <a href="%s">logged in</a> to post a comment.'), get_option('siteurl')."/wp-login.php?redirect_to=".urlencode(get_permalink()));?></p>
<?php else : ?>

<form action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" id="commentform">

<?php if ( $user_ID ) : ?>

<p><?php printf(__('Logged in as %s.'), '<a href="'.get_option('siteurl').'/wp-admin/profile.php">'.$user_identity.'</a>'); ?> <a href="<?php echo get_option('siteurl'); ?>/wp-login.php?action=logout" title="<?php _e('Log out of this account') ?>"><?php _e('Logout &raquo;'); ?></a></p>

<?php else : ?>

<p><input type="text" name="author" id="author" value="<?php echo $comment_author; ?>" size="22" tabindex="1" />
<label for="author"><small><?php _e('Name'); ?> <?php if ($req) _e('(required)'); ?></small></label></p>

<p><input type="text" name="email" id="email" value="<?php echo $comment_author_email; ?>" size="22" tabindex="2" />
<label for="email"><small><?php _e('Mail (will not be published)');?> <?php if ($req) _e('(required)'); ?></small></label></p>

<p><input type="text" name="url" id="url" value="<?php echo $comment_author_url; ?>" size="22" tabindex="3" />
<label for="url"><small><?php _e('Website'); ?></small></label></p>

<?php endif; ?>

<!--<p><small><strong>XHTML:</strong> <?php printf(__('You can use these tags: %s'), allowed_tags()); ?></small></p>-->

<p><textarea name="comment" id="comment" cols="100%" rows="10" tabindex="4"></textarea></p>

<p><input name="submit" type="submit" id="submit" tabindex="5" value="<?php echo attribute_escape(__('Submit Comment')); ?>" />
<input type="hidden" name="comment_post_ID" value="<?php echo $id; ?>" />
</p>
<?php do_action('comment_form', $post->ID); ?>

</form>

<?php endif; // If registration required and not logged in ?>

<?php else : // Comments are closed ?>
<p><?php _e('Sorry, the comment form is closed at this time.'); ?></p>
<?php endif; ?>
