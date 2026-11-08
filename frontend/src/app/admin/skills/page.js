"use client";

import { Chip } from "@mui/material";
import CrudPage from "@/components/admin/CrudPage";
import { useTranslation } from "@/i18n/LanguageContext";

const CATEGORIES = ["Frontend", "Backend", "Database", "Tools", "Other"];

export default function AdminSkillsPage() {
  const { t } = useTranslation();

  return (
    <CrudPage
      title={t("admin.skills")}
      subtitle="Grouped by category. Skill names are not translated - React and Node.js read the same in every language."
      endpoint="/skills"
      singularName="Skill"
      columns={[
        { key: "name", label: "Name" },
        {
          key: "category",
          label: "Category",
          render: (row) => <Chip size="small" label={row.category} variant="outlined" />,
        },
        { key: "order", label: "Order" },
      ]}
      fields={[
        { name: "name", label: "Skill name", type: "text" },
        { name: "category", label: "Category", type: "select", options: CATEGORIES },
        { name: "icon", label: "Icon (optional)", type: "image" },
        { name: "order", label: "Order", type: "number" },
      ]}
      emptyValues={{ name: "", category: "Frontend", icon: null, order: 0 }}
    />
  );
}
