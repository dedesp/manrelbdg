'use client';

import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useContent, useTerminology } from '@/hooks/useClientConfig';

export default function Breadcrumb() {
  const pathname = usePathname();
  const content = useContent();
  const terminology = useTerminology();

  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    
    const items = [
      {
        title: (
          <Link href="/dashboard" className="flex items-center">
            <HomeOutlined className="mr-1" />
            {content.navigation.dashboard}
          </Link>
        ),
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

      let title: string | React.ReactNode = segment;
      
      // Convert segment to readable format using client configuration
      switch (segment) {
        case 'data':
          title = content.navigation.dataManagement;
          break;
        case 'relawan':
          title = terminology.relawanPlural;
          break;
        case 'koordinator':
          title = terminology.koordinatorPlural;
          break;
        case 'dapil':
          title = terminology.dapilPlural;
          break;
        case 'reports':
          title = content.navigation.reports;
          break;
        case 'settings':
          title = content.navigation.settings;
          break;
        case 'import':
          title = content.navigation.import;
          break;
        case 'export':
          title = content.navigation.export;
          break;
        default:
          // Capitalize first letter
          title = segment.charAt(0).toUpperCase() + segment.slice(1);
      }

      // If it's the last segment, don't make it a link
      if (index === pathSegments.length - 1) {
        items.push({ title: <span>{title}</span> });
      } else {
        items.push({
          title: <Link href={currentPath}>{title}</Link>,
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
