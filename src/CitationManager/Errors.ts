export class NoEntriesFoundInBibtexString extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoEntriesFoundInBibtexString";
    }
}

export class BibTexParseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BibTexParseError";
    }
}
