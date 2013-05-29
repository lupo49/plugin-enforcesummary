/*
 enforcesummary plugin for DokuWiki
 File: script.js
 http://www.dokuwiki.org/plugin:enforcesummary
 */

jQuery(function() {
    var $summary = jQuery('#edit__summary'); // get summary field
    var $minoredit = jQuery('#minoredit');

    // Parts copied from https://www.dokuwiki.org/tips:summary_enforcement
    $summary.keyup(enforceSummary).focus(enforceSummary);
    $minoredit.change(enforceSummary);
    enforceSummary(); // summary may be there if we're previewing
});

function enforceSummary() {
    var $summary = jQuery('#edit__summary'); // get summary field
    var $minoredit = jQuery('#minoredit');
    var $editbutton = jQuery("#edbtn__save");

    // always require summary, even when minor change option is checked
    // if($summary.val().replace(/^\s+/,"") === '')

    if(typeof $summary.val() != 'undefined') {
        if($summary.val().replace(/^\s+/,'') === '' && !$minoredit.is(':checked')) {
            $summary.addClass("missing");
            $editbutton.attr("disabled", true).css("color", "#999");
        } else {
            $summary.removeClass("missing");
            $editbutton.removeAttr("disabled").css("color", "black");
        }
    }
}

