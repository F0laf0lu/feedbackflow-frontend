import { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { joinSession } from '../api/sessions';

const { Title, Text } = Typography;

const JoinPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = async ({ code }) => {
    setLoading(true);
    setError(null);
    try {
      const { data: res } = await joinSession(code.trim());
      navigate(`/${code.trim()}`, { state: { sessionId: res.data.id } });
    } catch (err) {
      const { message } = err.response?.data ?? {};
      setError(message ?? 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
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
        textAlign: 'center',
      }}>
        <div style={{
          width: 56,
          height: 56,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <div style={{
            width: 24,
            height: 24,
            background: '#fff',
            borderRadius: 4,
            transform: 'rotate(45deg)',
          }} />
        </div>

        <Title level={3} style={{ marginBottom: 8 }}>Join a Session</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
          Enter the audience code shared by the presenter.
        </Text>

        <Form onFinish={onFinish} layout="vertical">
          {error && (
            <Alert message={error} type="error" showIcon style={{ marginBottom: 16, borderRadius: 8 }} />
          )}
          <Form.Item
            name="code"
            rules={[{ required: true, message: 'Please enter an audience code' }]}
          >
            <Input
              placeholder="Enter audience code"
              size="large"
              style={{ borderRadius: 8, textAlign: 'center', letterSpacing: 4, fontSize: 18 }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{ borderRadius: 8, height: 48, fontWeight: 600, fontSize: 16 }}
            >
              Join
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default JoinPage;
