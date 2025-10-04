
export function getLinksAndIds(): string[]{
    let elements: string[] = new Array<string>;
    /**
     * Case 1: No document => ReferenceError
     */
    if(!document) {
        throw new ReferenceError("No document");
    }
    const link_html_elements = document.querySelectorAll<HTMLElement>('.citationlink');

    /**
     * Case 2: No citation links found => return empty list
     */
    link_html_elements.forEach((element) => {
       if (!elements.includes(element.id)) {
           elements.push(element.id)
       }
    }
    )
    /**
     * Case 3: Citations links found and returned
     */
    return (
       elements
    );

}