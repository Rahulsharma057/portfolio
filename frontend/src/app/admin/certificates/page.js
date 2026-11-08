"use client";

import CrudPage from "@/components/admin/CrudPage";
import { formatDate } from "@/lib/format";
import { useTranslation } from "@/i18n/LanguageContext";

export default function AdminCertificatesPage() {
  const { t } = useTranslation();

  return (
    <CrudPage
      title={t("admin.certificates")}
      subtitle="Courses, competitions and achievements."
      endpoint="/certificates"
      singularName="Certificate"
      columns={[
        { key: "title", label: "Title" },
        { key: "issuer", label: "Issuer" },
        { key: "issueDate", label: "Date", render: (row) => formatDate(row.issueDate) || "-" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "issuer", label: "Issued by", type: "text" },
        { name: "issueDate", label: "Issue date", type: "date" },
        { name: "image", label: "Certificate image", type: "image" },
        { name: "fileUrl", label: "PDF / file URL", type: "text", help: "Used by the Download button (optional)" },
        { name: "credentialUrl", label: "Credential URL", type: "text" },
        { name: "order", label: "Order", type: "number" },
        {
          name: "translations",
          label: "Translations",
          type: "translations",
          subFields: [
            { name: "title", label: "Title", type: "text" },
            { name: "issuer", label: "Issued by", type: "text" },
          ],
        },
      ]}
      emptyValues={{
        title: "",
        issuer: "",
        issueDate: null,
        image: null,
        fileUrl: "",
        credentialUrl: "",
        order: 0,
        translations: {},
      }}
    />
  );
}
