import type { ReactNode, SVGProps } from "react";

type SocialIcon = (props: SVGProps<SVGSVGElement>) => ReactNode;

type SocialLink = {
  label: string;
  href: string;
  Icon: SocialIcon;
};

type SocialLinksProps = {
  className?: string;
};

const socialLinks: SocialLink[] = [
  {
    label: "Visit X profile",
    href: "https://x.com/EidaTempest",
    Icon: XIcon,
  },
  {
    label: "Visit Facebook profile",
    href: "https://www.facebook.com/share/191YvXv7c4",
    Icon: FacebookIcon,
  },
  {
    label: "Visit LinkedIn profile",
    href: "https://www.linkedin.com/in/joshua-sumanghid-7a7135298",
    Icon: LinkedInIcon,
  },
  {
    label: "Visit GitHub profile",
    href: "https://github.com/Eida27",
    Icon: GitHubIcon,
  },
];

export function SocialLinks({ className = "" }: SocialLinksProps) {
  const containerClassName = ["flex items-center gap-2", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div aria-label="Social media links" className={containerClassName}>
      {socialLinks.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="group inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-white/12 bg-white/[0.06] text-stone-100 transition hover:-translate-y-0.5 hover:border-teal-300/40 hover:bg-white/[0.1] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/80"
        >
          <Icon
            aria-hidden="true"
            className="size-6 transition group-hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="24" r="22" fill="#050505" />
      <circle cx="24" cy="24" r="21.5" stroke="white" strokeOpacity="0.55" />
      <path
        fill="#ffffff"
        d="m28.5 22.2 10-11.7h-2.4l-8.8 10.2-7-10.2h-8l10.5 15.3-10.7 12.4h2.4l9.3-10.9 7.5 10.9h8L28.5 22.2Zm-3.3 3.9-1.1-1.6-8.5-12.2h3.4l6.9 9.8 1.1 1.6 8.9 12.8h-3.4l-7.3-10.4Z"
      />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="24" r="22" fill="#1877f2" />
      <path
        fill="#ffffff"
        d="M28.2 45.5V29.4h5.4l1-6.8h-6.4v-4.4c0-2 1-3.9 4.1-3.9h2.9V8.5s-2.7-.5-5.2-.5c-5.4 0-8.9 3.3-8.9 9.2v5.4h-6v6.8h6v16.1a22.4 22.4 0 0 0 7.1 0Z"
      />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <rect width="40" height="40" x="4" y="4" fill="#2999b6" rx="7" />
      <circle cx="17.5" cy="17" r="3.3" fill="#ffffff" />
      <path fill="#ffffff" d="M14.4 22h6.2v17h-6.2V22Z" />
      <path
        fill="#ffffff"
        d="M24.6 22h5.9v2.3h.1c.8-1.4 2.8-2.9 5.8-2.9 6.2 0 7.3 4 7.3 9.2V39h-6.2v-7.5c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V39h-6.2V22Z"
      />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="24" r="22" fill="#ffffff" />
      <path
        fill="#050505"
        fillRule="evenodd"
        d="M24 9.5c-8.2 0-14.8 6.7-14.8 14.9 0 6.5 4.2 12.1 10.1 14.1.7.1 1-.3 1-.7v-2.6c-4.1.9-5-1.8-5-1.8-.7-1.7-1.6-2.2-1.6-2.2-1.3-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.4 3.6 1.7 4.5 1.3.1-1 .6-1.7 1-2.1-3.3-.4-6.7-1.7-6.7-7.3 0-1.6.6-3 1.5-4-.2-.4-.6-2 .2-4 0 0 1.2-.4 4 1.5 1.2-.3 2.4-.5 3.7-.5s2.5.2 3.7.5c2.8-1.9 4-1.5 4-1.5.8 2 .3 3.6.2 4 .9 1 1.5 2.4 1.5 4 0 5.7-3.4 6.9-6.7 7.3.6.5 1.1 1.5 1.1 3v4.4c0 .4.3.9 1 .7 5.9-2 10.1-7.6 10.1-14.1C38.8 16.2 32.2 9.5 24 9.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
