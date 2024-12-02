import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderBaner from "../../../Dashboard/Header/HeaderBaner";
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar";
import Avatar from "../../../assets/Avatar.png";
import AddPolls from "./AddPolls";
import yes from "./images/Frame 1000005280.png";
import no from "./images/Frame 1000005285.png";

const Polls = () => {
  const [activeButton, setActiveButton] = useState("polls");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showAddPolls, setShowAddPolls] = useState(false);

  const [pollsData, setPollsData] = useState([
    {
      author: { name: "Arlene McCoy", avatar: Avatar, view: "20" },
      pollType: "Multichoice polls",
      question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
      options: ["Yes", "No"],
      votes: { Yes: 75, No: 40 },
      timestamp: "01/07/2024, 10:00 AM",
    },
    {
      author: { name: "Arlene McCoy", avatar: Avatar, view: "20" },
      pollType: "Multichoice polls",
      question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
      options: ["Yes", "No"],
      votes: { Yes: 75, No: 40 },
      timestamp: "01/07/2024, 10:00 AM",
    },
    {
      author: { name: "Arlene McCoy", avatar: Avatar, view: "20" },
      pollType: "Multichoice polls",
      question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
      options: ["Yes", "No"],
      votes: { Yes: 75, No: 40 },
      timestamp: "01/07/2024, 10:00 AM",
    },
    {
      author: { name: "Arlene McCoy", avatar: Avatar, view: "20" },
      pollType: "Multichoice polls",
      question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
      options: ["Yes", "No"],
      votes: { Yes: 75, No: 40 },
      timestamp: "01/07/2024, 10:00 AM",
    },
    // Add more polls here if needed
  ]);

  const [selectedVotes, setSelectedVotes] = useState(
    Array(pollsData.length).fill(null)
  ); // Track selected option

  const handleVote = (index, option) => {
    setPollsData((prevData) => {
      return prevData.map((poll, pollIndex) => {
        if (pollIndex === index) {
          const updatedVotes = { ...poll.votes };
          const previousVote = selectedVotes[index];
          if (previousVote && previousVote !== option) {
            updatedVotes[previousVote] = (updatedVotes[previousVote] || 1) - 1;
          }
          updatedVotes[option] = (updatedVotes[option] || 0) + 1;
          return { ...poll, votes: updatedVotes };
        }
        return poll;
      });
    });

    setSelectedVotes((prev) => {
      const updatedVotes = [...prev];
      updatedVotes[index] = option;
      return updatedVotes;
    });
  };

  return (
    <div className="d-flex w-100 h-100 bg-light">
      <ResidentSidebar />
      <div className="flex-grow-1 d-flex flex-column lg:ml-[290px]">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-10">
            <Link
              to="/residentDashboard"
              className="text-muted text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-muted mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Polls
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

        {/* Main Content */}
        <main className="flex-grow-1 p-3 rounded-2xl bg-light">
          <div className="2xl:mt-[10px] 2xl:ml-[30px]">
            <div className="mt-5 2xl:px-3">
              {/* Navigation Buttons */}
              {["polls", "NewPoll", "PreviousPoll"].map((button) => (
                <Link
                  key={button}
                  to=""
                  onClick={() => setActiveButton(button)}
                  className={`w-full lg:h-[50px] sm:w-[200px] 2xl:px-[40px] px-[15px] py-3 rounded-t-md no-underline transition-all ${
                    activeButton === button
                      ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                      : "bg-[#FFFFFF] text-[#202224]"
                  }`}
                >
                  {button === "polls" ? "Own Poll" : button}
                </Link>
              ))}
            </div>
          </div>

          {/* Polls Section */}
          <div className="bg-[#FFFFFF] 2xl:w-[1560px] 2xl:ml-10">
            <div className="2xl:p-4 p-2 mt-[13px] md:p-8">
              <div className="max-w-8xl">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Polls</h1>
                  <button
                    onClick={() => setShowAddPolls(true)}
                    style={{
                      background:
                        "linear-gradient(90deg, #FE512E 0%, #F09619 100%)",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      border: "none",
                    }}
                  >
                    Create Polls
                  </button>
                </div>

                {/* Poll Data Display */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {pollsData.map((poll, index) => {
                    const totalVotes = poll.votes.Yes + poll.votes.No;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-3"
                      >
                        <div className="border-b mb-3 text-[#F4F4F4]">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <img
                                src={poll.author.avatar}
                                alt={poll.author.name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div className="flex flex-col">
                                <span
                                  className="fs-6 2xl:font-bold text-[#5678E9]"
                                  style={{ fontSize: "18px" }}
                                >
                                  {poll.author.name}
                                </span>
                                <span
                                  className="text-[#202224]"
                                  style={{ fontSize: "12px" }}
                                >
                                  {poll.pollType}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center bg-[#6E8EF9] 2xl:w-[60px] rounded-2xl">
                              <i className="fa-solid fa-eye text-[#FFFFFF] ml-3"></i>
                              <span
                                className="fs-6 text-[#FFFFFF] font-bold ml-1 mr-2"
                                style={{ fontSize: "18px" }}
                              >
                                {poll.author.view}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p
                          className="text-sm font-bold sm:fs-[10px]"
                          style={{ fontSize: "16px" }}
                        >
                          {poll.question}
                        </p>

                        {/* Voting Options */}
                        {["Yes", "No"].map((option) => (
                          <div key={option} className="mb-2">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id={`${option}-option-${index}`}
                                name={`poll-${index}`}
                                className="mr-2"
                                checked={selectedVotes[index] === option} // Bind input state
                                onChange={() => handleVote(index, option)} // Handle vote change
                              />
                              <label
                                htmlFor={`${option}-option-${index}`}
                                className="flex-grow"
                              >
                                {option}
                              </label>
                              <img
                                src={option === "Yes" ? yes : no}
                                alt={option}
                              />
                              <span className="ml-2">{poll.votes[option]}</span>
                            </div>
                            <div className="bg-blue-100 h-2 rounded-full mt-1">
                              <div
                                className={`h-2 rounded-full ${
                                  option === "Yes"
                                    ? "bg-[#39973D]"
                                    : "bg-[#E74C3C]"
                                }`}
                                style={{
                                  width: `${
                                    (poll.votes[option] / totalVotes) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                        <p className="flex justify-end text-sm text-gray-500">
                          {poll.timestamp}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Conditionally render AddPolls */}
      {showAddPolls && (
        <AddPolls
          isOpen={showAddPolls}
          onClose={() => setShowAddPolls(false)}
        />
      )}
    </div>
  );
};

export default Polls;
