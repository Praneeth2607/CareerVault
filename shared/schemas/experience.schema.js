export const experienceSchema = {
  type: "WORK_EXPERIENCE",
  displayName: "Work Experience",
  fields: [
    {
      key: "organization",
      label: "Organization",
      type: "text",
      required: true,
      searchable: true,
      copyable: true
    },
    {
      key: "role",
      label: "Role",
      type: "text",
      required: true,
      searchable: true,
      copyable: true
    },
    {
      key: "duration",
      label: "Duration",
      type: "text",
      required: true,
      searchable: false,
      copyable: true
    },
    {
      key: "responsibilities",
      label: "Responsibilities",
      type: "textarea",
      required: false,
      searchable: true,
      copyable: true
    },
    {
      key: "technologies",
      label: "Technologies Used",
      type: "tags",
      searchable: true,
      copyable: true
    }
  ]
};
