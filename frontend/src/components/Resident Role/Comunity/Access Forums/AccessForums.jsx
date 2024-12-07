  import { useState, useEffect, useRef } from 'react';
  import { Container, Row, Col, Form, Button, Image, ListGroup, Dropdown } from 'react-bootstrap';
  import { FaVideo, FaPhone, FaSmile, FaPaperclip, FaMicrophone, FaCamera, FaEllipsisV, FaArrowRight } from 'react-icons/fa';
  import ResidentSidebar from '../../Resident Sidebar/ResidentSidebar';
  import { Link } from 'react-router-dom';
  import HeaderBaner from '../../../Dashboard/Header/HeaderBaner';
  import AvatarImage from '../../../assets/Avatar.png';
  import './AccessForums.css';
  import EmojiPicker from 'emoji-picker-react';

  export default function AccessForums() {
    const [message, setMessage] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingStartTime, setRecordingStartTime] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState('00:00');
    const [audioData, setAudioData] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [isSearchVisible, setIsSearchVisible] = useState(false); 
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const audioRecorder = useRef(null);
    const toggleSearchVisibility = () => {
      setIsSearchVisible(!isSearchVisible);
    };
    const contacts = [
      { id: 1, name: 'Michael John', lastMessage: 'Hi, John! how are you?', time: '10:27', online: true },
      { id: 2, name: 'Elizabeth Sarah', lastMessage: 'Thank you for your order!', time: '9:20' },
      { id: 3, name: 'Jenny Wilson', lastMessage: 'Hello, Jenny', time: '7:00' },
      { id: 4, name: 'Arlene McCoy', lastMessage: 'Typing...', time: '9:20', active: true },
      { id: 5, name: 'Esther Howard', lastMessage: 'Hello, Esther', time: '10:27' },
      { id: 6, name: 'Cody Fisher', lastMessage: 'Thank you for your order!', time: '7:00' },
    ];

    const [messages, setMessages] = useState({
      1: [],
      4: [],
    });

    const handleContactClick = (contact) => {
      setSelectedContact(contact);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
      }
    };

    const handleSendMessage = () => {
      if (!message && !uploadedFile && !capturedImage && !audioData || !selectedContact) return;

      const newMessage = {
        id: Math.random(),
        sender: 'User',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        image: capturedImage,
        audio: audioData ? audioData.blobURL : null,
        file: uploadedFile,
      };

      setMessages({
        ...messages,
        [selectedContact.id]: [...(messages[selectedContact.id] || []), newMessage],
      });

      setMessage('');
      setUploadedFile(null);
      setCapturedImage(null);
      setAudioData(null);
    };

    const handleEmojiClick = (emoji) => {
      setMessage((prev) => prev + emoji.emoji);
    };

    const handleStartRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioRecorder.current = mediaRecorder;

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        const blobURL = URL.createObjectURL(audioBlob);
        setAudioData({ blob: audioBlob, blobURL });
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingStartTime(Date.now());
    };

    const handleStopRecording = () => {
      if (audioRecorder.current) {
        audioRecorder.current.stop();
        audioRecorder.current.stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
        setRecordingStartTime(null);
      }
    };

    const handleCopyMessage = () => {
      const selectedMessage = messages[selectedContact.id]?.find(
        (msg) => msg.id === selectedMessageId
      );
      if (selectedMessage?.content) {
        navigator.clipboard.writeText(selectedMessage.content);
        alert("Message copied!");
      }
    };
    const handleSelectMessage = (messageId) => {
      setSelectedMessageId(messageId);
    };

    const updateRecordingDuration = () => {
      if (isRecording && recordingStartTime) {
        const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        setRecordingDuration(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    };

    useEffect(() => {
      const intervalId = setInterval(updateRecordingDuration, 1000);

      return () => clearInterval(intervalId);
    }, [isRecording, recordingStartTime]);

    const handleCameraClick = () => {
      setIsCameraOpen((prevState) => !prevState);
    };

    const handleCaptureImage = () => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        const imageData = canvasRef.current.toDataURL('image/png');
        setCapturedImage(imageData);
        setIsCameraOpen(false);

        if (selectedContact) {
          const newMessage = {
            id: Math.random(),
            sender: 'User',
            image: imageData,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };

          setMessages({
            ...messages,
            [selectedContact.id]: [...(messages[selectedContact.id] || []), newMessage],
          });
        }
      }
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setUploadedFile(file);
      }
    };

    useEffect(() => {
      let stream;
      if (isCameraOpen) {
        const constraints = {
          video: { facingMode: "user" },
        };

        navigator.mediaDevices.getUserMedia(constraints)
          .then((mediaStream) => {
            stream = mediaStream;
            videoRef.current.srcObject = mediaStream;
          })
          .catch((error) => {
            console.error("Error accessing camera: ", error);
          });

        return () => {
          if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
          }
        };
      }
    }, [isCameraOpen]);

    return (
      <Container fluid className="bg-light  p-0"  style={{height:"90vh"}}>
      
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-[350px]">
            <Link
              to="/residentDashboard"
              className="text-[#A7A7A7] text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-[#202224] fs-5 mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
           Access Forums
            </span>
          </div>

          {/* Search Button */}
          <div
            className={`d-block ml-auto d-sm-none p-2 rounded-lg ${
              isSearchVisible ? "border-none" : "border border-[#D3D3D3]"
            }`}
          >
            {!isSearchVisible ? (
              <button
                onClick={() => setIsSearchVisible(true)}
                className="text-muted bg-transparent border-0"
              >
                <i className="fas fa-search"></i>
              </button>
            ) : (
              <input
                type="text"
                placeholder="Search..."
                className="px-1 py-1 w-[100px] rounded-md border mt-2"
              />
            )}
          </div>
          <HeaderBaner />
        </header>
        <Row className="h-100">
          <Col md={2} className="border-end bg-white">
            <ResidentSidebar />
          </Col>

          <Col md={10} className="py-2">
            <Row className=" py-2" style={{height:"90vh"}}>
              <Col md={3} className="border-end bg-light">
                <h5>Chat</h5>
                <Form.Control type="text" placeholder="Search Here" className="mb-3" />
                <ListGroup variant="flush" className="contacts-sidebar">
                  {contacts.map((contact) => (
                    <ListGroup.Item
                      key={contact.id}
                      active={selectedContact?.id === contact.id}
                      className="d-flex align-items-center gap-3"
                      onClick={() => handleContactClick(contact)}
                      style={{ cursor: 'pointer',backgroundColor: selectedContact?.id === contact.id ? "rgb(86, 120, 233, 0.1)" : "transparent",color:"black" ,border:"none"}}
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


              <Col md={8} className="d-flex flex-column bg-white ms-2 chat-area">
                {selectedContact && (
                  <>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2">
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
                        <Dropdown>
                          <Dropdown.Toggle as={Button} variant="link" className='mt-3'>
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={handleCopyMessage}>Copy</Dropdown.Item>
                            <Dropdown.Item onClick={handleCopyMessage}>Forward</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="flex-grow-1 overflow-auto mb-5 px-3 chat-messages" >
                      {messages[selectedContact.id]?.map((msg) => (
                        <div key={msg.id} className={`d-flex ${msg.sender === 'User' ? 'justify-content-end' : ''} mb-2`}>
                          <div className={`p-2 rounded ${msg.sender === 'User' ? 'text-black bg-pri' : 'bg-light'}`}  onClick={() => handleSelectMessage(msg.id)}>
                            {msg.content && <div>{msg.content}</div>}
                            {msg.image && (
                              <div>
                                <img src={msg.image} alt="Captured" style={{ maxWidth: '100%' }} />
                              </div>
                            )}
                            {msg.audio && (
                              <>
                                <audio controls src={msg.audio} className="d-block" />
                                <small className="text-muted d-block">{msg.duration}</small>
                              </>
                            )}
                            {msg.file && (
                              <div>
                                <a href={URL.createObjectURL(msg.file)} download>
                                  Download File
                                </a>
                              </div>
                            )}
                            <small className="text-muted d-block mt-1">{msg.time}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <Form className="d-flex align-items-center gap-2 border-top pt-5">
                  <Button variant="link" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <FaSmile />
                  </Button>
                  {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
                  <Form.Control
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button variant="link" onClick={() => fileInputRef.current.click()}>
                    <FaPaperclip />
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                  </Button>
                  <Button variant="link" onClick={handleCameraClick}>
                    <FaCamera />
                  </Button>

                  {isCameraOpen && (
                    <div>
                      <video ref={videoRef} width="100%" autoPlay></video>
                      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
                      <Button variant="primary" onClick={handleCaptureImage}>
                        Capture
                      </Button>
                    </div>
                  )}

                  <div className="d-flex align-items-center gap-2">
                    {isRecording && <span className="text-muted">{recordingDuration}</span>}
                    <Button
                      variant="link"
                      onClick={isRecording ? handleStopRecording : handleStartRecording}
                      className={isRecording ? 'text-danger' : ''}
                    >
                      <FaMicrophone />
                    </Button>
                  </div>
                  <Button variant="primary" onClick={handleSendMessage} disabled={!message && !uploadedFile && !capturedImage && !audioData}>
                    <FaArrowRight />
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }

 