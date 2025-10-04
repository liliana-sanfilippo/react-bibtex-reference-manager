[![publish to github](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/actions/workflows/publish.yml/badge.svg)](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/actions/workflows/publish.yml)
[![publish to npm](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/actions/workflows/publish-npm.yml)
[![Deploy Demo](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/actions/workflows/demo.yml/badge.svg)](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/actions/workflows/demo.yml)

# React BibTeX Reference Manager
React Component for Managing references. Automatically generates Citations based on the ids used with Citation Links in the text of a page. 
Wiki with manual in progress. 

[Boring Demo with nothig to see really](https://liliana-sanfilippo.github.io/react-bibtex-reference-manager/)

[Manual specifically for iGEM Wikis](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/wiki/Manual-for-iGEM-Wikis)

[Release Notes](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/wiki/Reselase-Notes)

[Q & A](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/wiki/Questions-and-answers)

[Troubleshooting](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/wiki/Troubleshooting)

[Feature Description](github.com/liliana-sanfilippo/react-bibtex-reference-manager/wiki/Features)

[Features in development](https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/wiki/Features)

PLEASE create issues if you ancounter bugs or have ideas or enhancements.

## Why use it? 

1. It provides proper and consistent formatting of references (with visual warnings if information is missing)*.
2. No need to keep track in which order references are cited in the text, the manager is able to infer the order of citations and generates the list accordingly.
3. Point 2. makes it very easy to add references later on as the order adjusts automatically.
4. It is not necessary to number the citations in the text as that happens automatically, too.
5. Really, you just need to take care that your bibtex references are alright. And there is a tool for that as well: [BibTeX Tidier](https://liliana-sanfilippo.github.io/bibtex-tidy/index.html).

*Also the auther names are formatted consistently! It even recignised particles such as "van" to be last names instead of just taking the last word as the last name and having everything else as the first names.


## Related projects and components

- [React BibteX Reference Generator](https://github.com/liliana-sanfilippo/react-bibtex-reference-generator)
- [TypeScript BibTeX parser](https://github.com/liliana-sanfilippo/bibtex-ts-parser)
- [Extended Bibtex Grammar](https://github.com/liliana-sanfilippo/Extended-BibTeX-Grammar)
- [Name parsing grammar for ANTLRts](https://github.com/liliana-sanfilippo/author-name-parser)
