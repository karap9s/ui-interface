'use client';

import { cn } from '@/src/components/shared/lib/utils';
import { headerElements } from '@/src/components/widgets/Header/model/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { JSX } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggleButton from '@/src/components/ui/theme-toggle-button';

const Header = (): JSX.Element => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.includes(href);

  return (
    <header className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationMenu>
          <NavigationMenuList
            className={cn('flex justify-center items-center gap-2 py-4')}
          >
            {headerElements.map((element) => (
              <NavigationMenuItem key={element.href}>
                <NavigationMenuTrigger
                  className={cn(
                    'relative px-4 py-2 text-slate-600 hover:text-slate-900 transition-all duration-200 rounded-lg hover:bg-white/60 group',
                    isActive(element.href) &&
                      'text-indigo-600 bg-indigo-50 font-medium shadow-sm'
                  )}
                >
                  <Link href={element.href} className="relative z-10">
                    {element.label}
                  </Link>
                  {isActive(element.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg" />
                  )}
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <ThemeToggleButton
          variant="gif"
          url="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3JwcXdzcHd5MW92NWprZXVpcTBtNXM5cG9obWh0N3I4NzFpaDE3byZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WgsVx6C4N8tjy/giphy.gif"
        />
      </div>
    </header>
  );
};

export default Header;
