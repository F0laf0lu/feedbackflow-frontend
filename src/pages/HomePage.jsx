import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Card, Table, Button, Typography, Space } from 'antd';
import { PlusCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { getRecentSessions } from '../api/sessions';
import 'antd/dist/reset.css';

const { Title, Text } = Typography;

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRecentSessions()
      .then(({ data: res }) => setSessions(res.data ?? []))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false))
  }, [])

  const columns = [
    {
      title: 'SESSION TITLE',
      dataIndex: 'title',
      key: 'title',
      width: '40%',
    },
    {
      title: 'DATE',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '30%',
    },
    {
      title: 'PARTICIPANTS',
      dataIndex: 'audience_peak',
      key: 'audience_peak',
      width: '20%',
      render: (count) => `${count ?? 0} Participants`,
    },
    {
      title: '',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Button type="link" style={{ color: '#1890ff' }} onClick={() => navigate(`/session/${record.id}`)}>
          View
        </Button>
      ),
    },
  ];

  const handleStartSession = ()=>{
    navigate('/new-session')
  }

  const handlePastSession = ()=>{
    navigate('/past-sessions')
  }

  return (

    <div style={{width:'75%'}}>
      <Title level={2} style={{ marginBottom: 40 }}>
        Welcome back, {user.username}!
      </Title>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
        <Card
          hoverable
          style={{ borderRadius: 12, border: '1px solid #f0f0f0'}}
          onClick={() => handleStartSession()}
        >
          <Space direction="vertical" size={12}>
            <div
              style={{
                width: 48,
                height: 48,
                background: '#e6f7ff',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            > 
              
              <PlusCircleOutlined style={{ fontSize: 24, color: '#1890ff' }} />
              
            </div>
            <Title level={4} style={{ margin: 0 }}>
              Start a New Session
            </Title>
            <Text type="secondary">
              Create a new event and start collecting live feedback.
            </Text>
          </Space>
        </Card>

        <Card
          hoverable
          style={{ borderRadius: 12, border: '1px solid #f0f0f0' }}
          onClick={() => handlePastSession()}
        >
          <Space direction="vertical" size={12}>
            <div
              style={{
                width: 48,
                height: 48,
                background: '#e6f7ff',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ClockCircleOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            </div>
            <Title level={4} style={{ margin: 0 }}>
              View Past Sessions
            </Title>
            <Text type="secondary">
              Analyze reports and insights from your previous events.
            </Text>
          </Space>
        </Card>
      </div>

      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ margin: 0 }}>
          Recent Sessions
        </Title>
        <Button type="link" style={{ color: '#1890ff', fontSize: 16 }} 
        onClick={() => handlePastSession()}>
          View All
        </Button>
      </div>

      <Card style={{ borderRadius: 12, border: '1px solid #f0f0f0' }}>
        <Table
          columns={columns}
          dataSource={sessions}
          rowKey="id"
          loading={loading}
          pagination={false}
          showHeader={true}
          style={{ background: '#fff' }}
        />
      </Card>    
    </div>

  );
};

export default HomePage;