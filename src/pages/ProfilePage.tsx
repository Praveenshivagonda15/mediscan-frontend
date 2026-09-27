import { LogOut, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuthStore } from '@/stores/authStore';
import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { useLogoutAllDevices } from '@/features/profile/hooks';

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const logoutAll = useLogoutAllDevices();
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gradient">Profile</h1>
        <p className="text-sm text-white/50 mt-1">Manage your account.</p>
      </div>

      <GlassCard intensity="strong" className="p-6">
        <h2 className="font-semibold text-white mb-5">Account details</h2>
        <ProfileForm />
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="font-semibold text-white mb-4">Activity</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider">Scans so far</p>
            <p className="text-3xl font-semibold mt-2 tabular-nums text-gradient-emerald">
              {user.scanCount}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider">Member since</p>
            <p className="text-3xl font-semibold mt-2 text-white">
              {new Date(user.createdAt).toLocaleString('en-IN', { month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-start gap-3 mb-5">
          <Monitor className="h-5 w-5 text-white/60 mt-0.5" />
          <div>
            <h2 className="font-semibold text-white">Log out from all devices</h2>
            <p className="text-xs text-white/50 mt-1">
              Use this if you think your account is compromised.
            </p>
          </div>
        </div>
        <Button
          variant="destructive"
          onClick={() => logoutAll.mutate()}
          disabled={logoutAll.isPending}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          {logoutAll.isPending ? 'Signing out…' : 'Log out everywhere'}
        </Button>
      </GlassCard>
    </div>
  );
}