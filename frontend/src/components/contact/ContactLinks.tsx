import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

import { Card } from "@/components/ui/Card";
import { type ContactLinkIcon, contactLinks } from "@/features/contact/contact-data";

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.8a5.3 5.3 0 0 0-1.4-3.7 4.9 4.9 0 0 0-.1-3.7s-1.1-.3-3.8 1.4a13.2 13.2 0 0 0-7 0C6.2 1 5.1 1.3 5.1 1.3A4.9 4.9 0 0 0 5 5a5.3 5.3 0 0 0-1.4 3.7c0 5.3 3.1 6.5 6.1 6.8A3.4 3.4 0 0 0 9 18.1V22" />
    </IconBase>
  );
}

function QiitaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 8h4a3 3 0 0 1 0 6H9z" />
      <path d="M13 14l3 3" />
    </IconBase>
  );
}

function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </IconBase>
  );
}

function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 5" />
      <path d="M14 11a5 5 0 0 0-7.07 0L5.52 12.4a5 5 0 1 0 7.07 7.07L14 19" />
    </IconBase>
  );
}

const iconMap: Record<ContactLinkIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  qiita: QiitaIcon,
  blog: BookIcon,
  lab: LinkIcon,
};

export function ContactLinks() {
  return (
    <Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Links</h2>
        <div className="space-y-3">
          {contactLinks.map((item) => {
            const Icon = iconMap[item.icon];

            return item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-primary transition hover:bg-gray-50 hover:underline"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                <span className="text-xs text-secondary">External</span>
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-primary transition hover:bg-gray-50 hover:underline"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                <span className="text-xs text-secondary">Internal</span>
              </Link>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
