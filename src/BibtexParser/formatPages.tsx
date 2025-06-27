export function formatPages(pages: string | undefined): JSX.Element | null {
    // Check if pages is provided and is a non-empty string
    if (pages && pages.length > 0) {
        // Check for common page range separators
        const pageRangeRegex = /--|-|–|â€“/; // RegEx to match various dash types
        if (pageRangeRegex.test(pages)) {
            const pag = pages.split(pageRangeRegex).map(p => p.trim());
            const begin = pag[0];
            const end = pag[1];

            // Return formatted JSX
            return (
                <>
                    ,&nbsp;<span property="schema:pageBegin">{begin}</span>-<span property="schema:pageEnd">{end}</span>
            </>
        );
        } else if (/^\d+(-\d+)?$/.test(pages)) {
            // If pages is a single numeric range, return it directly
            return (
                <>
                    ,&nbsp;<span property="schema:pageBegin">{pages}</span>
                </>
        );
        } else {
            // Handle non-numeric page info
            console.warn(`Non-numeric page information detected ('${pages}'). Treating as missing.`);
            return null; // Return null if invalid
        }
    } else {
        console.warn("Sorry, no page information.");
        return null; // Return null if no page info
    }
}