type ErrorStateProps = {
  message: string;
  description: string;
};

export function ErrorState({ message, description }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary">{message}</p>
        <p className="text-sm text-secondary">{description}</p>
      </div>
    </div>
  );
}
