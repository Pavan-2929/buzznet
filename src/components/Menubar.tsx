import React from 'react';
import { Button } from './ui/button';
import { Bell, Bookmark, Home, Compass, User } from 'lucide-react';
import Link from 'next/link';

interface MenuBarProps {
  className?: string;
}

const Menubar = ({ className }: MenuBarProps) => {
  return (
    <div className={className}>
      <Button asChild variant="ghost" title="Home" className="flex items-center justify-start gap-3">
        <Link href="/">
          <Home />
          <p className='hidden lg:inline'>
            Home
          </p>
        </Link>
      </Button>
      <Button asChild variant="ghost" title="Notifications" className="flex items-center justify-start gap-3">
        <Link href="/notifications">
          <Bell />
          <p className='hidden lg:inline'>
            Notifications
          </p>
        </Link>
      </Button>
      <Button asChild variant="ghost" title="Explore" className="flex items-center justify-start gap-3">
        <Link href="/explore">
          <Compass />
          <p className='hidden lg:inline'>
            Explore
          </p>
        </Link>
      </Button>
      <Button asChild variant="ghost" title="Bookmarks" className="flex items-center justify-start gap-3">
        <Link href="/bookmarks">
          <Bookmark />
          <p className='hidden lg:inline'>
            Bookmarks
          </p>
        </Link>
      </Button>
      {/* <Button asChild variant="ghost" title="Profile" className="flex items-center justify-start gap-3">
        <Link href="/profile">
          <User />
          Profile
        </Link>
      </Button> */}
    </div>
  );
};

export default Menubar;
