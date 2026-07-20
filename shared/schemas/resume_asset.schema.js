export const resumeAssetSchema = {
  type: "RESUME_ASSET",
  fields: [
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [
        "About Me",
        "Professional Summary",
        "Internship Summary",
        "Project Summary",
        "Research Summary",
        "Career Objective",
        "Cover Letter Paragraph",
        "STAR Response",
        "Interview Answer",
        "Other"
      ],
      required: true
    },
    {
      key: "content",
      label: "Content",
      type: "textarea",
      required: true
    }
  ]
};
