// Burk-a-Brac | Copyright (C) 2026 Patrick Burk
// Licensed under the GNU General Public License v3.0 or later.

const THUMBNAILS_IMAGE_CLASS = "bab-journal-thumbnail"; // MAYBE
const THUMBNAILS_STYLE_ID = "bab-journal-thumbnails-style"; // MAYBE

export function registerJournalSettings() {
    game.settings.register("burk-a-brac", "JournalsShowThumbnailsInSidebar", {
        config: true,
        default: true,
        hint: "BaB.JournalsShowThumbnailsInSidebar_Hint",
        name: "BaB.JournalsShowThumbnailsInSidebar",
        requiresReload: true, //MAYBE
        scope: "world",
        type: Boolean
    });
    game.settings.register("burk-a-brac", "JournalsThumbnailPlacement", {
        choices: {
            1: game.i18n.localize("BaB.BeforeJournalName"),
            2: game.i18n.localize("BaB.AfterJournalName"),
        },
        config: true,
        default: 1,
        hint: "BaB.JournalsThumbnailPlacement_Hint",
        name: "BaB.JournalsThumbnailPlacement",
        requiresReload: true, //MAYBE
        scope: "world",
        type: Number
    });
    game.settings.register("burk-a-brac", "JournalsSearchInTextPages", {
        config: true,
        default: true,
        hint: "BaB.JournalsAllowThumbnailsFromTextPages_Hint",
        name: "BaB.JournalsAllowThumbnailsFromTextPages",
        requiresReload: true, //MAYBE
        scope: "world",
        type: Boolean
    });
}

export function registerJournalHooks() {
    Hooks.on("renderJournalDirectory", applyJournalDirectoryTweaks);
    Hooks.on("createJournalEntryPage", refresh);
    Hooks.on("deleteJournalEntryPage", refresh);
    Hooks.on("updateJournalEntryPage", (_page, updates) => {
        if (["ownership", "sort", "src", "text", "type"].some((update) => update in updates)) {
            refresh();
        }
    });
}

function applyJournalDirectoryTweaks (_app, journalDirectory) {
    addThumbnails(journalDirectory);
}

function addThumbnails (journalDirectory) {
    if (!game.settings.get("burk-a-brac", "JournalsShowThumbnailsInSidebar")) {
        return;
    }
    const html = journalDirectory instanceof HTMLElement ? journalDirectory : journalDirectory[0]; // Unwraps jQuery.
    if (!document.getElementById(THUMBNAILS_STYLE_ID)) {
        const style = document.createElement("style");
        style.id = THUMBNAILS_STYLE_ID;
        style.textContent = ``; // TODO
        document.head.appendChild(style);
    }
    for (const li of html.querySelectorAll("li.directory-item")) {
        if (li.classList.contains("folder") || li.querySelector(`.${THUMBNAILS_IMAGE_CLASS}`)) {
            continue;
        }
        const dataset = li.dataset;
        const id = dataset.entryId ?? dataset.documentId;
        const journal = id ? game.journal.get(id) : (dataset.uuid ? fromUuidSync(dataset.uuid) : null);
        if (!journal) {
            continue;
        }
        const imageSource = findFirstImage(journal);
        if (!imageSource) {
            continue;
        }
        const image = document.createElement("img");
        image.alt = journal.name;
        image.className = THUMBNAILS_IMAGE_CLASS;
        image.decoding = "async";
        image.loading = "lazy";
        image.src = imageSource;
        if (game.settings.get("burk-a-brac", "JournalsThumbnailPlacement") === 1) {
            li.prepend(image);
        } else {
            li.append(image);
        }
        // MAYBE li.classList.add(THUMBNAILS_ITEM_CLASS);
    }
}

function findFirstImage (journal) {
    if (!journal?.pages?.size) {
        return null;
    }
    const pages = [...journal.pages].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
    for (const page of pages) {
        if (!page.testUserPermission(game.user, "OBSERVER")) {
            continue;
        }
        if (page.type === "image" && page.src) {
            return page.src;
        }
        if (game.settings.get("burk-a-brac", "JournalsSearchInTextPages") && page.type === "text") {
            const imageInText = findFirstImageFromHtml(page.text?.content);
            if (imageInText) {
                return imageInText;
            }
        }
    }
    return null;
}

function findFirstImageFromHtml (html) {
    if (!html) {
        return null;
    }
    const document = new DOMParser().parseFromString(html, "text/html");
    return document.querySelector("img[src]")?.getAttribute("src")?.trim() || null;
}

function refresh() {
    ui.journal?.render();
}