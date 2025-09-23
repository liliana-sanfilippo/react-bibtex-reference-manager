import {CitationLinkContext} from "./CitationContext";

export function getWrongIDs(context: CitationLinkContext): string[]{
    let wrong_elements: string[] = new Array<string>;

    context.links.forEach( (link) => {
        let isInList = false;
        context.citations.forEach( (entry) => {
                if (entry.id == link) {
                    isInList = true;
                }
            }
        )
        if (!isInList) {
            wrong_elements.push(link)
        }
        }
    )

    return (
       wrong_elements
    );

}