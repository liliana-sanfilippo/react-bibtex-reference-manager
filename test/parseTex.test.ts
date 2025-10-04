import {expect} from "chai";
import {parseTex} from "../src/CitationManager/parseTex.js";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import {BibTexParseError, NoEntriesFoundInBibtexString} from "../src/CitationManager/Errors.js";

const correct_bibtex = [`@book{key, \t title={title}, \t day={1}}`]
const faulty_bibtex = [`@book{key,  title={title}, day={1}}`]
const entry: Entry[] = [{id: "key", type: "book", title: "title", day: "1"}]

describe('parseTex - Case 1: No list of bibtex strings given', () => {
    it('throws error', () => {
        // @ts-ignore
        expect(() => parseTex(undefined)).to.throw(TypeError)
    })
})

describe('parseTex - Case 2.1: Error while parsing - 1', () => {
    it('returns undefined', () => {
        expect(() => parseTex(faulty_bibtex)).to.throw(BibTexParseError)
    })
})

describe('parseTex - Case 2.2: No Entries found - 1', () => {
    it('throws error', () => {
        expect(() => parseTex([])).to.throw(NoEntriesFoundInBibtexString)
    })
})

describe('parseTex - Case 2.2: No Entries found - 2', () => {
    it('throws error', () => {
        expect(() => parseTex([""])).to.throw(NoEntriesFoundInBibtexString)
    })
})

describe('parseTex - Case 2.2: No Entries found - 3', () => {
    it('returns undefined', () => {
        expect(() => parseTex(["dbvfjkhbvkjbvfjk"])).to.throw(NoEntriesFoundInBibtexString)
    })
})

describe('parseTex - Case 2.3:  Entries found', () => {
    it('returns entry', () => {
        expect(parseTex(correct_bibtex)).to.deep.equal(entry)
    })
})
