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
      // Icon field jaan-boojhkar nahi hai: Skills section ab plain text me
      // render hota hai, isliye icon kahin dikhta nahi. Model me field abhi bhi
      // hai (purana data tootega nahi), bas form se hata di gayi hai.
      fields={[
        { name: "name", label: "Skill name", type: "text" },
        { name: "category", label: "Category", type: "select", options: CATEGORIES },
        {
          name: "order",
          label: "Order",
          type: "number",
          help: "Chhota number pehle dikhta hai, category ke andar",
        },
      ]}
      emptyValues={{ name: "", category: "Frontend", order: 0 }}
    />
  );
}