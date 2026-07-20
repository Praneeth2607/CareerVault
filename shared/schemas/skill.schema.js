export const skillSchema = {
  type: "SKILL",
  fields: [
    {
      key: "category",
      label: "Category",
      type: "text",
      required: true
    },
    {
      key: "proficiency",
      label: "Proficiency",
      type: "select",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true
    },
    {
      key: "monthsOfExperience",
      label: "Months of Experience",
      type: "number"
    },
    {
      key: "notes",
      label: "Notes",
      type: "textarea"
    }
  ]
};
