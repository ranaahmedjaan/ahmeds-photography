const PROFILES = [
  { label: "GitHub", href: "https://github.com/ranaahmedjaan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rana-ahmed-jaan/" },
];

/** Profile links shown in the footer and on the About page. Each opens in a new tab. */
export function SocialLinks() {
  return (
    <>
      {PROFILES.map((profile) => (
        <a
          key={profile.href}
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {profile.label}
        </a>
      ))}
    </>
  );
}
