/*
 * Copyright 2014 - 2019 Axel von Bertoldi
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to:
 * The Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor
 * Boston, MA 02110-1301, USA.
 */

'use strict';

const Main = imports.ui.main;
const Gettext = imports.gettext.domain("files-menu-2");
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Self = ExtensionUtils.getCurrentExtension();
const DirectoryMenu = Self.imports.directoryMenu.DirectoryMenu;

function init(extensionMeta) {
    log(`initializing ${Self.metadata.name} version ${Self.metadata.version}`);

    imports.gettext.bindtextdomain("files-menu-2", Self.dir.get_child("locale").get_path());
}

var indicator = null;

function enable() {
    log(`enabling ${Self.metadata.name} version ${Self.metadata.version}`);

    indicator = new DirectoryMenu();
    Main.panel.addToStatusArea('files-menu-2', indicator, 1, 'left');
}

function disable() {
    log(`disabling ${Self.metadata.name} version ${Self.metadata.version}`);
    
    if (indicator !== null) {
        indicator.destroy();
        indicator = null;
    }
}
