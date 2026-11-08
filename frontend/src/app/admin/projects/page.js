"use client";

import { Chip, Stack } from "@mui/material";
import CrudPage from "@/components/admin/CrudPage";
import { useTranslation } from "@/i18n/LanguageContext";

const CATEGORIES = ["ERP", "Full Stack", "Frontend", "Client Work", "Other"];

export default function AdminProjectsPage() {
  const { t } = useTranslation();

  return (
    <CrudPage
      title={t("admin.projects")}
      subtitle="Featured projects show on the home page; the rest appear on /projects."
      endpoint="/projects"
      singularName="Project"
      columns={[
        { key: "title", label: "Title" },
        {
          key: "category",
          label: "Category",
          render: (row) => <Chip size="small" label={row.category} variant="outlined" />,
        },
        {
          key: "flags",
          label: "Flags",
          render: (row) => (
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {row.isFeatured && <Chip size="small" color="primary" label="Featured" />}
              {row.isConfidential && <Chip size="small" label="NDA" />}
              {row.liveUrl && <Chip size="small" color="secondary" variant="outlined" label="Live" />}
              {(row.demoCredentials || []).length > 0 && (
                <Chip size="small" variant="outlined" label={`${row.demoCredentials.length} logins`} />
              )}
            </Stack>
          ),
        },
        { key: "order", label: "Order" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text" },
        {
          name: "shortDescription",
          label: "Short description",
          type: "textarea",
          rows: 3,
          help: "Shown on the card - keep it under about 150 characters",
        },
        {
          name: "longDescription",
          label: "Long description",
          type: "textarea",
          rows: 6,
          help: "Shown on the project detail page",
        },
        { name: "category", label: "Category", type: "select", options: CATEGORIES },
        { name: "techStack", label: "Tech stack", type: "csv" },
        { name: "coverImage", label: "Cover image", type: "image" },
        { name: "liveUrl", label: "Live URL", type: "text", help: "Link to the deployed site - this is what the 'Live demo' button on the card opens" },
        { name: "githubUrl", label: "GitHub URL", type: "text" },
        {
          name: "demoCredentials",
          label: "Demo login credentials",
          type: "repeater",
          addLabel: "Add role",
          max: 6,
          emptyRow: { role: "", email: "", password: "", note: "" },
          help:
            "Test accounts for the live demo, so a visitor can log in and see each role. " +
            "Only ever put demo or seed accounts here - never a real client or production login.",
          subFields: [
            {
              name: "role",
              label: "Role",
              type: "select",
              options: ["Super Admin", "Admin", "Manager", "User", "Guest"],
            },
            { name: "email", label: "Email / username", type: "text" },
            { name: "password", label: "Password", type: "text" },
            { name: "note", label: "Note (optional)", type: "text", help: "For example: 'full access' or 'read-only'" },
          ],
        },
        {
          name: "demoNote",
          label: "Note about the demo (optional)",
          type: "textarea",
          rows: 2,
          help: "Shown at the top of the credentials dialog. For example: 'The demo data resets every night.'",
        },
        { name: "isFeatured", label: "Show on home page (featured)", type: "switch" },
        { name: "isConfidential", label: "Show an 'Under NDA' badge", type: "switch" },
        { name: "order", label: "Order", type: "number" },
        {
          name: "translations",
          label: "Translations",
          type: "translations",
          subFields: [
            { name: "title", label: "Title", type: "text" },
            { name: "shortDescription", label: "Short description", type: "textarea", rows: 3 },
            { name: "longDescription", label: "Long description", type: "textarea", rows: 6 },
          ],
        },
      ]}
      emptyValues={{
        title: "",
        shortDescription: "",
        longDescription: "",
        category: "Full Stack",
        techStack: [],
        coverImage: null,
        liveUrl: "",
        githubUrl: "",
        demoCredentials: [],
        demoNote: "",
        isFeatured: false,
        isConfidential: false,
        order: 0,
        translations: {},
      }}
    />
  );
}
