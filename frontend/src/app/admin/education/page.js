"use client";

import CrudPage from "@/components/admin/CrudPage";
import { useTranslation } from "@/i18n/LanguageContext";

export default function AdminEducationPage() {
  const { t } = useTranslation();

  return (
    <CrudPage
      title={t("admin.education")}
      subtitle="These become the education cards in the About section."
      endpoint="/education"
      singularName="Education"
      columns={[
        { key: "degree", label: "Degree" },
        { key: "institution", label: "Institution" },
        {
          key: "years",
          label: "Years",
          render: (row) => `${row.startYear || ""} - ${row.endYear || "Present"}`,
        },
      ]}
      fields={[
        { name: "degree", label: "Degree", type: "text" },
        { name: "field", label: "Field of study", type: "text" },
        { name: "institution", label: "Institution", type: "text" },
        { name: "startYear", label: "Start year", type: "number" },
        { name: "endYear", label: "End year", type: "number" },
        { name: "grade", label: "Grade", type: "text" },
        { name: "points", label: "Highlights", type: "lines" },
        { name: "order", label: "Order", type: "number" },
        {
          name: "translations",
          label: "Translations",
          type: "translations",
          subFields: [
            { name: "degree", label: "Degree", type: "text" },
            { name: "field", label: "Field of study", type: "text" },
            { name: "institution", label: "Institution", type: "text" },
            { name: "points", label: "Highlights", type: "lines" },
          ],
        },
      ]}
      emptyValues={{
        degree: "",
        field: "",
        institution: "",
        startYear: "",
        endYear: "",
        grade: "",
        points: [],
        order: 0,
        translations: {},
      }}
    />
  );
}
