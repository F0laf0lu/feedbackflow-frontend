import { Card, Button, Space, Typography, Tag, Row, Col } from 'antd';
import { 
  CheckCircleOutlined, 
  ExportOutlined, 
  FileTextOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SessionSummaryPage = () => {
    const navigate = useNavigate()

  const keyThemes = [
    { word: 'Engaging', color: '#e6f4ff' },
    { word: 'Insightful', color: '#d4f5e9' },
    { word: 'Clarity', color: '#f5f5f5' },
    { word: 'Helpful', color: '#d4f5e9' },
    { word: 'Data', color: '#f5f5f5' },
    { word: 'Examples', color: '#f5f5f5' }
  ];

 const handlebackButton = ()=>{
    navigate(-1);
  }

  return (
      <div style={{ padding: '48px 48px 24px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
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
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={3} style={{ marginBottom: 8, fontSize: 25, fontWeight: 700 }}>
              Q4 Marketing Strategy Review
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Session Date: October 26, 2023
            </Text>
          </div>
          <Tag
            icon={<CheckCircleOutlined />}
            style={{
              padding: '8px 16px',
              fontSize: 15,
              borderRadius: 8,
              background: '#e6f4ff',
              border: '1px solid #91caff',
              color: '#0958d9'
            }}
          >
            Completed Session
          </Tag>
        </div>

        <Card
          style={{
            borderRadius: 12,
            border: '1px solid #f0f0f0',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
          }}
        >
          <Title level={3} style={{ marginBottom: 32 }}>
            Session Performance Summary
          </Title>

          {/* Stats Row */}
          <Row gutter={48} style={{ marginBottom: 48 }}>
            <Col span={8}>
              <div>
                <Text type="secondary" style={{ fontSize: 15, display: 'block', marginBottom: 8 }}>
                  Total Feedback
                </Text>
                <Title level={1} style={{ margin: 0, fontSize: 48, fontWeight: 700 }}>
                  1,284
                </Title>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Text type="secondary" style={{ fontSize: 15, display: 'block', marginBottom: 8 }}>
                  Overall Sentiment
                </Text>
                <Title level={1} style={{ margin: 0, fontSize: 48, fontWeight: 700 }}>
                  8.2/10
                </Title>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Text type="secondary" style={{ fontSize: 15, display: 'block', marginBottom: 8 }}>
                  Audience Peak
                </Text>
                <Title level={1} style={{ margin: 0, fontSize: 48, fontWeight: 700 }}>
                  350
                </Title>
              </div>
            </Col>
          </Row>

          {/* Sentiment Breakdown */}
          <div style={{ marginBottom: 48 }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              Sentiment Breakdown
            </Title>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', width: '100%', height: 32, borderRadius: 8, overflow: 'hidden' }}>
                <div
                  style={{
                    width: '70%',
                    background: '#52c41a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  70%
                </div>
                <div
                  style={{
                    width: '20%',
                    background: '#8c8c8c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  20%
                </div>
                <div
                  style={{
                    width: '10%',
                    background: '#ff4d4f',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  10%
                </div>
              </div>
            </div>

            <Space size={24}>
              <Space size={8}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: '#52c41a'
                  }}
                />
                <Text style={{ fontSize: 14 }}>Positive</Text>
              </Space>
              <Space size={8}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: '#8c8c8c'
                  }}
                />
                <Text style={{ fontSize: 14 }}>Neutral</Text>
              </Space>
              <Space size={8}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: '#ff4d4f'
                  }}
                />
                <Text style={{ fontSize: 14 }}>Negative</Text>
              </Space>
            </Space>
          </div>

          {/* Key Themes */}
          <div style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 8 }}>
              Key Themes
            </Title>
            <Text type="secondary" style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>
              Most frequent words in positive feedback
            </Text>
            <Space size={12} wrap>
              {keyThemes.map((theme, index) => (
                <Tag
                  key={index}
                  style={{
                    padding: '6px 16px',
                    fontSize: 14,
                    borderRadius: 6,
                    background: theme.color,
                    border: 'none',
                    color: '#000'
                  }}
                >
                  {theme.word}
                </Tag>
              ))}
            </Space>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 24, borderTop: '1px solid #f0f0f0' }}>
            <Button
              size="large"
              icon={<ExportOutlined />}
              style={{
                borderRadius: 8,
                height: 44,
                fontSize: 15,
                fontWeight: 500
              }}
            >
              Export Summary
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<FileTextOutlined />}
              style={{
                borderRadius: 8,
                background: '#1890ff',
                height: 44,
                fontSize: 15,
                fontWeight: 500
              }}
            >
              View Full Report
            </Button>
          </div>
        </Card>
      </div>
  );
};

export default SessionSummaryPage;