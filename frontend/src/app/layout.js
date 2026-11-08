import ThemeRegistry from "@/theme/ThemeRegistry";
import { AuthProvider } from "@/context/AuthContext";
import "@/theme/fonts";
import "./globals.css";

export const metadata = {
  title: "Rahul Sharma - Frontend Developer",
  description:
    "Frontend Developer with 1.5+ years of experience building ERP, CRM and CMS systems using React, Next.js, Node.js and MongoDB.",
  keywords: [
    "Rahul Sharma",
    "Frontend Developer",
    "MERN Stack",
    "React Developer",
    "Next.js",
    "Noida",
  ],
  openGraph: {
    title: "Rahul Sharma - Frontend Developer",
    description: "MERN stack developer building ERP, CRM and CMS systems.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeRegistry>
          <AuthProvider>{children}</AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
