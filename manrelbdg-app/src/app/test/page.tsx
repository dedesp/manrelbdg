'use client';

import { Button, Card } from 'antd';

export default function TestPage() {
  return (
    <div className="p-6">
      <h1>Test Page with Ant Design</h1>
      <Card title="Test Card">
        <p>This is a test page with Ant Design components.</p>
        <Button type="primary">Test Button</Button>
      </Card>
    </div>
  );
}
