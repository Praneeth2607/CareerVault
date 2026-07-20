export const researchSchema = {
  type: "RESEARCH",
  fields: [
    {
      key: "abstract",
      label: "Abstract",
      type: "textarea",
      required: true
    },
    {
      key: "doi",
      label: "DOI / Link",
      type: "url"
    },
    {
      key: "conference",
      label: "Conference / Journal",
      type: "text"
    },
    {
      key: "authors",
      label: "Authors",
      type: "tags"
    },
    {
      key: "citation",
      label: "Citation",
      type: "textarea"
    },
    {
      key: "keywords",
      label: "Keywords",
      type: "tags"
    }
  ]
};
