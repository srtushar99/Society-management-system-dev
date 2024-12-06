import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image, ListGroup } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../../../Dashboard/Header/HeaderBaner";
import AvatarImage from "../../../assets/Avatar.png";

import "../Communities Discussion/comunitiesdiscuss.css"; // Custom styles

export default function PostAnswer() {
    const Navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showQuestionForm, setShowQuestionForm] = useState(false); // State for the user's typed message
  const [answers, setAnswers] = useState([ // State to manage the list of answers
    "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.",
    "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.",
    "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.",
  ]);

  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = [
    { id: 1, name: "Michael John", lastMessage: "Hi, John! how are you?", time: "10:27", online: true },
    { id: 2, name: "Elizabeth Sarah", lastMessage: "Thank you for your order!", time: "9:20" },
    { id: 3, name: "Jenny Wilson", lastMessage: "Hello, Jenny", time: "7:00" },
    { id: 4, name: "Community", lastMessage: "Typing...", time: "9:20", active: true },
    { id: 5, name: "Esther Howard", lastMessage: "Hello, Esther", time: "10:27" },
    { id: 6, name: "Cody Fisher", lastMessage: "Thank you for your order!", time: "7:00" },
  ];

  useEffect(() => {
    // Automatically set the "Community" chat as active by default
    const defaultContact = contacts.find((contact) => contact.name === "Community");
    if (defaultContact) {
      setSelectedContact(defaultContact);
    }
  }, []);

  const handleNextClick = () => {
    Navigate("/CommunitiesDiscussion");
  };
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowQuestionForm(false);
  };
  const handleAskQuestionClick = () => {
    setShowQuestionForm(true); // Show the "Ask a Question" form
  };
  const handlePostAnswer = () => {
    if (message.trim() !== "") {
      setAnswers((prevAnswers) => [...prevAnswers, message]); // Add the new answer to the list
      setMessage(""); // Clear the textarea
    }
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

      <Row className=" bg-gray " style={{ height: "90vh" }}>
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

                  {/* Chat Content */}
                  <div className="flex-grow-1 border p-3 rounded bg-light overflow-auto">
                    <h5>What is the capital of France?</h5>
                    <p className="text-muted">
                      Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!
                    </p>
                    <h6 className="text-primary">Answers</h6>
                    <ol className="mb-5" style={{ listStyleType: "number" }}>
                      {answers.map((answer, index) => (
                        <li key={index} className="my-3 text-muted">
                          {answer}
                        </li>
                      ))}
                    </ol>
                    <h6 className="my-2">Your Answer</h6>
                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        className="my-3"
                        rows={2}
                        placeholder="Type your answer here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      className="mt-2"
                      variant="primary"
                      style={{ position: "fixed", right: "3%" }}
                      onClick={handlePostAnswer}
                    >
                      Post Your Answer
                    </Button>
                  </div>
                </>
              )}

{showQuestionForm && (
                <div className=" p-4  rounded">
                 <div className=" p-4 border rounded" style={{backgroundColor:"rgb(86, 120, 233,0.2)"}}>
                 <h5 style={{fontWeight:"600"}}>Writing a good question</h5>
                  <p className="text-muted">
                    You are ready to ask a programming-related question, and this form will help guide you through the
                    process.<br></br>
                    Looking to ask a non-programming question? See the topics here to find a relevant site.
                  
                  </p>
                  <h6 style={{fontWeight:"600"}}>Step</h6>
                  <ul className="text-muted " style={{listStyleType:"circle"}}>
                   
                    <li>Summarize your problem in a one-line title.</li>
                    <li>Describe your problem in more detail.</li>
                    <li>Describe what you tried and what you expected to happen.</li>
                    <li>
                      Add tags which help surface your question to members of the community.
                    </li>
                  </ul>
                 </div>
                  <div className="my-3 bg-light p-4 border rounded">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <p>Be specific and imagine youre asking a question to another person.
                      </p>
                      <Form.Control
                        type="text"
                        placeholder="e.g., How to find the index of an element in a vector?"
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={handleNextClick}>Next</Button>
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
