export const goTo = (el: HTMLElement): void => {
    const elementRect = el.getBoundingClientRect();
    const elementTop = elementRect.top + window.pageYOffset;
    const viewportHeight = window.innerHeight;


    const middlePosition = elementTop - (viewportHeight / 5 - el.offsetHeight / 2);

    window.scrollTo({
        top: middlePosition,
        behavior: 'smooth'
    });
};
