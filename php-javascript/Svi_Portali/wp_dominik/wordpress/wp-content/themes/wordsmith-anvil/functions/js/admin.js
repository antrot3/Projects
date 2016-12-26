jQuery(document).ready(function($) {
 // hides as soon as the DOM is ready
  $('div.section_body').hide();
 // shows on clicking the noted link
  $('h3').click(function() {
    $(this).toggleClass("open");
    $(this).next("div.section_body").slideToggle('1000');
    return false;
  });
});