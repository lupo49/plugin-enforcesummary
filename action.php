<?php
/**
 * DokuWiki Action component of EnforceSummary Plugin
 *
 * @license    GPL 2 (http://www.gnu.org/licenses/gpl.html)
 * @author  Matthias Schulte <dokuwiki@lupo49.de>
 * @author  Sahara Satoshi <sahara.satoshi@gmail.com>
 */
// must be run within Dokuwiki
if(!defined('DOKU_INC')) die();

if(!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN', DOKU_INC.'lib/plugins/');
require_once(DOKU_PLUGIN.'action.php');

/**
 * All DokuWiki plugins to interfere with the event system
 * need to inherit from this class
 */
class action_plugin_enforcesummary extends DokuWiki_Action_Plugin {

    // register hook
    function register(&$controller) {
        $controller->register_hook('DOKUWIKI_STARTED', 'AFTER', $this, '_exportToJSINFO');
        $controller->register_hook('HTML_EDITFORM_OUTPUT', 'BEFORE', $this, '_append_edit_guide');
    }

    /**
     * Exports configuration settings to $JSINFO
     */
    function _exportToJSINFO(&$event) {

        global $JSINFO;

        $JSINFO['plugin_enforcesummary'] = array(
                'enforce_summary'    => $this->getConf('enforce_summary'),
                'default_minoredit'  => $this->getConf('default_minoredit'),
                'enforce_preview'    => $this->getConf('enforce_preview'),
            );
    }

    /**
     * Append Edit Guide in the Edit Window (below save button)
     */
    function _append_edit_guide(&$event) {
        $pos = $event->data->findElementByAttribute('class', 'editButtons');
        if (!$pos) return; // no editButtons
        $guidance = $this->locale_xhtml('edit_guide');
        $html = '<div id="plugin_enforcesummary_wrapper">'.$guidance.'</div>';
        $event->data->addElement($html);
    }
}
