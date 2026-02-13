
import { Layout, Card, Table, Button, Typography, Space, Avatar } from 'antd';
import { PlusCircleOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AppLayout = ()=>{

  const navigate = useNavigate()

    const handleDashboard = ()=>{
      navigate('/home')
    }

    return(

    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <Header
        style={{
          background: '#fff',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          height: 72
        }}
      >
        <Space align="center" size={16}>
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
          <Text strong style={{ fontSize: 20 }}>
            Feedback Aggregator
          </Text>
        </Space>

        <Space size={32}>
          <Button type="text" style={{ fontSize: 15 }} onClick={()=>{navigate('/home')}}>Dashboard</Button>
          <Button type="text" style={{ fontSize: 15 }} onClick={()=>{navigate('/past-sessions')}}>Sessions</Button>
          {/* <Button type="text" style={{ fontSize: 15 }}>Analytics</Button> */}
          {/* <Button type="text" style={{ fontSize: 15 }}>Settings</Button> */}
          {/* <Button 
            type="primary" 
            style={{
              borderRadius: 8,
              background: '#1890ff',
              height: 40,
              fontWeight: 500,
              fontSize: 15
            }}
          >
            New Session
          </Button> */}
          <Avatar
            size={44}
            style={{ background: '#ffd6b8' }}
            icon={<UserOutlined />}
          />
        </Space>
        </Header>
        <Content style={{ padding: '48px 48px 24px', display:'flex', justifyContent:'center' }}>
            <Outlet/>
        </Content>
    </Layout>

    )
}


export default AppLayout