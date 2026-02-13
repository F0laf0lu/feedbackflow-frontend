import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const { Text } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // TODO: integrate with auth API
    console.log('Register values:', values);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f2f5',
    }}>
      <div style={{
        width: 420,
        background: '#fff',
        borderRadius: 16,
        padding: '40px 36px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 50 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(45deg)',
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                background: '#fff',
                borderRadius: 2,
                transform: 'rotate(-45deg)',
              }}
            />
          </div>
          <span style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>FeedbackLoop</span>
        </div>

        {/* Heading */}
        <Text style={{ color: '#8c8c8c', display: 'block', marginTop: 8, marginBottom: 28 }}>
          Create your account to get started.
        </Text>

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Username</span>}
            name="username"
            rules={[{ required: true, message: 'Please enter a username' }]}
          >
            <Input
              placeholder="Enter your username"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Email Address</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input
              placeholder="Enter your email address"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Password</span>}
            name="password"
            rules={[
              { required: true, message: 'Please enter a password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              size="large"
              style={{ borderRadius: 8 }}
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Confirm Password</span>}
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input.Password
              placeholder="Confirm your password"
              size="large"
              style={{ borderRadius: 8 }}
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{
                borderRadius: 8,
                height: 48,
                fontSize: 16,
                fontWeight: 600,
                background: '#4a7bf7',
              }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text style={{ color: '#8c8c8c' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 600 }}>Log in</Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
