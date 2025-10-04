import {BibTexParseError, NoEntriesFoundInBibtexString} from "./Errors";

export function isNoEntriesFoundInBibtexString(error: unknown): error is NoEntriesFoundInBibtexString {
    return error instanceof NoEntriesFoundInBibtexString;
}


export function isBibTexParseError(error: unknown): error is BibTexParseError {
    return error instanceof BibTexParseError;
}
