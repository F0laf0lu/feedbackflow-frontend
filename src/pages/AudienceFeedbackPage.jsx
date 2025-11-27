import React, { useState } from 'react';
import { Layout, Form, Input, Button, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const FeedbackSubmissionForm = () => {
  const [form] = Form.useForm();
  const [charCount, setCharCount] = useState(0);
  const maxLength = 500;

  const handleTextChange = (e) => {
    setCharCount(e.target.value.length);
  };

  const onFinish = (values) => {
    console.log('Feedback submitted:', values);
    // Handle form submission
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
        }}
      >
        <div style={{ maxWidth: 600, width: '100%', textAlign: 'center' }}>
          <Title
            level={1}
            style={{
              marginBottom: 16,
              fontSize: 48,
              fontWeight: 700,
              color: '#1f1f1f',
            }}
          >
            Share Your Feedback
          </Title>

          <Text
            type="secondary"
            style={{
              fontSize: 16,
              display: 'block',
              marginBottom: 48,
              color: '#8c8c8c',
            }}
          >
            Your submission is anonymous and will be shared live with the presenter.
          </Text>

          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="feedback"
              rules={[
                { required: true, message: 'Please enter your feedback' },
                { max: maxLength, message: `Feedback cannot exceed ${maxLength} characters` },
              ]}
            >
              <div style={{ position: 'relative' }}>
                <TextArea
                  placeholder="What's on your mind? Ask a question or leave a comment..."
                  onChange={handleTextChange}
                  maxLength={maxLength}
                  rows={8}
                  style={{
                    borderRadius: 12,
                    fontSize: 16,
                    padding: '16px',
                    border: '2px solid #1890ff',
                    resize: 'none',
                  }}
                />
                <div
                  style={{
                    textAlign: 'right',
                    marginTop: 8,
                    color: '#8c8c8c',
                    fontSize: 14,
                  }}
                >
                  {charCount} / {maxLength}
                </div>
              </div>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: 32 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{
                  borderRadius: 12,
                  background: '#1890ff',
                  fontSize: 17,
                  height: 56,
                  fontWeight: 600,
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(24, 144, 255, 0.3)',
                }}
              >
                Submit Feedback
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default FeedbackSubmissionForm;