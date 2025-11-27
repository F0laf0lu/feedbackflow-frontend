import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { Layout, Card, Form, Input, Button, Space, Avatar, Typography, Select, Col, Row, Flex, Table } from 'antd';
import { ArrowLeftOutlined, PlusCircleOutlined, UserOutlined, SearchOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const SessionHistoryPage = () => {

   const navigate = useNavigate() 

   const [searchText, setSearchText] = useState()


  const handlebackButton = ()=>{
    navigate('/home')
  }

    const handleSelect = value => {
        console.log(`selected ${value}`);
    };

    const handleSearch = (value) =>{
      console.log(value)
    }


  const handleViewSessionDetails = (sessionId)=>{
    navigate(`/session/${sessionId}`)
  }


  const columns = [
    {
      title: 'SESSION TITLE',
      dataIndex: 'sessionTitle',
      key: 'sessionTitle',
      width: '30%',
      render: text => <Title level={5}>{text}</Title>,
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
    },
    {
      title: 'Responses',
      dataIndex: 'responses',
      key: 'responses',
      width: '15%',
    },
    {
      title: 'Avg. Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: '20%',
      render: text => <Text> <StarOutlined style={{marginRight:'10px', color:'orange'}}/> {text} </Text>
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
      responses: '34',
      rating:'4.2'
    },
    {
      key: '2',
      sessionTitle: 'Marketing All-Hands',
      date: 'Oct 24, 2023',
      responses: '112',
      rating:'4.2'
    },
    {
      key: '3',
      sessionTitle: 'Q3 Investor Update',
      date: 'Oct 19, 2023',
      responses: '87',
      rating:'4.2'
    },
    {
      key: '4',
      sessionTitle: 'Q3 Investor Update',
      date: 'Oct 19, 2023',
      responses: '87',
      rating:'4.2'
    },
    {
      key: '5',
      sessionTitle: 'Q3 Investor Update',
      date: 'Oct 19, 2023',
      responses: '87',
      rating:'4.2'
    },
  ];

  



  return (
        <div style={{ padding: '48px 48px 24px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
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
            <div
                style={{
                    borderRadius: 12,
                    border: '1px solid #f0f0f0',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                }}
            >
            <div style={{ marginBottom: 40 }}>
                <Title level={2} style={{ marginBottom: 8 }}>
                    Session History
                </Title>
            </div>
            
            {/* Filters */}
            <Flex justify='space-between' style={{marginBottom: 16}}>
                <Input 
                  prefix={<SearchOutlined style={{ color: '#1890ff' }} />} 
                  size="large"  placeholder="Search session by title" style={{width:'35%'}} 
                  onChange={handleSearch}
                  value={searchText}/>
                <Space>              
                    <Select
                            size="large"
                            style={{ width: 120 }}
                            placeholder="By rating"
                            options={[
                                { value: 5, label: 5 },
                                { value: 4, label: 4 },
                                { value: 3, label: 3 },
                                { value: 2, label: 2 },
                                { value: 1, label: 1 },
                            ]}
                            onChange={(e)=>handleSearch(e.target.value)}
                        /> 
                </Space>    
            </Flex>

            {/* Table */}
            <Card style={{ borderRadius: 12, border: '1px solid #f0f0f0' }}>
                <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                showHeader={true}
                style={{ background: '#fff' }}
                onRow={(record)=>({
                  onClick: ()=> handleViewSessionDetails(record.key),
                  style: {cursor: "pointer"}
                })}
                />
        </Card>  
            </div>
        </div>
  );
};

export default SessionHistoryPage;