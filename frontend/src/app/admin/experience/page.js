"use client";

import CrudPage from "@/components/admin/CrudPage";
import { dateRange } from "@/lib/format";
import { useTranslation } from "@/i18n/LanguageContext";

const TYPES = ["Full-time", "Part-time", "Internship", "Freelance", "Contract"];

export default function AdminExperiencePage() {
  const { t } = useTranslation();

  return (
    <CrudPage
      title={t("admin.experience")}
      subtitle="The most recent role appears at the top of the timeline."
      endpoint="/experience"
      singularName="Experience"
      columns={[
        { key: "role", label: "Role" },
        { key: "company", label: "Company" },
        {
          key: "dates",
          label: "Duration",
          render: (row) => dateRange(row.startDate, row.endDate, row.isCurrent),
        },
      ]}
      fields={[
        { name: "role", label: "Role", type: "text" },
        { name: "company", label: "Company", type: "text" },
        { name: "employmentType", label: "Employment type", type: "select", options: TYPES },
        { name: "location", label: "Location", type: "text" },
        { name: "startDate", label: "Start date", type: "date" },
        { name: "endDate", label: "End date", type: "date", help: "Leave empty if this is your current role" },
        { name: "isCurrent", label: "I currently work here", type: "switch" },
        { name: "points", label: "Key responsibilities", type: "lines", rows: 7 },
        { name: "skills", label: "Skills used", type: "csv" },
        {
          name: "translations",
          label: "Translations",
          type: "translations",
          subFields: [
            { name: "role", label: "Role", type: "text" },
            { name: "location", label: "Location", type: "text" },
            { name: "points", label: "Key responsibilities", type: "lines", rows: 7 },
          ],
        },
      ]}
      emptyValues={{
        role: "",
        company: "",
        employmentType: "Full-time",
        location: "",
        startDate: null,
        endDate: null,
        isCurrent: false,
        points: [],
        skills: [],
        translations: {},
      }}
    />
  );
}
