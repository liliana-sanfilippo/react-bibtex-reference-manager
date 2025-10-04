"use client";
import "./app.css";
import {LoremIpsum} from 'react-lorem-ipsum';
import {bibts} from "./examplebib";
import {useEffect, useState} from "react";
import {CitationlLink, CitationProvider, ManagedCitation} from "@liliana-sanfilippo/react-bibtex-reference-manager";

export default function App() {
    const [data, setData] = useState<string[] | string>([]);
    useEffect(() => {
        setData(bibts);
    }, []);
    return (
        <CitationProvider bibtex={data}>
    <div style={{alignContent:'center'}}>
        <div style={{maxWidth: "50%", margin: "auto"}}>
            <h1>Demo für Bibtex Citation Manager</h1>
            Here a link is set to a specific id<CitationlLink referenceID="hjhhbhjb" />.
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
