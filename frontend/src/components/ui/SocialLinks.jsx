import { IconButton, Stack, Tooltip } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const ICONS = {
  linkedin: { Icon: LinkedInIcon, label: "LinkedIn" },
  github: { Icon: GitHubIcon, label: "GitHub" },
  instagram: { Icon: InstagramIcon, label: "Instagram" },
  twitter: { Icon: TwitterIcon, label: "Twitter" },
};

export default function SocialLinks({ socials = {}, size = "medium" }) {
  const entries = Object.entries(ICONS).filter(([key]) => socials?.[key]);

  if (entries.length === 0) return null;

  return (
    <Stack direction="row" spacing={0.5}>
      {entries.map(([key, { Icon, label }]) => (
        <Tooltip key={key} title={label}>
          <IconButton
            size={size}
            color="inherit"
            href={socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon fontSize={size === "small" ? "small" : "medium"} />
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
}
