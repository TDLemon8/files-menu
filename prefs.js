'use strict';

const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;

// It's common practice to keep GNOME API and JS imports in separate blocks
const ExtensionUtils = imports.misc.extensionUtils;
const Self = ExtensionUtils.getCurrentExtension();

var settings;

// Like `extension.js` this is used for any one-time setup like translations.
function init() {
    log(`initializing ${Self.metadata.name} Preferences`);
}

// This function is called when the preferences window is first created to build
// and return a Gtk widget. As an example we'll create and return a GtkLabel.
function buildPrefsWidget() {

    let gschema = Gio.SettingsSchemaSource.new_from_directory(
        Self.dir.get_child('schemas').get_path(),
        Gio.SettingsSchemaSource.get_default(),
        false
    );
    
    this.settings = new Gio.Settings({
        settings_schema: gschema.lookup('org.gnome.shell.extensions.files-menu-2', true)
    })
    
    // parent widget to return
    let prefsWidget = new Gtk.Grid({
        margin: 18,
        column_spacing: 12,
        row_spacing: 12,
        visible: true
    });
    
    let title = new Gtk.Label({
        // As described in "Extension Translations", the following template
        // lit
        // prefs.js:88: warning: RegExp literal terminated too early
        //label: `<b>${Self.metadata.name} Extension Preferences</b>`,
        label: '<b>' + Self.metadata.name + ' Extension Preferences</b>',
        halign: Gtk.Align.START,
        use_markup: true,
        visible: true
    });
    prefsWidget.attach(title, 0, 0, 2, 1);
    
    // Create a label & switch for `separate-files-folders`
    let toggleLabel = new Gtk.Label({
        label: 'Show folders before files:',
        halign: Gtk.Align.START,
        visible: true
    });
    prefsWidget.attach(toggleLabel, 0, 2, 1, 1);

    let toggle = new Gtk.Switch({
        active: this.settings.get_boolean ('separate-files-folders'),
        halign: Gtk.Align.END,
        visible: true
    });
    prefsWidget.attach(toggle, 1, 2, 1, 1);

    // Bind the switch to the `show-indicator` key
    this.settings.bind(
        'separate-files-folders',
        toggle,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    return prefsWidget;
}
