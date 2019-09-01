"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileNameValidator = (unEditedString) => {
    const badGuys = ['/', '\'', '"'];
    return unEditedString
        .split('')
        .reduce((acceptedChars, currentChar) => badGuys.includes(currentChar)
        ? acceptedChars
        : [...acceptedChars, currentChar], [])
        .join()
        .replace(new RegExp(' ', 'g'), '-')
        .replace(new RegExp(',', 'g'), '')
        .trim()
        .toLowerCase();
};
exports.default = fileNameValidator;
