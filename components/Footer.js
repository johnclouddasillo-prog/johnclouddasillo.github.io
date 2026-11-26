import { site } from "@/data/site";
import { roles } from "@/data/roles";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Selected work", href: "/#work" },
      { label: "About", href: "/#about" },
      { label: "Skills", href: "/#skills" },
    ],
  },
  {
    title: "What I do",
    links: roles.map((role) => ({
      label: role.label,
      href: `/?role=${role.id}#work`,
    })),
  },
  {
    title: "Say hello",
    links: [
      { label: site.email, href: `mailto:${site.email}` },
      { label: "Contact form", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="container-shell">
        <div className="footer-topline">
          <a href="/" className="footer-wordmark">YARDY<span>.</span></a>
          <p>Making things worth a second look.</p>
        </div>

        <div className="footer-groups">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="footer-heading">{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="footer-heading">Elsewhere</h2>
            <ul>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Jerald Dasillo / yardy. All rights reserved.</span>
          <a href="/contact">Available for selected projects <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </footer>
  );
}
