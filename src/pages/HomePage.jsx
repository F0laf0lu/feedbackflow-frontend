import {useNavigate} from 'react-router-dom'
import { Layout, Card, Table, Button, Typography, Space, Avatar } from 'antd';
import { PlusCircleOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const HomePage = () => {

  const navigate = useNavigate()

  const columns = [
    {
      title: 'SESSION TITLE',
      dataIndex: 'sessionTitle',
      key: 'sessionTitle',
      width: '40%',
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
      width: '30%',
    },
    {
      title: 'PARTICIPANTS',
      dataIndex: 'participants',
      key: 'participants',
      width: '20%',
    },
    {
      title: '',
      key: 'action',
      width: '10%',
      render: () => (
        <Button type="link" style={{ color: '#1890ff' }}>
          View
        </Button>
      ),
    },
  ];

  const dataSource = [
    {
      key: '1',
      sessionTitle: 'Product Design Sync',
      date: 'Oct 26, 2023',
      participants: '34 Participants',
    },
    {
      key: '2',
      sessionTitle: 'Marketing All-Hands',
      date: 'Oct 24, 2023',
      participants: '112 Participants',
    },
    {
      key: '3',
      sessionTitle: 'Q3 Investor Update',
      date: 'Oct 19, 2023',
      participants: '87 Participants',
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
        Welcome back, Alex!
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
          Recent Activity
        </Title>
        <Button type="link" style={{ color: '#1890ff', fontSize: 16 }}>
          View All
        </Button>
      </div>

      <Card style={{ borderRadius: 12, border: '1px solid #f0f0f0' }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          showHeader={true}
          style={{ background: '#fff' }}
        />
      </Card>    
    </div>

  );
};

export default HomePage;