'use client';

import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface BreadcrumbItem {
  title: string | React.ReactNode;
  href?: string;
}

export default function Breadcrumb() {
  const pathname = usePathname();

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    
    const items: BreadcrumbItem[] = [
      {
        title: (
          <Link href="/dashboard" className="flex items-center">
            <HomeOutlined className="mr-1" />
            Dashboard
          </Link>
        ),
        href: '/dashboard',
      },
    ];

    // Don't show breadcrumb for dashboard root
    if (pathname === '/dashboard') {
      return [{ title: <HomeOutlined /> }];
    }

    // Build breadcrumb based on path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Skip the first segment if it's dashboard
      if (segment === 'dashboard' && index === 0) {
        return;
      }

      let title = segment;
      
      // Convert segment to readable format
      switch (segment) {
        case 'data':
          title = 'Data Management';
          break;
        case 'relawan':
          title = 'Relawan';
          break;
        case 'koordinator':
          title = 'Koordinator';
          break;
        case 'dapil':
          title = 'Dapil';
          break;
        case 'reports':
          title = 'Reports';
          break;
        case 'settings':
          title = 'Settings';
          break;
        case 'import':
          title = 'Import Data';
          break;
        case 'export':
          title = 'Export Data';
          break;
        default:
          // Capitalize first letter
          title = segment.charAt(0).toUpperCase() + segment.slice(1);
      }

      // If it's the last segment, don't make it a link
      if (index === pathSegments.length - 1) {
        items.push({ title });
      } else {
        items.push({
          title: <Link href={currentPath}>{title}</Link>,
          href: currentPath,
        });
      }
    });

    return items;
  };

  const items = getBreadcrumbItems();

  return (
    <div className="mb-4">
      <AntBreadcrumb items={items} />
    </div>
  );
}
