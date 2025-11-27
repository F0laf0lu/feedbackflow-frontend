import { useState } from 'react';
import { Layout, Card, Button, Space, Typography, Progress, Input, message } from 'antd';
import { 
  BarChartOutlined, 
  UsergroupAddOutlined, 
  PauseOutlined, 
  DeleteOutlined,
  CopyOutlined,
  QrcodeOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const LiveFeedbackSession = () => {

  const navigate = useNavigate()

  const [feedbackList] = useState([
    {
      id: 1,
      message: "Amazing presentation! The new roadmap looks very promising and addresses all our key concerns. Great job to the entire team.",
      timestamp: "Just now",
      sentiment: "positive"
    },
    {
      id: 2,
      message: "Could we get more details on the budget allocation for the marketing initiatives? It felt a bit vague.",
      timestamp: "1 min ago",
      sentiment: "neutral"
    },
    {
      id: 3,
      message: "When will the slides be shared with us?",
      timestamp: "3 mins ago",
      sentiment: "neutral"
    },
    {
      id: 4,
      message: "I'm really excited about the new partner program. This is a game changer!",
      timestamp: "5 mins ago",
      sentiment: "positive"
    }
  ]);

  const sentimentColors = {
    positive: '#52c41a',
    neutral: '#8c8c8c',
    negative: '#faad14'
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('https://feedback.live/a8k2m');
    message.success('Link copied to clipboard!');
  };

  const handlebackButton = ()=>{
    navigate("/home");
  }

  // Calculate sentiment percentages
  const sentimentStats = {
    positive: 60,
    neutral: 25,
    negative: 15
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
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
            Back
        </Button>


      <div
        style={{
          // background: '#fff',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          height: 72
        }}
      >
        <Space align="center" size={16}>
          <BarChartOutlined style={{ fontSize: 24, color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
            Q3 All-Hands Meeting
          </Title>
        </Space>

        <Space size={16}>
          <Space align="center" style={{ color: '#595959' }}>
            <UsergroupAddOutlined style={{ fontSize: 18 }} />
            <Text strong style={{ fontSize: 15 }}>125 Active</Text>
          </Space>
          <Button 
            type="primary" 
            size="large"
            style={{
              borderRadius: 8,
              background: '#1890ff',
              height: 40,
              fontWeight: 500
            }}
          >
            End Session
          </Button>
        </Space>
      </div>

      <div style={{ padding: '32px 48px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24 }}>
          {/* Live Feedback Section */}
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Live Feedback
              </Title>
            }
            extra={
              <Space size={16}>
                <Button icon={<PauseOutlined />}>Pause Feed</Button>
                <Button icon={<DeleteOutlined />}>Clear</Button>
              </Space>
            }
            style={{
              borderRadius: 12,
              border: '1px solid #f0f0f0',
              height: 'fit-content'
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {feedbackList.map((feedback) => (
                <div
                  key={feedback.id}
                  style={{
                    padding: '20px 24px',
                    borderLeft: `4px solid ${sentimentColors[feedback.sentiment]}`,
                    borderBottom: '1px solid #f0f0f0',
                    background: '#fff'
                  }}
                >
                  <Text style={{ fontSize: 15, lineHeight: 1.6, display: 'block', marginBottom: 8 }}>
                    {feedback.message}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {feedback.timestamp}
                  </Text>
                </div>
              ))}
            </div>
          </Card>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Share Section */}
            <Card
              style={{
                borderRadius: 12,
                border: '1px solid #f0f0f0'
              }}
            >
              <Title level={4} style={{ marginBottom: 8 }}>
                Share with your audience
              </Title>
              <Text type="secondary" style={{ fontSize: 14, display: 'block', marginBottom: 20 }}>
                Anyone with the link can send feedback.
              </Text>

              <Space.Compact style={{ width: '100%', marginBottom: 20 }}>
                <Input
                  value="https://feedback.live/a8k2m"
                  readOnly
                  style={{
                    borderRadius: '8px 0 0 8px',
                    fontSize: 14
                  }}
                />
                <Button
                  icon={<CopyOutlined />}
                  onClick={copyToClipboard}
                  style={{
                    borderRadius: '0 8px 8px 0'
                  }}
                />
              </Space.Compact>

              <div
                style={{
                  background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                  borderRadius: 12,
                  padding: 24,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    background: '#fff',
                    padding: 16,
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <QrcodeOutlined style={{ fontSize: 80, color: '#000' }} />
                </div>
              </div>
            </Card>

            {/* Live Sentiment Section */}
            <Card
              style={{
                borderRadius: 12,
                border: '1px solid #f0f0f0'
              }}
            >
              <Title level={4} style={{ marginBottom: 24 }}>
                Live Sentiment
              </Title>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: 140, height: 140 }}>
                  <Progress
                    type="circle"
                    percent={100}
                    strokeWidth={12}
                    strokeColor={{
                      '0%': '#52c41a',
                      '60%': '#52c41a',
                      '61%': '#8c8c8c',
                      '85%': '#8c8c8c',
                      '86%': '#faad14',
                      '100%': '#faad14'
                    }}
                    format={() => (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>
                          60%
                        </div>
                        <div style={{ fontSize: 14, color: '#52c41a', fontWeight: 500 }}>
                          Positive
                        </div>
                      </div>
                    )}
                    width={140}
                  />
                </div>

                <div style={{ flex: 1, marginLeft: 24 }}>
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Space size={8}>
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#52c41a'
                          }}
                        />
                        <Text>Positive</Text>
                      </Space>
                      <Text strong>60%</Text>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Space size={8}>
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#8c8c8c'
                          }}
                        />
                        <Text>Neutral</Text>
                      </Space>
                      <Text strong>25%</Text>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Space size={8}>
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#faad14'
                          }}
                        />
                        <Text>Negative</Text>
                      </Space>
                      <Text strong>15%</Text>
                    </div>
                  </Space>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeedbackSession;