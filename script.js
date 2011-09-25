/*
    enforcesummary plugin for DokuWiki
    File: script.js
    http://www.dokuwiki.org/plugin:enforcesummary
*/

function installSummaryEnforcement() {
    var summary_input = document.getElementById('edit__summary'); // get summary field 
    
    if(summary_input !== null) {
        var minoredit_input = document.getElementById('minoredit');
 
        addEvent(summary_input, 'change', enforceSummary);
        addEvent(summary_input, 'keyup', enforceSummary);
        addEvent(minoredit_input, 'change', enforceSummary);
        addEvent(minoredit_input, 'click', enforceSummary);
        enforceSummary(); // summary may be there if we're previewing
    }
}
 
function enforceSummary() {
    var btn_save = document.getElementById('edbtn__save');
    var summary_input = document.getElementById('edit__summary');
    var minoredit_input = document.getElementById('minoredit');
    var disabled = false;
 
    // always require summary, even when minor change option is checked
    // if(summary_input.value.replace(/^\s+/,"") === '') 
    
    if(summary_input.value.replace(/^\s+/,"") === '' && !minoredit_input.checked) {
        disabled = true;
    }
 
    if(disabled != btn_save.disabled || btn_save.disabled === null) {
        btn_save.className = disabled ? 'button button_disabled' : 'button';
        btn_save.disabled = disabled;
    }
}
 
addInitEvent(function() {
        installSummaryEnforcement();
    });