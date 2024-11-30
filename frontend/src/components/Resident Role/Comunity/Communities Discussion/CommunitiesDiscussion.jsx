import { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, ListGroup } from 'react-bootstrap';
import { FaVideo, FaPhone, FaSmile, FaPaperclip, FaMicrophone, FaEllipsisV, FaArrowRight } from 'react-icons/fa';
import ResidentSidebar from '../../Resident Sidebar/ResidentSidebar';
import { Link } from 'react-router-dom';
import Header from '../../../Dashboard/Header/HeaderBaner';
import AvatarImage from '../../../assets/Avatar.png';
import '.././Access Forums/AccessForums.css'; // Import CSS file for custom scrollbar
import { MessageCircle, MoreHorizontal } from 'lucide-react';

export default function CommunitiesDiscussion() {
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(null); // Track the selected contact

  const contacts = [
    { id: 1, name: "Michael John", lastMessage: "Hi, John! how are you?", time: "10:27", online: true },
    { id: 2, name: "Elizabeth Sarah", lastMessage: "Thank you for your order!", time: "9:20" },
    { id: 3, name: "Jenny Wilson", lastMessage: "Hello, Jenny", time: "7:00" },
    { id: 4, name: "Arlene McCoy", lastMessage: "Typing...", time: "9:20", active: true },
    { id: 5, name: "Esther Howard", lastMessage: "Hello, Esther", time: "10:27" },
    { id: 6, name: "Cody Fisher", lastMessage: "Thank you for your order!", time: "7:00" }
  ];
  const discussions = [
    {
      id: 1,
      user: 'Michael John',
      time: '2 min ago',
      question: 'What is the capital of France?',
      replies: 20,
      votes: 30
    },
    {
      id: 2,
      user: 'Jenny Wilson',
      time: '5 min ago',
      question: 'What is the capital of France?',
      replies: 15,
      votes: 25
    },
    {
      id: 3,
      user: 'Esther Howard',
      time: '3 hours ago',
      question: 'What is the capital of France?',
      replies: 12,
      votes: 20
    },
    {
      id: 4,
      user: 'Cody Fisher',
      time: '5 hours ago',
      question: 'What is the capital of France?',
      replies: 8,
      votes: 15
    }
  ];
  

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <Container fluid className="bg-light h-100 p-0">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
        {/* Breadcrumb Navigation */}
        <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-80">
          <Link
            to="/ResidentDashboard"
            className="text-muted text-decoration-none font-weight-semibold text-sm sm:text-base"
          >
            Home
          </Link>
          <span className="text-muted mx-2 text-sm sm:text-base"> &gt; </span>
          <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
          Communities Discussion
          </span>
        </div>
        <Header />
      </header>

      <Row className="h-100">
        <div className='col-2'>
          {/* Sidebar */}
          <Col md={2} className="border-end bg-white">
            <ResidentSidebar />
          </Col>
        </div>

        {/* Main Chat Interface */}
        <div className='col-10 py-2'>
          <Col md={12} className="d-flex flex-column border py-5 mx-1" style={{ borderRadius: "10px" }}>
            <Row className="h-100 py-2">
              {/* Contacts Sidebar */}
              <Col md={3} className="border-end bg-light">
                <h5>Chat</h5>
                <Form.Control type="text" placeholder="Search Here" className="mb-3" />
                <ListGroup variant="flush" className="contacts-sidebar">
                  {contacts.map(contact => (
                    <ListGroup.Item
                      key={contact.id}
                      active={selectedContact?.id === contact.id}
                      className="d-flex align-items-center gap-3"
                      onClick={() => handleContactClick(contact)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Image roundedCircle src={AvatarImage} alt={contact.name} />
                      <div>
                        <strong>{contact.name}</strong>
                        <div className="text-muted small">{contact.lastMessage}</div>
                      </div>
                      <small className="ms-auto">{contact.time}</small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>

              {/* Chat Area */}
              <Col md={8} className="d-flex flex-column bg-white ms-2 chat-area ">
                {/* Chat Header */}
                {selectedContact && (
                  <>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2  ">
                      <div className="d-flex align-items-center gap-3 py-2">
                        <Image roundedCircle src={AvatarImage} alt={selectedContact.name} />
                        <div>
                          <h6>{selectedContact.name}</h6>
                          <small className="text-muted">Last seen at {selectedContact.time}</small>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <Button>Ask Quiestion</Button>
                        <Button variant="link" style={{color:"gray"}}><FaEllipsisV /></Button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="divide-y">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="flex space-x-4 p-4">
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        
                       
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                       
                      </button>
                    </div>
                    <p className="mt-2 text-gray-800">{discussion.question}</p>
                    <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{discussion.replies} Replies</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>•</span>
                        <span>{discussion.votes} Votes</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                  </>
                )}

                {/* Message Input */}
                
              </Col>
            </Row>
          </Col>
        </div>
      </Row>
    </Container>
  );
}
