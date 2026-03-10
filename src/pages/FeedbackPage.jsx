import { useState, useRef, useEffect } from 'react';
import { Layout, Card, Button, Space, Typography, Progress, Input, message } from 'antd';
import {
  BarChartOutlined,
  UsergroupAddOutlined,
  CaretRightOutlined,
  PauseOutlined,
  DeleteOutlined,
  CopyOutlined,
  QrcodeOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getSession, endSession } from '../api/sessions';

const { Title, Text } = Typography;

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL ?? 'ws://localhost:8000';

const LiveFeedbackSession = () => {

  const { id: sessionId } = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [started, setStarted] = useState(false)
  const [feedbackList, setFeedbackList] = useState([])
  const [activeUsers, setActiveUsers] = useState(0)
  const wsRef = useRef(null)

  useEffect(() => {
    getSession(sessionId).then(({ data: res }) => setSession(res.data))
    return () => wsRef.current?.close()
  }, [sessionId])

  const handleStart = () => {
    const ws = new WebSocket(`${WS_BASE_URL}/ws/session/${sessionId}/`)
    wsRef.current = ws

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'feedback') {
        setFeedbackList((prev) => [data, ...prev])
      }
      if (data.type === 'active_count') {
        setActiveUsers(data.count)
      }
    }

    ws.onerror = () => message.error('Connection error.')
    setStarted(true)
  }

  const handleEnd = async () => {
    wsRef.current?.close()
    wsRef.current = null
    setStarted(false)
    try {
      await endSession(sessionId)
      message.success('Session ended successfully')
    } catch {
      message.error('Failed to end session')
    }
    navigate('/home')
  }

  const sentimentColors = {
    positive: '#52c41a',
    neutral: '#8c8c8c',
    negative: '#faad14'
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    message.success('Link copied to clipboard!');
  };

  const shareLink = session?.audience_code
    ? `${window.location.origin}/${session.audience_code}`
    : ''

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
    <div style={{ minHeight: '100vh', background: '#f5f5f5', width: '100%' }}>
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
            {session?.title ?? 'Live Session'}
          </Title>
        </Space>

        <Space size={16}>
          <Space align="center" style={{ color: '#595959' }}>
            <UsergroupAddOutlined style={{ fontSize: 18 }} />
            <Text strong style={{ fontSize: 15 }}>{activeUsers} Active</Text>
          </Space>
          {!started ? (
            <Button
              type="primary"
              size="large"
              icon={<CaretRightOutlined />}
              style={{ borderRadius: 8, background: '#52c41a', height: 40, fontWeight: 500 }}
              onClick={handleStart}
            >
              Start Livefeedback
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              danger
              style={{ borderRadius: 8, height: 40, fontWeight: 500 }}
              onClick={handleEnd}
            >
              End Session
            </Button>
          )}
        </Space>
      </div>

      <div style={{ padding: '32px 48px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24, alignItems: 'start' }}>
          {/* Live Feedback Section */}
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Live Feedback
              </Title>
            }
            extra={
              started ? (
                <Space size={16}>
                  <Button icon={<PauseOutlined />}>Pause Feed</Button>
                  <Button icon={<DeleteOutlined />}>Clear</Button>
                </Space>
              ) : null
            }
            style={{
              borderRadius: 12,
              border: '1px solid #f0f0f0',
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div style={{ height: '65vh', overflowY: 'auto' }}>
              {feedbackList.map((feedback) => (
                <div
                  key={feedback.created_at}
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
                    {new Date(feedback.created_at).toLocaleTimeString()}
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
              <Text type="secondary" style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>
                Anyone with the link can send feedback.
              </Text>

              {/* Audience Code */}
              <div style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block', marginBottom: 6 }}>AUDIENCE CODE</Text>
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    value={session?.audience_code ?? ''}
                    readOnly
                    style={{ borderRadius: '8px 0 0 8px', fontSize: 20, fontWeight: 700, letterSpacing: 4, textAlign: 'center' }}
                  />
                  <Button
                    icon={<CopyOutlined />}
                    onClick={() => {
                      navigator.clipboard.writeText(session?.audience_code ?? '');
                      message.success('Code copied!');
                    }}
                    style={{ borderRadius: '0 8px 8px 0' }}
                  />
                </Space.Compact>
              </div>

              {/* Share Link */}
              <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block', marginBottom: 6 }}>SHARE LINK</Text>
              <Space.Compact style={{ width: '100%', marginBottom: 20 }}>
                <Input
                  value={shareLink}
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

            {/* Live Sentiment Section — only shown after session starts */}
            {started && <Card
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
            </Card>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeedbackSession;