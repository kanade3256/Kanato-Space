import Link from "next/link";

import { Card } from "@/components/ui/Card";

type EmptyStateProps = {
  message: string;
  href: string;
  linkLabel: string;
};

export function EmptyState({ message, href, linkLabel }: EmptyStateProps) {
  return (
    <Card>
      <div className="space-y-4">
        <p className="text-sm text-secondary">{message}</p>
        <Link href={href} className="inline-flex text-sm font-medium text-primary hover:underline">
          {linkLabel}
        </Link>
      </div>
    </Card>
  );
}
