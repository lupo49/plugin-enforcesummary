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
    var ckgd =  jQuery( "input[type=checkbox][name=ckgdoku]:checked" ).val();
    var ckge =  jQuery( "input[type=checkbox][name=ckgedit]:checked" ).val();
    var m_class;
    if(typeof ckgd == 'string' || typeof ckge == 'string') {       
        var $savebutton = jQuery("#save_button");
        m_class = "plugin_enforcesummary_missing";
    }
    else {
        $savebutton = jQuery("#edbtn__save");
        m_class = "missing"
        
    }
    var prv = jQuery('div.preview');

    // always require summary, even when minor change option is checked
    // if($summary.val().replace(/^\s+/,"") === '')

    summary_filled = !($summary.val().replace(/^\s+/,'') === '');
    minor_checked = $minoredit.is(':checked');

    // set summary inputbox attribute
    if (summary_filled) {
        $summary.removeClass(m_class);
    } else {
        $summary.addClass(m_class);
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
