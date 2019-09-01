const fileNameValidator = (unEditedString: string): string => {
    const noEscapes: string = unEditedString.replace(new RegExp('/', 'g'), '-');
    const noBackSlash: string = noEscapes.replace(new RegExp('\\\\', 'g'), '-');
    const noSpaces: string = noBackSlash.replace(new RegExp(' ', 'g'), '-');

    return noSpaces.toLowerCase().trim();
};

export default fileNameValidator;