import { Link } from 'react-router-dom';
import { AuthLayout } from '@/components/ui/layout/AuthLayout';
import { SignupForm } from '@/features/auth/components/SignupForm';

export function SignupPage() {
  return (
    <AuthLayout
      title="Create your MediScan account"
      subtitle="Free forever. Scan up to 5 medicines a day."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthLayout>
  );
}