"use client";
import "./app.css";
import {LoremIpsum} from 'react-lorem-ipsum';
import {bibts} from "./examplebib";
import {CitationlLink, CitationProvider, ManagedCitation} from "../../src";

export default function App() {
    return (
        <CitationProvider bibtex={bibts}>
    <div style={{alignContent:'center'}}>
        <div style={{maxWidth: "50%", margin: "auto"}}>
            <h1>Demo für Bibtex Citation Manager</h1>
            Here a link is set to a specific id<CitationlLink referenceID="hjhhbhjb"/>.
            Here a link is set to a specific id<CitationlLink referenceID="chen_noninvasively_2021"/>.
            Here a link is set to a specific id<CitationlLink referenceID="hjhhbhjb" />.
            <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={5} />
            <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={5} />
            <ManagedCitation/>
        </div>
    </div>
        </CitationProvider>
  );
}
