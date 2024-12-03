import { useState } from "react";
import { Container, Row, Col, Form, Button, Image, ListGroup } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar";
import { Link } from "react-router-dom";
import Header from "../../../Dashboard/Header/HeaderBaner";
import AvatarImage from "../../../assets/Avatar.png";
import { MessageCircle } from "lucide-react";
import "./comunitiesdiscuss.css"; // Custom styles

export default function CommunitiesDiscussion() {
  const [message, setMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const contacts = [
    { id: 1, name: "Michael John", lastMessage: "Hi, John! how are you?", time: "10:27", online: true },
    { id: 2, name: "Elizabeth Sarah", lastMessage: "Thank you for your order!", time: "9:20" },
    { id: 3, name: "Jenny Wilson", lastMessage: "Hello, Jenny", time: "7:00" },
    { id: 4, name: "Community", lastMessage: "Typing...", time: "9:20", active: true },
    { id: 5, name: "Esther Howard", lastMessage: "Hello, Esther", time: "10:27" },
    { id: 6, name: "Cody Fisher", lastMessage: "Thank you for your order!", time: "7:00" },
  ];

  const discussions = [
    { id: 1, user: "Michael John", question: "What is the capital of France?", replies: 20, votes: 30 },
    { id: 2, user: "Jenny Wilson", question: "What is the capital of Italy?", replies: 15, votes: 25 },
    { id: 3, user: "Esther Howard", question: "What is the capital of Spain?", replies: 12, votes: 20 },
    { id: 4, user: "Cody Fisher", question: "What is the capital of Germany?", replies: 8, votes: 15 },
  ];

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowQuestionForm(false); // Close form when switching contacts
  };

  const handleAskQuestionClick = () => {
    setShowQuestionForm(true); // Show the "Ask a Question" form
  };

  return (
    <Container fluid className="bg-light h-100 p-0">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
        {/* Breadcrumb Navigation */}
        <div className="d-flex align-items-center text-muted">
          <Link to="/ResidentDashboard" className="text-muted text-decoration-none">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-primary">Communities Discussion</span>
        </div>
        <Header />
      </header>

      <Row className="h-100">
        {/* Sidebar */}
        <Col md={2} className="border-end bg-white">
          <ResidentSidebar />
        </Col>

        {/* Main Chat Interface */}
        <Col md={10} className="py-4 px-3">
          <Row className="h-100">
            {/* Contacts Sidebar */}
            <Col md={3} className="border-end bg-light">
              <h5>Chat</h5>
              <Form.Control type="text" placeholder="Search Here" className="mb-3" />
              <ListGroup variant="flush">
                {contacts.map((contact) => (
                  <ListGroup.Item
                    key={contact.id}
                    active={selectedContact?.id === contact.id}
                    className="d-flex align-items-center gap-3"
                    onClick={() => handleContactClick(contact)}
                    style={{ cursor: "pointer" }}
                  >
                    <Image src={AvatarImage} roundedCircle alt={contact.name} />
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
            <Col md={9} className="d-flex flex-column bg-white p-4">
              {/* Chat Header */}
              {selectedContact && !showQuestionForm && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <Image src={AvatarImage} roundedCircle alt={selectedContact.name} />
                      <div>
                        <h6>{selectedContact.name}</h6>
                        <small className="text-muted">Last seen at {selectedContact.time}</small>
                      </div>
                    </div>
                    <div>
                      <Button variant="primary" onClick={handleAskQuestionClick}>
                        Ask Question
                      </Button>
                      <Button variant="link" className="text-muted">
                        <FaEllipsisV />
                      </Button>
                    </div>
                  </div>

                  {/* Discussions */}
                  <div className="discussion-list">
                    {discussions.map((discussion) => (
                      <div key={discussion.id} className="mb-3 border-bottom pb-3">
                        <p className="mb-1">{discussion.question}</p>
                        <small className="text-muted">
                          {discussion.replies} replies • {discussion.votes} votes
                        </small>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Ask a Question Form */}
              {showQuestionForm && (
                <div className="bg-light p-4 border rounded">
                  <h6>Writing a good question</h6>
                  <p className="text-muted">
                    You're ready to ask a programming-related question, and this form will help guide you through the
                    process.
                  </p>
                  <ul className="text-muted">
                    <li>Summarize your problem in a one-line title.</li>
                    <li>Describe your problem in more detail.</li>
                    <li>Describe what you tried and what you expected to happen.</li>
                    <li>
                      Add "tags" which help surface your question to members of the community.
                    </li>
                  </ul>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., How to find the index of an element in a vector?"
                      />
                    </Form.Group>
                    <Button variant="primary">Next</Button>
                  </Form>
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
