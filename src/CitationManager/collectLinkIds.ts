
export function collectLinkIds(): string[]{
    let elements: string[] = new Array<string>;
    console.log("Mounting");

    const link_html_elements = document.querySelectorAll<HTMLElement>('.citationlink');
    console.log(link_html_elements.length)
    link_html_elements.forEach((element) => {
       if (!elements.includes(element.id)) {
           elements.push(element.id)
       }
        }
    )


    return (
       elements
    );

}