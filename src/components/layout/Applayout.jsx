
import { Layout, Button, Typography, Space, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';

const { Header, Content } = Layout;
const { Text } = Typography;

const AppLayout = ()=>{
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      // proceed regardless
    }
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }

  const avatarMenu = {
    items: [
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
        danger: true,
        onClick: handleLogout,
      },
    ],
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
          <Dropdown menu={avatarMenu} placement="bottomRight" trigger={['click']}>
            <Avatar
              size={44}
              style={{ background: '#ffd6b8', color: '#d46b08', fontWeight: 600, cursor: 'pointer' }}
            >
              {user.username?.[0]?.toUpperCase() ?? <UserOutlined />}
            </Avatar>
          </Dropdown>
        </Space>
        </Header>
        <Content style={{ padding: '48px 48px 24px', display:'flex', justifyContent:'center' }}>
            <Outlet/>
        </Content>
    </Layout>

    )
}


export default AppLayout