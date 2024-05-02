import jsonld from "jsonld";

/** */
export default class LocalStorageAdapter {
  /** */
  constructor(annotationPageId) {
    this.annotationPageId = annotationPageId;
  }

  /** */
  async create(annotation) {
    const emptyAnnoPage = {
      "@context": [
        "http://www.w3.org/ns/anno.jsonld",
        {
          mlao: "https://purl.archive.org/domain/mlao/",
          oa: "http://www.w3.org/ns/oa#",
          ecrm: "http://erlangen-crm.org/current/",
          frbroo: "http://erlangen-crm.org/efrbroo/",
          rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
          rdfs: "http://www.w3.org/2000/01/rdf-schema#",
          hico: "http://purl.org/emmedi/hico/",
          prov: "http://www.w3.org/ns/prov#",
          wasGeneratedBy: "prov:wasGeneratedBy",
          hasConceptualLevel: "mlao:hasConceptualLevel",
          hasInterpretationCriterion: "hico:hasInterpretationCriterion",
          InterpretationAct: "hico:InterpretationAct",
          InterpretationCriterion: "hico:InterpretationCriterion",
          hasAnchor: "mlao:hasAnchor",
          isAnchoredTo: "mlao:isAnchoredTo",
          Anchor: "mlao:Anchor",
          Work: "frbroo:F1_Work",
          Expression: "frbroo:F2_Expression",
          Manifestation: "frbroo:F4_Manifestation_Singleton",
          Item: "frbroo:F5_Item",
        },
      ],
      id: this.annotationPageId,
      items: [],
      type: "AnnotationPage",
    };
    const annotationPage = (await this.all()) || emptyAnnoPage;
    annotationPage.items.push(annotation);
    localStorage.setItem(this.annotationPageId, JSON.stringify(annotationPage));
    console.log(
      "THIS IS THE ANNOTATION PAGE CONSOLE LOG ------->",
      annotationPage
    );
    // const rdf = await this.toRdf(annotationPage);
    console.log(await this.toRdf(annotationPage));
    return annotationPage;
  }

  /** */
  async update(annotation) {
    const annotationPage = await this.all();
    if (annotationPage) {
      const currentIndex = annotationPage.items.findIndex(
        (item) => item.id === annotation.id
      );
      annotationPage.items.splice(currentIndex, 1, annotation);
      localStorage.setItem(
        this.annotationPageId,
        JSON.stringify(annotationPage)
      );
      return annotationPage;
    }
    return null;
  }

  /** */
  async delete(annoId) {
    const annotationPage = await this.all();
    if (annotationPage) {
      annotationPage.items = annotationPage.items.filter(
        (item) => item.id !== annoId
      );
    }
    localStorage.setItem(this.annotationPageId, JSON.stringify(annotationPage));
    return annotationPage;
  }

  /** */
  async get(annoId) {
    const annotationPage = await this.all();
    if (annotationPage) {
      return annotationPage.items.find((item) => item.id === annoId);
    }
    return null;
  }

  /** */
  async toRdf(jsonLdData, format = "application/n-quads") {
    try {
      // Use the jsonld.toRDF function to convert JSON-LD to a desired RDF format
      const rdfData = await jsonld.toRDF(jsonLdData, { format: format });
      return rdfData;
    } catch (error) {
      console.error("Error converting JSON-LD to RDF:", error);
      return null;
    }
  }

  /** */
  async all() {
    return JSON.parse(localStorage.getItem(this.annotationPageId));
  }
}
