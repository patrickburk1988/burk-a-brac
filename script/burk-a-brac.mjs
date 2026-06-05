// Burk-a-Brac | Copyright (C) 2026 Patrick Burk
// Licensed under the GNU General Public License v3.0 or later.

import { registerMapNotesSettings } from "./map-notes.mjs";
// FIX import { applyMapNotesTweaks, registerMapNotesSettings } from "./map-notes.mjs";

Hooks.once("init", function() {
    console.log("Burk-a-Brac | Module loading");
    registerSettings();
    registerHooks();
    console.log("Burk-a-Brac | Module loaded.");
});

function registerHooks() {
    // FIX
}

function registerSettings() {
    // game.settings.register("burk-a-brac", "", {
    //     choices: {},
    //     config: true,
    //     default: false,
    //     hint: "BaB._Hint",
    //     name: "BaB.",
    //     onChange: () => {},
    //     range: {},
    //     // requiresReload: true,
    //     scope: "world",
    //     type: Number|String|Boolean|Object|DataModel|DataField
    // });
    registerMapNotesSettings();
}