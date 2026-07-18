export const projectSchema = {
  type: "PROJECT",
  displayName: "Project",
  fields: [
    {
      key: "summary",
      label: "One-Line Summary",
      type: "textarea",
      required: true,
      searchable: true,
      copyable: true,
      maxLength: 250
    },
    {
      key: "description",
      label: "Detailed Description",
      type: "textarea",
      required: false,
      searchable: true,
      copyable: true
    },
    {
      key: "techStack",
      label: "Technology Stack",
      type: "tags",
      searchable: true,
      copyable: true
    },
    {
      key: "github",
      label: "GitHub Repository",
      type: "url",
      searchable: false,
      copyable: true
    },
    {
      key: "liveDemo",
      label: "Live Link",
      type: "url",
      searchable: false,
      copyable: true
    },
    {
      key: "role",
      label: "Role",
      type: "text",
      searchable: true,
      copyable: true
    }
  ]
};
