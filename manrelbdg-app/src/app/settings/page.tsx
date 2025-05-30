'use client';

import MainLayout from '@/components/layout/MainLayout';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  Typography,
  Divider,
  Upload,
  Avatar,
  notification
} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  LockOutlined,
  SettingOutlined,
  BellOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function SettingsPage() {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProfileSave = (values: any) => {
    console.log('Profile values:', values);
    notification.success({
      message: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePasswordChange = (values: any) => {
    console.log('Password values:', values);
    notification.success({
      message: 'Password Changed',
      description: 'Your password has been changed successfully.',
    });
    passwordForm.resetFields();
  };

  const handleNotificationChange = (key: string, checked: boolean) => {
    console.log(`${key}: ${checked}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <Title level={2} className="mb-2">Settings</Title>
          <p className="text-gray-600">
            Kelola pengaturan akun dan preferensi aplikasi
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="xl:col-span-2 space-y-6">
            <Card 
              title={
                <div className="flex items-center">
                  <UserOutlined className="mr-2" />
                  Profile Information
                </div>
              }
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleProfileSave}
                initialValues={{
                  name: 'Administrator',
                  email: 'admin@manrelbdg.com',
                  phone: '08123456789',
                  role: 'admin',
                  bio: 'System Administrator untuk MANRELBDG'
                }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar size={80} icon={<UserOutlined />} />
                  <div>
                    <Upload>
                      <Button icon={<UploadOutlined />}>
                        Change Avatar
                      </Button>
                    </Upload>
                    <div className="text-sm text-gray-500 mt-1">
                      JPG, PNG max 2MB
                    </div>
                  </div>
                </div>

                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ required: true, message: 'Please input your phone!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Role"
                  name="role"
                >
                  <Select disabled>
                    <Option value="admin">Administrator</Option>
                    <Option value="coordinator">Coordinator</Option>
                    <Option value="user">User</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Bio"
                  name="bio"
                >
                  <TextArea rows={3} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Save Profile
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            {/* Change Password */}
            <Card 
              title={
                <div className="flex items-center">
                  <LockOutlined className="mr-2" />
                  Change Password
                </div>
              }
            >
              <Form
                form={passwordForm}
                layout="vertical"
                onFinish={handlePasswordChange}
              >
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    { required: true, message: 'Please input your new password!' },
                    { min: 8, message: 'Password must be at least 8 characters!' }
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm New Password"
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Change Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>

          {/* App Settings */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <Card 
              title={
                <div className="flex items-center">
                  <BellOutlined className="mr-2" />
                  Notifications
                </div>
              }
              size="small"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Text strong>Email Notifications</Text>
                    <div className="text-sm text-gray-500">
                      Receive email updates
                    </div>
                  </div>
                  <Switch 
                    defaultChecked 
                    onChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>

                <Divider className="my-3" />

                <div className="flex justify-between items-center">
                  <div>
                    <Text strong>New Volunteer Alert</Text>
                    <div className="text-sm text-gray-500">
                      Alert when new volunteer joins
                    </div>
                  </div>
                  <Switch 
                    defaultChecked 
                    onChange={(checked) => handleNotificationChange('newVolunteer', checked)}
                  />
                </div>

                <Divider className="my-3" />

                <div className="flex justify-between items-center">
                  <div>
                    <Text strong>Data Export Complete</Text>
                    <div className="text-sm text-gray-500">
                      Notify when export is ready
                    </div>
                  </div>
                  <Switch 
                    defaultChecked 
                    onChange={(checked) => handleNotificationChange('exportComplete', checked)}
                  />
                </div>

                <Divider className="my-3" />

                <div className="flex justify-between items-center">
                  <div>
                    <Text strong>System Updates</Text>
                    <div className="text-sm text-gray-500">
                      Important system notifications
                    </div>
                  </div>
                  <Switch 
                    defaultChecked 
                    onChange={(checked) => handleNotificationChange('systemUpdates', checked)}
                  />
                </div>
              </div>
            </Card>

            {/* System Settings */}
            <Card 
              title={
                <div className="flex items-center">
                  <SettingOutlined className="mr-2" />
                  System Settings
                </div>
              }
              size="small"
            >
              <div className="space-y-4">
                <div>
                  <Text strong className="block mb-2">Language</Text>
                  <Select defaultValue="id" style={{ width: '100%' }}>
                    <Option value="id">Bahasa Indonesia</Option>
                    <Option value="en">English</Option>
                  </Select>
                </div>

                <div>
                  <Text strong className="block mb-2">Time Zone</Text>
                  <Select defaultValue="jakarta" style={{ width: '100%' }}>
                    <Option value="jakarta">Asia/Jakarta (WIB)</Option>
                    <Option value="makassar">Asia/Makassar (WITA)</Option>
                    <Option value="jayapura">Asia/Jayapura (WIT)</Option>
                  </Select>
                </div>

                <div>
                  <Text strong className="block mb-2">Date Format</Text>
                  <Select defaultValue="dd/mm/yyyy" style={{ width: '100%' }}>
                    <Option value="dd/mm/yyyy">DD/MM/YYYY</Option>
                    <Option value="mm/dd/yyyy">MM/DD/YYYY</Option>
                    <Option value="yyyy-mm-dd">YYYY-MM-DD</Option>
                  </Select>
                </div>

                <Divider className="my-3" />

                <div className="flex justify-between items-center">
                  <div>
                    <Text strong>Dark Mode</Text>
                    <div className="text-sm text-gray-500">
                      Switch to dark theme
                    </div>
                  </div>
                  <Switch onChange={(checked) => console.log('Dark mode:', checked)} />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <Text strong>Auto Backup</Text>
                    <div className="text-sm text-gray-500">
                      Daily automatic backup
                    </div>
                  </div>
                  <Switch 
                    defaultChecked 
                    onChange={(checked) => console.log('Auto backup:', checked)} 
                  />
                </div>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card 
              title="Danger Zone"
              size="small"
            >
              <div className="space-y-3">
                <Button danger block>
                  Clear All Cache
                </Button>
                <Button danger block>
                  Reset Settings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
