import { createFileRoute, Outlet } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export const Route = createFileRoute('/changelog')({
  component: ChangelogLayout,
});

function ChangelogLayout() {
  return (
    <HomeLayout {...baseOptions()}>
      <Outlet />
    </HomeLayout>
  );
}
