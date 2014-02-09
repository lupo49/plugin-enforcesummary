/*
 enforcesummary plugin for DokuWiki
 File: script.js
 http://www.dokuwiki.org/plugin:enforcesummary
 */

jQuery(function() {
    var $summary = jQuery('#edit__summary'); // get summary field
    if (typeof $summary.val() == 'undefined') return;

    // Minor Edit by default
    // Parts copied from https://www.dokuwiki.org/tips:autominor
    var $minoredit = jQuery('#minoredit');
    var prv = jQuery('div.preview');
    if (!prv[0] && JSINFO.plugin_enforcesummary.default_minoredit)
        jQuery('#minoredit').prop('checked', true);

    // Parts copied from https://www.dokuwiki.org/tips:summary_enforcement
    $summary.keyup(enforceSummary).focus(enforceSummary);
    $minoredit.change(enforceSummary);
    enforceSummary(); // summary may be there if we're previewing
});

function enforceSummary() {
    var $summary = jQuery('#edit__summary'); // get summary field
    var $minoredit = jQuery('#minoredit');
    var $savebutton = jQuery("#edbtn__save");
    var prv = jQuery('div.preview');

    // always require summary, even when minor change option is checked
    // if($summary.val().replace(/^\s+/,"") === '')

    summary_filled = !($summary.val().replace(/^\s+/,'') === '');
    minor_checked = $minoredit.is(':checked');

    // set summary inputbox attribute
    if (summary_filled) {
        $summary.removeClass("missing");
    } else {
        $summary.addClass("missing");
    }

    // set save button attribute
    save_ready = false;
    if (JSINFO.plugin_enforcesummary.enforce_summary) {
        if (summary_filled || minor_checked) save_ready = true;
    }
    if (JSINFO.plugin_enforcesummary.enforce_preview) {
        if (prv[0]) { save_ready = true; }
        else { save_ready = false; }
    }
    if (save_ready) {
        $savebutton.removeAttr("disabled").css("color", "black");
    } else {
        $savebutton.attr("disabled", true).css("color", "#999");
    }
}
