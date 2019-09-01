"use strict";
exports.__esModule = true;
var fileNameValidator = function (unEditedString) {
    var noEscapes = unEditedString.replace(new RegExp('/', 'g'), '-');
    var noBackSlash = noEscapes.replace(new RegExp('\\', 'g'), '-');
    var noSpaces = noBackSlash.replace(new RegExp(' ', 'g'), '-');
    return noSpaces.toLowerCase();
};
exports["default"] = fileNameValidator;
