import { Card } from "@tremor/react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Network Monitor Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to access the dashboard
          </p>
        </div>
        <LoginForm />
      </Card>
    </div>
  );
}
