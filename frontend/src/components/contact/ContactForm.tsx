"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type FormStatus = "idle" | "validating" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "お名前を入力してください。";
  }

  if (!values.email.trim()) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "メールアドレスの形式を確認してください。";
  }

  if (!values.subject.trim()) {
    errors.subject = "件名を入力してください。";
  }

  const messageLength = values.message.trim().length;
  if (!values.message.trim()) {
    errors.message = "お問い合わせ内容を入力してください。";
  } else if (messageLength < 10) {
    errors.message = "お問い合わせ内容は10文字以上で入力してください。";
  } else if (messageLength > 2000) {
    errors.message = "お問い合わせ内容は2000文字以内で入力してください。";
  }

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 text-sm text-red-600">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("validating");
    setStatusMessage("");

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setStatusMessage("入力内容を確認してください。");
      return;
    }

    await new Promise<void>((resolve) => {
      window.setTimeout(() => resolve(), 250);
    });

    setStatus("success");
    setStatusMessage("現在、送信機能は準備中です。");
    setValues(initialValues);
    setErrors({});
  }

  function handleChange(field: keyof FormValues) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };
  }

  return (
    <Card>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-primary">
              お名前 <span className="text-secondary">(必須)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange("name")}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-primary outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            <FieldError id="name-error" message={errors.name} />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-primary">
              メールアドレス <span className="text-secondary">(必須)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange("email")}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-primary outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <FieldError id="email-error" message={errors.email} />
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-primary">
              件名 <span className="text-secondary">(必須)</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={handleChange("subject")}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-primary outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            <FieldError id="subject-error" message={errors.subject} />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-primary">
              お問い合わせ内容 <span className="text-secondary">(必須)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={8}
              value={values.message}
              onChange={handleChange("message")}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-primary outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            <p className="mt-2 text-xs text-secondary">10文字以上、2000文字以内で入力してください。</p>
            <FieldError id="message-error" message={errors.message} />
          </div>
        </div>

        <div className="space-y-3">
          <Button type="submit" variant="primary" className="w-full" disabled={status === "validating"}>
            {status === "validating" ? "送信準備中..." : "送信する"}
          </Button>
          <p className="text-sm text-secondary">（準備中です）</p>
          {statusMessage ? (
            <p className={status === "error" ? "text-sm text-red-600" : "text-sm text-secondary"}>{statusMessage}</p>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
