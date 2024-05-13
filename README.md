# mirador-multi-level-annotations

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

`mirador-multi-level-annotations` is a [Mirador 3](https://github.com/projectmirador/mirador) plugin that adds annotation creation tools to the user interface. Users can` create rectangle, oval, and polygon annotations and add text descriptors. A [live demo](https://mirador-annotations.netlify.app/) that stores annotations in local storage is available for testing. See the [issue queue](https://github.com/ProjectMirador/mirador-annotations/issues) for design proposals for additional functionality.

## Installing `mirador-multi-level-annotations`

`mirador-multi-level-annotations` requires an instance of Mirador 3. See the [Mirador wiki](https://github.com/ProjectMirador/mirador/wiki) for examples of embedding Mirador within an application. See the [live demo's index.js](https://github.com/ProjectMirador/mirador-annotations/blob/master/demo/src/index.js) for an example of importing the `mirador-annotations` plugin and configuring the adapter.

## Development

The prototype is built as an extension of the existing Mirador Annotation plugin and shares its core features and user interface, while incorporating the possibility to produce annotations according to classes and properties specified in the extended data model. In particular, this extension was designed to support multi-level semantic annotations and integrate domain standards such as LRMer, CIDOC-CRM, and HiCO into the JSON-LD model produced through the Mirador annotator. 
We decided to develop the implementation starting from the same use case considered above so that it would be possible to test the process of creating annotations on palimpsests following the new requirements.
The architectural design of the Mirador extension was aimed at integrating a dynamic data model capable of supporting additional semantic layers. These enhancements were conceptualised to allow users to interact with multiple levels of semantic annotations directly through the Mirador interface. 
From a User Interface perspective, five autocomplete select dropdowns were integrated, allowing users to select from a taxonomy or create new entries on the fly. These dropdowns manage various aspects of the annotations such as the selection of the Conceptual Level, Anchor, Referenced Entity, Interpretation Criterion, and Editor. 
The custom dropdowns dynamically inject extended metadata into the JSON-LD output produced by Mirador. This approach ensures that the enhanced data model integrates with the existing infrastructure without disrupting the user experience.
The implementation phase involved using React as a framework for the front-end development of the interface and the json-ld processor library to convert JSON-LD into RDF serialisations. The dropdown menus in the user interface were designed to perform CRUD operations on a Blazegraph triplestore via SPARQL and to populate these dropdowns with data retrieved using SPARQL queries. This setup ensures that the annotations are not only stored persistently in a dedicated triple store but are also fully interoperable with other Semantic Web technologies.
Finally, after having manually created five annotations with different requirements, SPARQL queries based on the Competency Questions were employed to validate the adherence of the model to the extended data schema, specifically testing for the accurate serialisation of multi-level semantic annotations during the annotation process.


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/mirador-annotations.png?style=flat-square
[npm]: https://www.npmjs.org/package/mirador-annotations

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
