import {expect} from "chai";
import {getLinksAndIds} from "../src/CitationManager/getLinksAndIds.js";
import { JSDOM } from "jsdom";

describe('getLinksAndIds - Case 1: No document', () => {
    it('throws error', () => {
        delete (global as any).document;
        expect(() => getLinksAndIds()).to.throw(ReferenceError)
    })
})

describe('getLinksAndIds - Case 2: No citation links', () => {
    it('returns empty list', () => {
        let dom = new JSDOM(`
          <html>
            <body>
             
            </body>
          </html>`);
        (global as any).document = dom.window.document;
        const result = getLinksAndIds();
        expect(result).to.deep.equal([]);
    })
    after(() => {
        delete (global as any).document;
    });
})


describe('getLinksAndIds - Case 3.1: Multiple Citation Links - with duplicates', () => {
    it('returns empty list', () => {
        let dom = new JSDOM(`
          <html>
            <body>
              <a id="cite1" class="citationlink"></a>
              <a id="cite2" class="citationlink"></a>
              <a id="cite1" class="citationlink"></a>
            </body>
          </html>`);
        (global as any).document = dom.window.document;
        const result = getLinksAndIds();
        expect(result).to.deep.equal(["cite1", "cite2"]);
    })
    after(() => {
        delete (global as any).document;
    });
})



describe('getLinksAndIds - Case 3.2: Multiple Citation Links - no duplicates', () => {
    it('returns empty list', () => {
        let dom = new JSDOM(`
          <html>
            <body>
              <a id="cite1" class="citationlink"></a>
              <a id="cite2" class="citationlink"></a>
              <a id="cite3" class="citationlink"></a>
            </body>
          </html>`);
        (global as any).document = dom.window.document;
        const result = getLinksAndIds();
        expect(result).to.deep.equal(["cite1", "cite2", "cite3"]);
    })

    after(() => {
        delete (global as any).document;
    });
})


describe('getLinksAndIds - Case 3.2: Multiple Citation Links - no duplicates, different order', () => {
    it('returns empty list', () => {
        let dom = new JSDOM(`
          <html>
            <body>
              <a id="cite1" class="citationlink"></a>
              <a id="cite3" class="citationlink"></a>
              <a id="cite2" class="citationlink"></a>
            </body>
          </html>`);
        (global as any).document = dom.window.document;
        const result = getLinksAndIds();
        expect(result).to.deep.equal(["cite1", "cite3", "cite2"]);
    })

    after(() => {
        delete (global as any).document;
    });
})

