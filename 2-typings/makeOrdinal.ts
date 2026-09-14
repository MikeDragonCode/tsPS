const IRREGULAR_SUFFIXES: Readonly<Record<string, string>> = {
    one: 'first',
    two: 'second',
    three: 'third',
    five: 'fifth',
    eight: 'eighth',
    nine: 'ninth',
    twelve: 'twelfth',
};

export default function makeOrdinal(words: string): string {
    for (const [ending, ordinalEnding] of Object.entries(IRREGULAR_SUFFIXES)) {
        if (words.endsWith(ending)) {
            return words.slice(0, -ending.length) + ordinalEnding;
        }
    }

    if (words.endsWith('y')) {
        return words.slice(0, -1) + 'ieth';
    }

    return words + 'th';
}
