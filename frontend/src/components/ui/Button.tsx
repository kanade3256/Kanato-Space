import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseClass =
  "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "border border-gray-200 bg-transparent text-primary hover:bg-gray-50",
  ghost: "bg-transparent text-primary hover:bg-gray-100",
};

export function Button({ variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={`${baseClass} ${variantClass[variant]} ${className}`.trim()} {...props} />;
}
