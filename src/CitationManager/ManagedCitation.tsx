import React, {useContext} from "react";
import {Citations} from "@liliana-sanfilippo/react-bibtex-reference-generator";
import {CitationContext} from "./CitationContext";
import {getWrongIDs} from "./getWrongIDs";



export const ManagedCitation: React.FC = () => {
    const context = useContext(CitationContext);
    if(context!.maintenanceMode){
        //TODO Citations auch maintenanceMode übergeben
        let citationLinksNum = context?.links.length;
        let citationNum = context?.citations.length;
        let feedback;
        if (context?.maintenanceMessages) {
            return (
                <>
                    <h2 style={{color: "red"}}>Maintenance Mode enabled</h2>
                    <Citations bibtexSources={context!.citations}></Citations>
                    Reason(s):
                    <ul>
                        {
                            context.maintenanceMessages.map((item, index) => (
                                <li key={index}>{item.message}</li>
                            ))
                        }
                    </ul>
                </>
            )
        } else {
            if( citationLinksNum == citationNum) {
                feedback = (<span style={{color: "green"}}>all referenced citations are in the bibtex you provided.</span>)
            } else {
                feedback = (<>
                        <span style={{color: "orange"}}>not all references you cited were in the bibtex you provided. Please check for typos in the IDs or missing bibtex.</span>
                        <p>The following ids are not in the bibtex:</p>
                        <ul>
                            {getWrongIDs(context!).map((entry) =>
                                <li style={{color: "orange"}}>{entry}</li>
                            )}
                        </ul>
                    </>
                )
            }
            return (
                <>
                    <h2 style={{color: "red"}}>Maintenance Mode enabled</h2>
                    <p>You cited {citationLinksNum} different IDs in your text and the reference list contains {citationNum} citations. This means {feedback}</p>
                    <Citations bibtexSources={context!.citations}></Citations>
                </>
            );
        }
    }
    return  <Citations bibtexSources={context!.citations}></Citations>
};