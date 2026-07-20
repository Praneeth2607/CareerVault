export const achievementSchema = {
  type: "ACHIEVEMENT",
  fields: [
    {
      key: "description",
      label: "Description",
      type: "textarea",
      required: true
    },
    {
      key: "date",
      label: "Date",
      type: "date"
    },
    {
      key: "organization",
      label: "Organization / Event",
      type: "text"
    },
    {
      key: "tags",
      label: "Tags",
      type: "tags"
    }
  ]
};
