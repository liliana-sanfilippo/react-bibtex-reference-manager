"use client";
import "./app.css"
import {Citations} from "@BibtexParser/Citations";
import {importAllBibFilesAsync, importBibFileAsync} from "../../src";
import {SupScrollLink} from "../../src/ScrollLink/ScrollLink";
import {LoremIpsum} from 'react-lorem-ipsum';
import {useEffect, useState} from "react";
import {bibts} from "./examplebib";

export default function App() {
    const [bibtexA, setTextsA] = useState<string[]>([]);
    const [bibtexB, setTextsB] = useState<string[]>([]);
    const [types, setTextsTypes] = useState<string[]>([]);
    useEffect(() => {
        importAllBibFilesAsync(["example1.bib", "example2.bib"])
            .then(setTextsB)
            .catch(console.error);
        importBibFileAsync("example2.bib")
            .then(setTextsA)
            .catch(console.error);
        importBibFileAsync("types.bib")
            .then(setTextsTypes)
            .catch(console.error);
    }, []);
    return (
    <div style={{alignContent:'center'}}>
        <div style={{maxWidth: "50%", margin: "auto"}}>
            <h1>Demo für Bibtex Citation Generator</h1>
            <p style={{color: "blue"}}> Please note that the scrolling to the reference only works if the content of the page is long enough to scroll.</p>
            <h2 style={{color: "blue"}}>Click on reference number to test.</h2>
            <LoremIpsum p={2} avgWordsPerSentence={6} avgSentencesPerParagraph={5} />
            <p style={{color: "blue"}}> Here we have something we want to reference with thr first reference.<SupScrollLink label="1"/></p>
            <LoremIpsum p={2} avgWordsPerSentence={6} avgSentencesPerParagraph={5} />
            <p style={{color: "blue"}}> Now the second reference! <SupScrollLink special="van2" label="1"/></p>
            <LoremIpsum p={2} avgWordsPerSentence={6} avgSentencesPerParagraph={5} />
            <h2 style={{color: "blue"}}>You can also have different citation styles!</h2>
            <h3>There standard is ACS:</h3>
            <Citations bibtexSources={bibtexA} />
            <h3>You can choose AMA:</h3>
            <Citations bibtexSources={bibtexA} style="ama" special="ama"/>
            <h3>And IEEE:</h3>
            <Citations bibtexSources={bibtexA} style="ieee" special="ieee"/>
            <h3>And NLM:</h3>
            <Citations bibtexSources={bibtexA} style="nlm" special="nlm"/>
            <h3>And Vancouver:</h3>
            <Citations bibtexSources={bibtexA} style="vancouver" special="vancouver"/>
            <b style={{color: "blue"}}>And it is possible to split your citation up for multiple sections without having to start over with the numbers
            <SupScrollLink label="3"/></b>
            <Citations bibtexSources={bibtexA} style="ama" special="ama2" start={2}/>
            <b style={{color: "blue"}}>Both with the same references (above) as well as different ones (below)</b>
            <Citations bibtexSources={[bibts]} style="acs" special="acs2" start={2}/>
            <h2>It is possible to cite articles:</h2>
            <Citations bibtexSources={bibtexB} style="ama" special="ama3" />
            <h2>And other sources:</h2>
            <h3>AMA</h3>
            <Citations bibtexSources={types} style="ama" special="ama4" />
            <h3>ACS</h3>
            <Citations bibtexSources={types} style="acs" special="acs3" />
            <Citations bibtexSources={types} style="ieee" special="ieee2" />
            <Citations bibtexSources={types} style="vancouver" special="van2" />
            <Citations bibtexSources={types} style="nlm" special="nlm2" />
            https://www.scribbr.co.uk
            https://library.saskhealthauthority.ca/citation/ama/theses
            https://owl.purdue.edu/owl/research_and_citation/ama_style/index.html
            https://www.bibguru.com/g/ama-software-manual-citation/
            https://www.bibguru.com/g/ama-software-citation/
        </div>
    </div>
  );
}
