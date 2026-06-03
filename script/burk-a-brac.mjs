// Burk-a-Brac | Copyright (C) 2026 Patrick Burk
// Licensed under the GNU General Public License v3.0 or later.

import { applyMapNotesTweaks } from "./map-notes.mjs";

Hooks.once("init", function() {
    console.log("Burk-a-Brac | Module loading");
    registerSettings();
    registerHooks();
    console.log("Burk-a-Brac | Module loaded.");
});

function registerHooks() {
    Hooks.on("drawNote", applyMapNotesTweaks);
    Hooks.on("refreshNote", applyMapNotesTweaks);
}

function registerSettings() {
    game.settings.register("burk-a-brac", "MapNotesAlwaysDisplayTextLabels", {
        config: true,
        default: true,
        hint: "BaB.MapNotesAlwaysDisplayTextLabels_Hint",
        name: "BaB.MapNotesAlwaysDisplayTextLabels",
        requiresReload: true, //MAYBE
        scope: "world",
        type: Boolean
    });
    game.settings.register("burk-a-brac", "MapNotesUseImageAspectRatio", {
        config: true,
        default: true,
        hint: "BaB.MapNotesUseImageAspectRatio_Hint",
        name: "BaB.MapNotesUseImageAspectRatio",
        requiresReload: true, //MAYBE
        scope: "world",
        type: Boolean
    });
}