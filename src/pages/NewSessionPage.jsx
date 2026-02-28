import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Layout, Card, Form, Input, Button, Typography, Alert } from 'antd';
import { ArrowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { createSession } from '../api/sessions';
import 'antd/dist/reset.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const CreateSessionPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const { data: res } = await createSession(values);
      navigate(`/session/${res.data.id}/livefeedback`);
    } catch (err) {
      const { errors, message } = err.response?.data ?? {};
      if (errors && typeof errors === 'object') {
        form.setFields(
          Object.entries(errors).map(([name, msg]) => ({
            name,
            errors: [Array.isArray(msg) ? msg[0] : msg],
          }))
        );
      } else {
        setError(message ?? 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlebackButton = ()=>{
    navigate('/home')
  }

  return (
      <Content style={{ padding: '48px 48px 24px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          style={{ 
            marginBottom: 32, 
            padding: '4px 8px',
            color: '#666',
            fontSize: 15
          }}
          onClick={()=>handlebackButton()}
        >
          Back to Dashboard
        </Button>

        <Card
          style={{
            borderRadius: 12,
            border: '1px solid #f0f0f0',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ marginBottom: 40 }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Start a New Feedback Session
            </Title>
            <Text type="secondary" style={{ fontSize: 15 }}>
              Create a new session to start gathering live feedback from your audience.
            </Text>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 24, borderRadius: 8 }}
            />
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              label={<span style={{ fontSize: 15, fontWeight: 500 }}>Session Title</span>}
              name="title"
              rules={[{ required: true, message: 'Please enter a session title' }]}
            >
              <Input
                placeholder="e.g., Q4 All-Hands Meeting"
                size="large"
                style={{
                  borderRadius: 8,
                  fontSize: 15,
                }}
              />
            </Form.Item>

            <Form.Item
              label={
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>Description</span>
                </div>
              }
              name="description"
              style={{ marginBottom: 32 }}
            >
              <TextArea
                placeholder="Add a short description for your session..."
                rows={6}
                style={{
                  borderRadius: 8,
                  fontSize: 15,
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                icon={<PlusCircleOutlined />}
                style={{
                  borderRadius: 8,
                  background: '#4096ff',
                  fontSize: 15,
                  height: 44,
                  paddingLeft: 24,
                  paddingRight: 24,
                  fontWeight: 500,
                }}
              >
                Create Session
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
  );
};

export default CreateSessionPage;