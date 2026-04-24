import { Card } from "@/components/ui/Card";
import { contactNoticeText } from "@/features/contact/contact-data";

export function ContactNotice() {
  return (
    <Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Notice</h2>
        <div className="space-y-3">
          {contactNoticeText.map((text) => (
            <p key={text} className="text-sm leading-7 text-secondary">
              {text}
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
}
