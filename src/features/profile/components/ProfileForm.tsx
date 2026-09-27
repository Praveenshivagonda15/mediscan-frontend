import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@/types/user';
import { useUpdateProfile } from '../hooks';

export function ProfileForm() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return <ProfileFields key={`${user.id}:${user.name}`} user={user} />;
}

function ProfileFields({ user }: { user: User }) {
  const [name, setName] = useState(user?.name ?? '');
  const update = useUpdateProfile();

  const dirty = name.trim() !== user.name && name.trim().length >= 2;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dirty) return;
    update.mutate({ name: name.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label>Full name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </div>

      <div>
        <Label>Email</Label>
        <Input value={user.email} disabled />
        <p className="text-xs text-white/40 mt-2">
          {user.emailVerified ? '✓ Verified' : 'Not verified'}
        </p>
      </div>

      <Button type="submit" disabled={!dirty || update.isPending}>
        {update.isPending ? 'Saving…' : 'Save changes'}
      </Button>
    </form>
  );
}