import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, BarChartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // TODO: integrate with auth API
    console.log('Login values:', values);
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
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
          {/* <BarChartOutlined style={{ fontSize: 28, color: '#4472c4' }} /> */}
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
          Welcome back! Please enter your details.
        </Text>

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Email or Username</span>}
            name="email"
            rules={[{ required: true, message: 'Please enter your email or username' }]}
          >
            <Input
              placeholder="Enter your email or username"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label={
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontWeight: 600 }}>Password</span>
              </div>
            }
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
            style={{ marginBottom: 24 }}
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
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text style={{ color: '#8c8c8c' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ fontWeight: 600 }}>Sign up</Link>
          </Text>
        </div>
        {/* <div style={{ textAlign: 'center' }}>
          <Text style={{ color: '#8c8c8c' }}>
            <Link to="/register" style={{ fontWeight: 600 }}>Forgot Password</Link>
          </Text>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
