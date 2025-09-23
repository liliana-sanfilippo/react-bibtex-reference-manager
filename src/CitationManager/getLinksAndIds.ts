
export function getLinksAndIds(): string[]{
    let elements: string[] = new Array<string>;

    const link_html_elements = document.querySelectorAll<HTMLElement>('.citationlink');
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