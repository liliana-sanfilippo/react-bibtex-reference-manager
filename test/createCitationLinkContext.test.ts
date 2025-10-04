import {expect} from "chai";
import {JSDOM} from "jsdom";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import {CitationLinkContext} from "../src/CitationManager/CitationContext.js";
import {createCitationLinkContext} from "../src/CitationManager/createCitationLinkContext.js";


const entry: Entry[] = [{id: "cite1", type: "book", title: "title", day: "1"}]
const entries: Entry[] = [{id: "cite2", type: "article", title: "title2", day: "2"}, {id: "cite1", type: "book", title: "title", day: "1"}]
const correct_bibtex = [`@book{cite1, \t title={title}, \t day={1}}`]
const correct_bibtex_multi = [`@book{cite1, \t title={title}, \t day={1}} \t @article{cite2, \t title={title2}, \t day={2}}`]

describe('createCitationLinkContext - 1: link found but no references are provided.', () => {
    before(() => {
        let dom = new JSDOM(`
          <html>
            <body>
              <a id="wrong" class="citationlink"></a>
            </body>
          </html>`);
        (global as any).document = dom.window.document;
    });
    let context: CitationLinkContext = {links: ["wrong"], citations: [], maintenanceMode: false};
    it('returns context', () => {
        expect(createCitationLinkContext(correct_bibtex, false)).to.deep.equal(context)
    })
    after(() => {
        delete (global as any).document;
    });
})

describe('createCitationLinkContext - 2: links found and one reference is provided, the other is not cited.', () => {
    before(() => {
        let dom = new JSDOM(`
          <html>
            <body>
              <a id="none" class="citationlink"></a>
              <a id="cite1" class="citationlink"></a>
            </body>
          </html>`);
        (global as any).document = dom.window.document;
    });
    let context: CitationLinkContext = {links: ["none", "cite1"], citations: entry, maintenanceMode: false};
    it('returns context', () => {
        expect(createCitationLinkContext(correct_bibtex_multi, false)).to.deep.equal(context)
    })
    after(() => {
        delete (global as any).document;
    });
})

describe('createCitationLinkContext - 3: links found  references are provided', () => {
    before(() => {
        let dom = new JSDOM(`
          <html>
            <body>
              <a id="cite2" class="citationlink"></a>
              <a id="cite1" class="citationlink"></a>
            </body>
          </html>`);
        (global as any).document = dom.window.document;
    });
    let context: CitationLinkContext = {links: ["cite2", "cite1"], citations: entries, maintenanceMode: false};
    it('returns context', () => {
        expect(createCitationLinkContext(correct_bibtex_multi, false)).to.deep.equal(context)
    })
    after(() => {
        delete (global as any).document;
    });
})