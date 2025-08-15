import "./app.css"
import {Citations} from "../../src/BibtexParser/Citations";
import {importAllBibFilesAsync, importBibFileAsync} from "../../src";
import {SupScrollLink} from "../../src/ScrollLink/ScrollLink";
import {LoremIpsum} from 'react-lorem-ipsum';
import {useEffect, useState} from "react";

export default function App() {
    const [bibtexA, setTextsA] = useState<string[]>([]);
    const [bibtexB, setTextsB] = useState<string[]>([]);
    useEffect(() => {
        importBibFileAsync("example1.bib")
            .then(setTextsA)
            .catch(console.error);
    }, []);
    useEffect(() => {
        importBibFileAsync("example2.bib")
            .then(setTextsB)
            .catch(console.error);
    }, []);
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
            <Citations bibtexSources={bibtexA} style="ama" special="ama2" start={3}/>
            <b style={{color: "blue"}}>Both with the same references (above) as well as different ones (below)</b>
            <Citations bibtexSources={bibtexB} style="ama" special="ama2" start={3}/>
            <h2>TODOs</h2>
            <ul>
                <li>Die Number wird nicht korrekt ausgelesen</li>
                <li>IEEE Year und date schema ding nicht gut </li>
                <li> Laak, Jeroen A. W. M. van derwird nicht richtig geparst</li>
                <li>Bei NLM fehlt Day und Schema nochmla prüfen </li>
                <li>Day wird gar nicht eingelesen beim Parser, urldate auch nicht</li>
                <li>Funktioniert mit Abstract nicht</li>
                <li>Pages Abstand verbessern / fixen</li>
                <li>Bis jetzt nur mit Nummerierungen</li>
                <li>CSE ist nicht drin </li>
                <li>Verschiedene ScrollLinks</li>
                <li>Evtl. verschiedene Zitierweisen (nicht nur Zahlen) anbieten</li>
                <li>Ich brauche doi Parsing</li>
                <li>Klappt nicht aus mehreren Dateien zu holen</li>
                <li>Scrollinks können nicht die verschiedenen special desc</li>

            </ul>
        </div>
    </div>
  );
}
