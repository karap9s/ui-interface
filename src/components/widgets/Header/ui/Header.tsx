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

const Header = (): JSX.Element => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.includes(href);

  return (
    <header>
      <NavigationMenu>
        <NavigationMenuList
          className={cn('flex justify-center items-center gap-8 p-4')}
        >
          {headerElements.map((element) => (
            <NavigationMenuItem key={element.href}>
              <NavigationMenuTrigger
                className={cn(
                  'text-gray-500 hover:text-gray-600',
                  isActive(element.href) && 'text-gray-800 hover:text-black font-[450]'
                )}
              >
                <Link href={element.href}>{element.label}</Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
