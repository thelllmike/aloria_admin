import React, { useEffect, useRef, useState, useContext } from "react";
import "../style/Messagingapp.css";
import Sidebar from "../components/Sidebar";
import message from "../images/message.png";
import api from "../apiService";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const MessengerApp = () => {
	const { user } = useContext(UserContext); // Get user context
	const [discussions, setDiscussions] = useState([]);
	const [activeDiscussionIndex, setActiveDiscussionIndex] = useState(0);
	const [chatContent, setChatContent] = useState([]);
	const chatEndRef = useRef(null);
	const [isChatActive, setIsChatActive] = useState(false); // New state for toggling chat on small screens

	const defaultImageUrl = "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png";

	const handleDiscussionClick = async (index) => {
		setActiveDiscussionIndex(index);
		setIsChatActive(true); // Show chat on small screens
		const conversationId = discussions[index].conversation_id;
		await fetchMessages(conversationId);
	};

	useEffect(() => {
		fetchConversations();
	}, []);

	const fetchConversations = async () => {
		try {
			const response = await api.get("/api/conversations/");
			const conversations = response.data;
			setDiscussions(conversations);
			if (conversations.length > 0) {
				await fetchMessages(conversations[0].conversation_id);
			}
		} catch (error) {
			Swal.fire("Error", "Failed to fetch conversations.", "error");
			console.error("Failed to fetch conversations:", error);
		}
	};

	const fetchMessages = async (conversationId) => {
		try {
			const response = await api.get(`/api/conversations/${conversationId}/messages`);
			const messages = response.data;
			setChatContent(messages);
		} catch (error) {
			Swal.fire("Error", "Failed to fetch messages.", "error");
			console.error("Failed to fetch messages:", error);
		}
	};

	const scrollToBottom = () => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatContent]);

	const handleSendMessage = async () => {
		const conversationId = discussions[activeDiscussionIndex]?.conversation_id;
		const message = document.querySelector(".message-input").value;

		if (!user) {
			Swal.fire("Error", "User not found.", "error");
			return;
		}

		try {
			const response = await api.post("/api/messages/", {
				conversation_id: conversationId,
				sender_id: user.id, // Use the actual sender_id from user context
				message: message,
			});
			if (response.status === 200) {
				await fetchMessages(conversationId);
				document.querySelector(".message-input").value = "";
			}
		} catch (error) {
			Swal.fire("Error", "Failed to send message.", "error");
			console.error("Failed to send message:", error);
		}
	};

	const handleBackClick = () => {
		setIsChatActive(false); // Go back to discussions on small screens
	};

	const getLastMessage = (messages) => {
		if (!messages || messages.length === 0) return "";
		return messages[messages.length - 1].message;
	};

	const getReceiverName = (discussion) => {
		if (!discussion || !user) return "";
		if (discussion.user1_id === user.id) {
			return discussion.user2 ? discussion.user2.name : "";
		} else {
			return discussion.user1 ? discussion.user1.name : "";
		}
	};

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className='messagingapp container-fluid ps-0 m-0  d-flex'>
			<div className='col-2 col-md-1 col-sm-1 col-lg-2'>
				<Sidebar />
			</div>
			<div className='col-10 col-md-11 col-sm-11 col-lg-10'>
				<div className='row'>
					<div className={`discussions col-5 ${isChatActive ? 'active' : ''}`}>
						{discussions.map((discussion, index) => (
							<div
								key={index}
								className={`discussion ${index === activeDiscussionIndex ? "message-active" : ""}`}
								onClick={() => handleDiscussionClick(index)}
							>
								<div className='row align-items-center'>
									<div className='photo col-2'>
										<img src={defaultImageUrl} alt={getReceiverName(discussion)} />
									</div>
									<div className='col-10 message-content'>
										<p className='name' style={{ fontWeight: 'bold' }}>{getReceiverName(discussion)}</p>
										<p className='last-message'>{getLastMessage(discussion.messages)}</p>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={`chat col-7 pt-2 ${isChatActive ? 'active' : ''}`}>
						<div className='back-button' onClick={handleBackClick}><i className="fa-solid fa-chevron-left"></i></div> {/* Add back button */}
						<div className='row'>
							<div className='col-1'>
								<img src={defaultImageUrl} alt='' />
							</div>
							<div className='col-11'>
								<h2>{getReceiverName(discussions[activeDiscussionIndex])}</h2>
							</div>
						</div>
						<div className='chat-messages'>
							{chatContent.map((chat, index) => (
								<div key={index} className={`messagechat ${chat.sender_id === user.id ? "sent" : "received"}`}>
									<div className='bubble'>
										<p>{chat.message}</p>
									</div>
								</div>
							))}
							<div ref={chatEndRef} />
						</div>
						<div className='message-input-container'>
							<input type='text' placeholder='Type a message...' className="message-input cl" />
							<button className='send-button' onClick={handleSendMessage}>
								<img src={message} alt="" className='img-fluid' />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessengerApp;
