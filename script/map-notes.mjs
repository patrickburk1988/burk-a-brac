// Burk-a-Brac | Copyright (C) 2026 Patrick Burk
// Licensed under the GNU General Public License v3.0 or later.

export function applyMapNotesTweaks (mapNote) {
    displayTextLabels(mapNote);
    useImageAspectRatio(mapNote);
}

function displayTextLabels (mapNote) {
    if (!mapNote || !game.settings.get("burk-a-brac", "MapNotesAlwaysDisplayTextLabels")) {
        return;
    }
    const textLabel = mapNote.tooltip;
    if (textLabel && (textLabel.text ?? "").trim()) {
        textLabel.visible = true;
    }
}

function useImageAspectRatio (mapNote) {
    if (!mapNote || !game.settings.get("burk-a-brac", "MapNotesUseImageAspectRatio")) {
        return;
    }
    const controlIcon = mapNote.controlIcon;
    const texture = controlIcon?.icon?.texture;
    if (controlIcon && texture?.valid && texture.width && texture.height) {
        const aspectRatio = texture.width / texture.height;
        if (aspectRatio >= 1) {
            controlIcon.scale.set(aspectRatio, 1);
        } else {
            controlIcon.scale.set(1, 1 / aspectRatio);
        }
    }
}