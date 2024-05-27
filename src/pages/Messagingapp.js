import React, { useEffect, useRef, useState } from "react";
import "../style/Messagingapp.css";
import Sidebar from "../components/Sidebar";
import message from "../images/message.png"

const MessengerApp = () => {
	const [isActive, setIsActive] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth); // State to hold screen width
	const [discussions, setDiscussions] = useState([
		{
			name: "Jack",
			lastCustomerMessage: "", // Initialize lastCustomerMessage as an empty string
			timer: "12 sec",
			online: true,
			active: true,
			profileImage: "https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		},
		{
			name: "Mike",
			lastCustomerMessage: "", // Initialize lastCustomerMessage as an empty string
			timer: "12 sec",
			online: true,
			active: true,
			profileImage: "https://images.pexels.com/photos/8159657/pexels-photo-8159657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		},
		{
			name: "Fernando",
			lastCustomerMessage: "", // Initialize lastCustomerMessage as an empty string
			timer: "12 sec",
			online: true,
			active: true,
			profileImage: "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		},
		{
			name: "Sarah",
			lastCustomerMessage: "", // Initialize lastCustomerMessage as an empty string
			online: true,
			active: true,
			profileImage: "https://images.pexels.com/photos/7402883/pexels-photo-7402883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		},
		{
			name: "Emily",
			lastCustomerMessage: "", // Initialize lastCustomerMessage as an empty string
			online: true,
			active: true,
			profileImage: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		}
		// Add more discussions here...
	]);

	const [activeDiscussionIndex, setActiveDiscussionIndex] = useState(0);
	const chatEndRef = useRef(null);
	const [isChatActive, setIsChatActive] = useState(false); // New state for toggling chat on small screens

	const handleDiscussionClick = (index) => {
		setActiveDiscussionIndex(index);
		setIsChatActive(true); // Show chat on small screens
	};


	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const updateChatContent = (discussionName) => {
		// Sample chat content for different discussions
		const chats = {

			[discussions[0].name]: [
				{ sender: "Customer", message: "Hey, I have a question about a product." },
				{ sender: "Admin", message: "Sure, feel free to ask!" },
				{ sender: "Customer", message: "Can you provide more details about the product specifications?" },
				{ sender: "Admin", message: "Of course, let me check and get back to you." },
				// Add more chat content here...
			],
			[discussions[1].name]: [
				{ sender: "Customer", message: "I'm interested in purchasing this item. Can you help me with the sizing?" },
				{ sender: "Admin", message: "Absolutely, let me assist you with that." },
				{ sender: "Customer", message: "Thank you! Also, do you offer any discounts for bulk orders?" },
				{ sender: "Admin", message: "Yes, we have special discounts available for bulk purchases. I can provide you with more information." },
				// Add more chat content here...
			],
			[discussions[2].name]: [
				{ sender: "Customer", message: "I received my order, but it seems to be damaged during shipping." },
				{ sender: "Admin", message: "We apologize for the inconvenience. Could you please provide some photos of the damage for us to assess?" },
				{ sender: "Customer", message: "ok" },
				{ sender: "Admin", message: "Thank you for your cooperation. We'll resolve this issue as soon as possible." },
				{ sender: "Customer", message: "I received my order, but it seems to be damaged during shipping." },
				{ sender: "Admin", message: "We apologize for the inconvenience. Could you please provide some photos of the damage for us to assess?" },
				{ sender: "Customer", message: "ok" },
				{ sender: "Admin", message: "Thank you for your cooperation. We'll resolve this issue as soon as possible." },
				{ sender: "Customer", message: "I received my order, but it seems to be damaged during shipping." },
				{ sender: "Admin", message: "We apologize for the inconvenience. Could you please provide some photos of the damage for us to assess?" },
				{ sender: "Admin", message: "ok" },
				{ sender: "Admin", message: "Thank you for your cooperation. We'll resolve this issue as soon as possible." },
				// Add more chat content here...
			],
			[discussions[3].name]: [
				// Messages for the fourth discussion...
			],
			[discussions[4].name]: [
				// Messages for the fifth discussion...
			]


			// Add more discussions and their chat content here...
		};

		return chats[discussionName] || [];
	};


	useEffect(() => {
		const updatedDiscussions = discussions.map((discussion) => {
			const chatContent = updateChatContent(discussion.name);
			const lastCustomerMessage =
				chatContent.filter((chat) => chat.sender === "Customer").pop()?.message || "";
			return {
				...discussion,
				lastCustomerMessage: lastCustomerMessage,
			};
		});
		setDiscussions(updatedDiscussions);
	}, []);

	const sampleChatContent = updateChatContent(discussions[activeDiscussionIndex].name);

	const scrollToBottom = () => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [sampleChatContent]);

	const handleClick = () => {
		setIsActive(true);
	};

	const handleBackClick = () => {
		setIsChatActive(false); // Go back to discussions on small screens
	};

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
										<img src={discussion.profileImage} alt={discussion.name} />
									</div>
									<div className='col-10 message-content'>
										<div className="row">
											<div className="col-2">
												<p className='name'>{discussion.name}</p>
											</div>
										</div>
										<div className="row d-flex">
											<div className="col-9">
												<p className='message'>
													{screenWidth < 601 && discussion.lastCustomerMessage.length > 55 // Check for screen width less than 1100px
															? discussion.lastCustomerMessage.slice(0, 55) + "..." // Apply truncation logic for smaller screens (< 1100px)
															:screenWidth < 778 && discussion.lastCustomerMessage.length > 18 // Check for screen width less than 1100px
															? discussion.lastCustomerMessage.slice(0, 18) + "..." // Apply truncation logic for smaller screens (< 1100px)
															: screenWidth < 1100 && discussion.lastCustomerMessage.length > 35 // Check for screen width less than 690px
																? discussion.lastCustomerMessage.slice(0, 35) + "..." // Apply truncation logic for smaller screens (< 690px)
																: discussion.lastCustomerMessage.length > 45 // Check for larger screens
																	? discussion.lastCustomerMessage.slice(0, 45) + "..." // Apply truncation logic for larger screens
																	: discussion.lastCustomerMessage
													}
												</p>
											</div>
											<div className="col-3">
												<p className='time'>{discussion.timer}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={`chat col-7 pt-2 ${isChatActive ? 'active' : ''}`}>
						<div className='back-button' onClick={handleBackClick}><i class="fa-solid fa-chevron-left"></i></div> {/* Add back button */}
						<div className='row'>
							<div className='col-1'>
								<img src={discussions[activeDiscussionIndex].profileImage} alt='' />
							</div>
							<div className='col-11'>
								<h2>{discussions[activeDiscussionIndex].name}</h2>
							</div>
						</div>
						<div className='chat-messages'>
							{sampleChatContent.map((chat, index) => (
								<div key={index} className={`messagechat ${chat.sender === "Admin" ? "sent" : "received"}`}>
									<div className='bubble'>
										<p>{chat.message}</p>
									</div>
								</div>
							))}
							<div ref={chatEndRef} />
						</div>
						<div className='message-input-container'>
							<input type='text' placeholder='Type a message...' className="message-input cl" />
							<button
								className={`send-button ${isActive ? 'active' : ''}`}
								onClick={handleClick}
							>
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