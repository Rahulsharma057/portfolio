"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import FolderIcon from "@mui/icons-material/Folder";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useTranslation } from "@/i18n/LanguageContext";

const WIDTH = 248;

const NAV = [
  { key: "dashboard", href: "/admin", Icon: DashboardIcon },
  { key: "profile", href: "/admin/profile", Icon: PersonIcon },
  { key: "skills", href: "/admin/skills", Icon: CodeIcon },
  { key: "experience", href: "/admin/experience", Icon: WorkIcon },
  { key: "education", href: "/admin/education", Icon: SchoolIcon },
  { key: "projects", href: "/admin/projects", Icon: FolderIcon },
  { key: "certificates", href: "/admin/certificates", Icon: WorkspacePremiumIcon },
  { key: "messages", href: "/admin/messages", Icon: MailIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ px: 2 }}>
        <Box>
          <Typography variant="h6">Admin</Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.name || ""}
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <List sx={{ flexGrow: 1, px: 1 }}>
        {NAV.map(({ key, href, Icon }) => (
          <ListItemButton
            key={href}
            component={Link}
            href={href}
            selected={pathname === href}
            onClick={() => setMobileOpen(false)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 38 }}>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t(`admin.${key}`)} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List sx={{ px: 1 }}>
        <ListItemButton component={Link} href="/" sx={{ borderRadius: 2 }}>
          <ListItemIcon sx={{ minWidth: 38 }}>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("admin.viewSite")} />
        </ListItemButton>

        <ListItemButton onClick={logout} sx={{ borderRadius: 2 }}>
          <ListItemIcon sx={{ minWidth: 38 }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("admin.logout")} />
        </ListItemButton>
      </List>

      <Stack direction="row" spacing={0.5} sx={{ p: 1 }}>
        <LanguageSwitcher />
        <ThemeToggle />
      </Stack>
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={() => setMobileOpen(true)}
        aria-label={t("nav.openMenu")}
        sx={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 1300,
          display: { xs: "inline-flex", md: "none" },
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: WIDTH, boxSizing: "border-box" },
        }}
      >
        {content}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: WIDTH, boxSizing: "border-box" },
        }}
        open
      >
        {content}
      </Drawer>
    </>
  );
}
