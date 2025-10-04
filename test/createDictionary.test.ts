import {expect} from "chai";
import {createDictionary} from "../src/CitationManager/createDictionary.js";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";

const entry: Entry[] = [{id: "key", type: "book", title: "title", day: "1"}]
const emptyMap = new Map<string, Entry>();
const fullMap = new Map<string, Entry>();
fullMap.set(entry[0].id, entry[0])

describe('createDictionary - Case 1: No bibtexSources given', () => {
    it('throws error', () => {
        // @ts-ignore
        expect(() => createDictionary()).to.throw(TypeError);
    })
})

describe('createDictionary - Case 2: Empty bibtexSources given', () => {
    it('returns empty dictionary', () => {
        expect(createDictionary([])).to.deep.equal(emptyMap);
    })
})

describe('createDictionary - Case 3: Return dictionary', () => {
    it('returns dictionary', () => {
        expect(createDictionary(entry)).to.deep.equal(fullMap);
    })
})