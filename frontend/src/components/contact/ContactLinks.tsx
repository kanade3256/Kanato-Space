import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { contactLinks } from "@/features/contact/contact-data";

export function ContactLinks() {
  return (
    <Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Links</h2>
        <div className="space-y-3">
          {contactLinks.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-primary transition hover:bg-gray-50 hover:underline"
              >
                <span>{item.label}</span>
                <span className="text-xs text-secondary">External</span>
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-primary transition hover:bg-gray-50 hover:underline"
              >
                <span>{item.label}</span>
                <span className="text-xs text-secondary">Internal</span>
              </Link>
            ),
          )}
        </div>
      </div>
    </Card>
  );
}
