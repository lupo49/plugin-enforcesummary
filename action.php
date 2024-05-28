<?php

/**
 * DokuWiki Action component of EnforceSummary Plugin
 *
 * @license    GPL 2 (http://www.gnu.org/licenses/gpl.html)
 * @author  Matthias Schulte <dokuwiki@lupo49.de>
 * @author  Sahara Satoshi <sahara.satoshi@gmail.com>
 */
class action_plugin_enforcesummary extends DokuWiki_Action_Plugin
{
    // register hook
    public function register(Doku_Event_Handler $controller)
    {
        $controller->register_hook('DOKUWIKI_STARTED', 'AFTER', $this, 'exportToJSINFO');
        $controller->register_hook('FORM_EDIT_OUTPUT', 'BEFORE', $this, 'appendEditGuide');
        $controller->register_hook('HTML_EDITFORM_OUTPUT', 'BEFORE', $this, 'appendEditGuide');
    }

    /**
     * Exports configuration settings to $JSINFO
     */
    public function exportToJSINFO(Doku_Event $event)
    {
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
    public function appendEditGuide(Doku_Event $event)
    {
        $guidance = $this->locale_xhtml('edit_guide');
        $html = '<div id="plugin_enforcesummary_wrapper">'.$guidance.'</div>';

        $form =& $event->data;
        if (($event->name == 'FORM_EDIT_OUTPUT')
            && (($pos = $form->findPositionByAttribute('id', 'edit__minoredit')) !== false)
        ) {
            // applicable to development snapshot 2020-10-13 or later
            // insert the edit guide after minor edit checkbox
            $form->addHTML($html, ++$pos);

        } elseif ($event->name == 'HTML_EDITFORM_OUTPUT') {
            $pos = $form->findElementByAttribute('class', 'editButtons');
            if (!$pos) return; // no editButtons
            $form->addElement($html);
        }
    }
}
