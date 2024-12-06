import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Image, ListGroup } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../Dashboard/Header/HeaderBaner";
import AvatarImage from "../../../assets/Avatar.png";
import "./comunitiesdiscuss.css"; // Custom styles

export default function CommunitiesDiscussion() {
  const Navigate = useNavigate();
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
    { id: 1, user: "Michael John", question: "What is the capital of France?", answer: "Paris", replies: 20, votes: 30 },
    { id: 2, user: "Jenny Wilson", question: "What is the capital of Italy?", answer: "Rome", replies: 15, votes: 25 },
    { id: 3, user: "Esther Howard", question: "What is the capital of Spain?", answer: "Madrid", replies: 12, votes: 20 },
    { id: 4, user: "Cody Fisher", question: "What is the capital of Germany?", answer: "Berlin", replies: 8, votes: 15 },
  ];

  useEffect(() => {
    const defaultContact = contacts.find((contact) => contact.name === "Community");
    if (defaultContact) {
      setSelectedContact(defaultContact);
    }
  }, []);

  const handleNextClick = () => {
    Navigate("/PostAnswer");
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowQuestionForm(false);
  };

  const handleAskQuestionClick = () => {
    setShowQuestionForm(true);
  };

  return (
    <Container fluid className="bg-light h-100 p-0">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
        <div className="d-flex align-items-center text-muted">
          <Link to="/ResidentDashboard" className="text-muted text-decoration-none">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-primary">Communities Discussion</span>
        </div>
        <Header />
      </header>

      <Row className="bg-gray" style={{ height: "90vh" }}>
        <Col md={2} className="border-end bg-white">
          <ResidentSidebar />
        </Col>

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
                    onClick={() => handleContactClick(contact)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: selectedContact?.id === contact.id ? "rgb(86, 120, 233, 0.1)" : "transparent",
                    }}
                    className="d-flex align-items-center gap-3"
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

                  <div className="discussion-list">
                    {discussions.map((discussion) => (
                      <div key={discussion.id} className="mb-3 p-3 border rounded" style={{ backgroundColor: "rgb(86, 120, 233, 0.1)" }}>
                        <p className="mb-1 font-bold">{discussion.question}</p>
                        <p className="mb-1 text-muted">{discussion.answer}</p>
                        <small className="text-muted">
                          {discussion.replies} replies • {discussion.votes} votes
                        </small>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {showQuestionForm && (
                <div className="p-4 rounded">
                  <div className="p-4 border rounded" style={{ backgroundColor: "rgb(86, 120, 233, 0.2)" }}>
                    <h5 style={{ fontWeight: "600" }}>Writing a good question</h5>
                    <p className="text-muted">
                      You are ready to ask a programming-related question, and this form will help guide you through the process.
                    </p>
                    <h6 style={{ fontWeight: "600" }}>Steps</h6>
                    <ul className="text-muted" style={{ listStyleType: "circle" }}>
                      <li>Summarize your problem in a one-line title.</li>
                      <li>Describe your problem in more detail.</li>
                      <li>Describe what you tried and what you expected to happen.</li>
                      <li>Add tags to help surface your question to the community.</li>
                    </ul>
                  </div>
                  <div className="my-3 bg-light p-4 border rounded">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <p>Be specific and imagine you're asking a question to another person.</p>
                        <Form.Control type="text" placeholder="e.g., How to find the index of an element in a vector?" />
                      </Form.Group>
                      <Button variant="primary" onClick={handleNextClick}>
                        Next
                      </Button>
                    </Form>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
