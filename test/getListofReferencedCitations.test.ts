import {expect} from "chai";
import {BibTexParseError, NoEntriesFoundInBibtexString} from "../src/CitationManager/Errors.js";
import {getListofReferencedCitations} from "../src/CitationManager/getListofReferencedCitations.js";
import {JSDOM} from "jsdom";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";


const entry: Entry[] = [{id: "cite1", type: "book", title: "title", day: "1"}]
const correct_bibtex = [`@book{cite1, \t title={title}, \t day={1}}`]
const faulty_bibtex = [`@book{cite1,  title={title}, day={1}}`]


describe('getListofReferencedCitations - Case 1: parse error got thrown in parseTex so getListofReferencedCitations' +
    ' cannot return anything', () => {
    it('throws error', () => {
        let dom = new JSDOM(`
          <html>
            <body>
             
            </body>
          </html>`);
        (global as any).document = dom.window.document;
        expect(() => getListofReferencedCitations([])).to.throw(NoEntriesFoundInBibtexString)
    })
    after(() => {
        delete (global as any).document;
    });
})


describe('getListofReferencedCitations - Case 4.1: No links found', () => {
    it('returns empty', () => {
        let dom = new JSDOM(`
          <html>
            <body>
             
            </body>
          </html>`);
        (global as any).document = dom.window.document;
        expect(getListofReferencedCitations(correct_bibtex)).to.deep.equal([])
    })

    after(() => {
        delete (global as any).document;
    });
})


describe('getListofReferencedCitations - Case 3: Error from createDictionary got passed on', () => {
    it('returns error', () => {
        expect(() => getListofReferencedCitations(faulty_bibtex)).to.throw(BibTexParseError)
    })
})

describe('getListofReferencedCitations - Case 2: Error from getLinksAndIds got passed on', () => {
    it('returns error', () => {
        expect(() => getListofReferencedCitations(correct_bibtex)).to.throw(ReferenceError)
    })
})


describe('getListofReferencedCitations - Case 5: link found and no errors from other functions', () => {
    before(() => {
        let dom = new JSDOM(`
          <html>
            <body>
              <a id="cite1" class="citationlink"></a>
            </body>
          </html>`);
        (global as any).document = dom.window.document;
    });
    it('returns entries', () => {
        expect(getListofReferencedCitations(correct_bibtex)).to.deep.equal(entry)
    })
    after(() => {
        delete (global as any).document;
    });
})


describe('getListofReferencedCitations - Case 4: link found but no references are provided.', () => {
    before(() => {
        let dom = new JSDOM(`
          <html>
            <body>
              <a id="cite1" class="citationlink"></a>
            </body>
          </html>`);
        (global as any).document = dom.window.document;
    });
    it('returns entries', () => {
        expect(() => getListofReferencedCitations([])).to.throw(NoEntriesFoundInBibtexString)
    })
    after(() => {
        delete (global as any).document;
    });
})

describe('getListofReferencedCitations - Case 4: link found and no errors from other functions but they do not match', () => {
    before(() => {
        let dom = new JSDOM(`
          <html>
            <body>
              <a id="cite2" class="citationlink"></a>
            </body>
          </html>`);
        (global as any).document = dom.window.document;
    });
    it('returns entries', () => {
        expect(getListofReferencedCitations(correct_bibtex)).to.deep.equal([])
    })
    after(() => {
        delete (global as any).document;
    });
})




