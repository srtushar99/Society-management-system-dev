import { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, ListGroup } from 'react-bootstrap';
import { FaVideo, FaPhone, FaSmile, FaPaperclip, FaMicrophone, FaEllipsisV, FaArrowRight } from 'react-icons/fa';
import ResidentSidebar from '../../Resident Sidebar/ResidentSidebar';
import { Link } from 'react-router-dom';
import Header from '../../../Dashboard/Header/HeaderBaner';
import AvatarImage from '../../../assets/Avatar.png';
import './AccessForums.css'; // Import CSS file for custom scrollbar

export default function AccessForums() {
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

  const messages = {
    1: [
      { id: 1, sender: "Michael John", content: "Hi there, How are you?", time: "9:20" },
      { id: 2, sender: "User", content: "Waiting for your reply. I have to travel long distance.", time: "9:22" }
    ],
    4: [
      { id: 1, sender: "Arlene McCoy", content: "Hi there, How are you?", time: "9:20" },
      { id: 2, sender: "User", content: "Waiting for your reply. I have to travel long distance.", time: "9:22" },
      { id: 3, sender: "Arlene McCoy", content: "Hi, I am coming there in few minutes. Please wait!", time: "9:30" },
      { id: 4, sender: "Arlene McCoy", image: "https://media.istockphoto.com/id/534696671/photo/the-9k58-smerch-300mm-multiple-launch-rocket-system.jpg?s=612x612&w=0&k=20&c=GRF0jwT_xRvGAifU-ELkbXmmYp4k89OZO_DJUjZGP_c= ", time: "9:45" },
      { id: 5, sender: "User", file: { name: "document.pdf", size: "2.3 MB" }, time: "10:00" }
    ]
  };

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
            Access Forums
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
                        <Button variant="link"><FaVideo /></Button>
                        <Button variant="link"><FaPhone /></Button>
                        <Button variant="link"><FaEllipsisV /></Button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow-1 overflow-auto mb-3 px-3 chat-messages">
                      {messages[selectedContact.id]?.map(msg => (
                        <div key={msg.id} className={`d-flex ${msg.sender === 'User' ? 'justify-content-end' : ''} mb-2`}>
                          <div className={`p-2 rounded ${msg.sender === 'User' ? 'text-white' : 'bg-light'}`} style={{ backgroundColor: msg.sender === 'User' ? "#5678E9" : "white" }}>
                            {msg.content && <div>{msg.content}</div>}
                            {msg.image && <Image src={msg.image} style={{ width: "300px",height:"200px" }} className='img-fluid' rounded fluid />}
                            {msg.file && (
                              <div className="d-flex align-items-center gap-2">
                                <span><strong>{msg.file.name}</strong> - {msg.file.size}</span>
                              </div>
                            )}
                            <small className="text-muted d-block mt-1">{msg.time}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Message Input */}
                <Form className="d-flex align-items-center gap-2 border-top p-3">
                  <Button variant="link"><FaSmile /></Button>
                  <Form.Control type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />
                  <Button variant="link"><FaPaperclip /></Button>
                  <Button variant="link"><FaMicrophone /></Button>
                  <Button disabled={!message} variant="primary"><FaArrowRight /></Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </div>
      </Row>
    </Container>
  );
}
