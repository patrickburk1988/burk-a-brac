// Burk-a-Brac | Copyright (C) 2026 Patrick Burk
// Licensed under the GNU General Public License v3.0 or later.

import { registerJournalHooks, registerJournalSettings } from "./journal.mjs";
import { registerMapNoteHooks, registerMapNoteSettings } from "./map-note.mjs";

Hooks.once("init", function() {
    console.log("Burk-a-Brac | Module loading");
    registerSettings();
    registerHooks();
    console.log("Burk-a-Brac | Module loaded.");
});

function registerHooks() {
    registerJournalHooks();
    registerMapNoteHooks();
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
    registerJournalSettings();
    registerMapNoteSettings();
    // game.settings.register("burk-a-brac", "UIDefaultCursor", {
    //     config: true,
    //     default: "", // Is this required?
    //     hint: "BaB.UIDefaultCursor_Hint",
    //     name: "BaB.UIDefaultCursor",
    // //     onChange: () => {},
    // //     // requiresReload: true,
    // //     scope: "world",
    //     type: String
    // });
    // game.settings.register("burk-a-brac", "UIPointerCursor", {
    //     config: true,
    //     default: "",
    //     hint: "BaB.UIPointerCursor_Hint",
    //     name: "BaB.UIPointerCursor",
    // //     onChange: () => {},
    // //     // requiresReload: true,
    //     scope: "world",
    //     type: String
    // });
    // game.settings.register("burk-a-brac", "UIGrabCursor", {
    //     config: true,
    //     default: "",
    //     hint: "BaB.UIGrabCursor_Hint",
    //     name: "BaB.UIGrabCursor",
    // //     onChange: () => {},
    // //     // requiresReload: true,
    //     scope: "world",
    //     type: String
    // });
    // game.settings.register("burk-a-brac", "UITextCursor", {
    //     config: true,
    //     default: "",
    //     hint: "BaB.UITextCursor_Hint",
    //     name: "BaB.UITextCursor",
    // //     onChange: () => {},
    // //     // requiresReload: true,
    //     scope: "world",
    //     type: String
    // });
}