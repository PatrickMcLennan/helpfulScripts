"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileNameValidator = (unEditedString) => {
    const noEscapes = unEditedString.replace(new RegExp('/', 'g'), '-');
    const noBackSlash = noEscapes.replace(new RegExp('\\\\', 'g'), '-');
    const noSpaces = noBackSlash.replace(new RegExp(' ', 'g'), '-');
    return noSpaces.toLowerCase().trim();
};
exports.default = fileNameValidator;
