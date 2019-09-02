const imgNameValidator = (unEditedString: string): string => {
    const badGuys: string[] = ['/', '\'', '"'];

    return unEditedString
        .split('')
        .reduce((acceptedChars: string[], currentChar: string): string[] =>
            badGuys.includes(currentChar)
                ? acceptedChars
                : [...acceptedChars, currentChar],
            [])
        .join()
        .replace(new RegExp(' ', 'g'), '-')
        .replace(new RegExp(',', 'g'), '')
        .trim()
        .toLowerCase();
};

export default imgNameValidator;