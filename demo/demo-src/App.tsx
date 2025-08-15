import "./app.css"
import {BibtexParser} from "../../src/BibtexParser/Sources";
import {importAllBibFilesAsync} from "../../src";
import {SupScrollLink} from "../../src/ScrollLink/ScrollLink";
import { LoremIpsum } from 'react-lorem-ipsum';
import { useEffect, useState } from "react";
import {allNames} from "@liliana-sanfilippo/author-name-parser";


export default function App() {
    const [bibtex, setTexts] = useState<string[]>([]);
    useEffect(() => {
        const fileNames = ['example.bib'];
        importAllBibFilesAsync(fileNames)
            .then(setTexts)
            .catch(console.error);
    }, []);
    const names = "Reisman, John J. and Rivington-Law, Betty and Corey, Mary and Marcotte, Jacques and Wannamaker, Eleanor and Harcourt, Dawn and Levison, Henry";

    console.log(allNames(names))
    return (
    <div style={{alignContent:'center'}}>
        <div style={{maxWidth: "50%", margin: "auto"}}>
            <h1>Demo für BibtexViewer</h1>
            <p style={{color: "blue"}}> Please note that the scrolling to the reference only works if the content of the page is long enough to scroll.</p>
            <h2 style={{color: "blue"}}>Click on reference number to test.</h2>
            <LoremIpsum p={2} avgWordsPerSentence={6} avgSentencesPerParagraph={5} />
            <p style={{color: "blue"}}> Here we have something we want to reference with thr first reference.<SupScrollLink label="1"/></p>
            <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={5} />
            <p style={{color: "blue"}}> Now the second reference! <SupScrollLink label="2"/></p>
            <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={5} />
            <h2>References</h2>
            <BibtexParser bibtexSources={bibtex} />
        </div>
    </div>
  );
}
