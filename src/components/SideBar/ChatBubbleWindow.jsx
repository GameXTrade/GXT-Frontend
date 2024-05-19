import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input, Button, Avatar, Typography, Card, List, ListItem, ListItemPrefix, Radio  } from "@material-tailwind/react";
import { PaperAirplaneIcon, MagnifyingGlassIcon  } from "@heroicons/react/24/solid";
import axios from '../../api/axios';

function ChatBubbleWindow() {

    const [messageInput, setMessageInput] = useState("");
    const [selectedOption, setSelectedOption] = useState('horizontal-list-all');
    const [selectedPerson, setSelectedPerson] = useState(null);

    const handleListItemClick = (person) => {
        setSelectedPerson(person);
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get('/item/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const { data: items, isLoading, error } = useQuery({
        queryKey: ['items'],
        queryFn: () => fetchItems()
    });

    const FAKE_CHAT_DB = [
        {
            user_id: 666,
            name: "Stifler's Mom",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Jennifer_Coolidge_-_Cropped.jpg/800px-Jennifer_Coolidge_-_Cropped.jpg",
            chat: [
                {
                    message_id: 1,
                    sender_id: 666,
                    message: "Hey, how's it going?",
                    timestamp: "2024-05-18T14:48:00.000Z"
                },
                {
                    message_id: 2,
                    sender_id: 0,  // Assuming 0 is the current user
                    message: "I'm doing well, thanks! How about you?",
                    timestamp: "2024-05-18T14:49:00.000Z"
                },
                {
                    message_id: 3,
                    sender_id: 666,
                    message: "Pretty good! Just enjoying my day.   Etiam commodo justo nec vehicula elementum. Proin tincidunt nibh id enim pulvinar, vel ultricies justo accumsan. Quisque id neque finibus, sollicitudin felis ut, pellentesque enim. Nam nec nulla sit amet eros venenatis tincidunt. Fusce sit amet tortor bibendum, suscipit ligula nec, cursus justo. Sed finibus libero ut eros varius, auctor consequat urna tincidunt.",
                    timestamp: "2024-05-18T14:50:00.000Z"
                },
                {
                    message_id: 4,
                    sender_id: 0,
                    message: "Crazy Woman.",
                    timestamp: "2024-05-18T14:50:00.000Z"
                },
                {
                    message_id: 5,
                    sender_id: 666,
                    message: "JOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!",
                    timestamp: "2024-05-18T14:50:00.000Z"
                },
                {
                    message_id: 6,
                    sender_id: 0,
                    message: "What do you mean by that?",
                    timestamp: "2024-05-18T14:50:00.000Z"
                },
    
            ]
        },
        {
            user_id: 50,
            name: "Johnson Johnson",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            chat: [
                {
                    message_id: 1,
                    sender_id: 50,
                    message: "Hello! Are you available for a quick call?",
                    timestamp: "2024-05-18T09:30:00.000Z"
                },
                {
                    message_id: 2,
                    sender_id: 0,
                    message: "Hi Johnson, yes I am. Give me 5 minutes.",
                    timestamp: "2024-05-18T09:31:00.000Z"
                },
                {
                    message_id: 3,
                    sender_id: 50,
                    message: "Sure, no problem.",
                    timestamp: "2024-05-18T09:32:00.000Z"
                }
            ]
        },
        {
            user_id: 5,
            name: "Jaquelin McAffee",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
            chat: [
                {
                    message_id: 1,
                    sender_id: 5,
                    message: "Did you finish the report?",
                    timestamp: "2024-05-17T18:20:00.000Z"
                },
                {
                    message_id: 2,
                    sender_id: 0,
                    message: "Yes, I sent it over this morning.",
                    timestamp: "2024-05-17T18:21:00.000Z"
                },
                {
                    message_id: 3,
                    sender_id: 5,
                    message: "Great, thank you!",
                    timestamp: "2024-05-17T18:22:00.000Z"
                }
            ]
        },
        {
            user_id: 2,
            name: "Emma Willever",
            image: "https://docs.material-tailwind.com/img/face-3.jpg",
            chat: [
                {
                    message_id: 1,
                    sender_id: 2,
                    message: "Oih!",
                    timestamp: "2024-05-17T18:23:00.000Z"
                }
            ]
        }
    ];
    
    const userId = 0;
    const userConversations = FAKE_CHAT_DB.filter(conversation => 
        conversation.chat.some(message => message.sender_id === userId)
    );

    const handleSendButtonClick = () => {
        if (messageInput.trim() !== "") {

            const chat_db = FAKE_CHAT_DB[selectedPerson.index].chat
            const newMessage = {
                message_id: chat_db.length + 1,
                sender_id: userId,
                message: messageInput,
                timestamp: new Date().toISOString()
            };
            chat_db.push(newMessage)
            setMessageInput(""); // Clear the input field
            console.log(FAKE_CHAT_DB)
        }
    };
    const handleRadioOptionChange = (event) => {
        setSelectedOption(event.target.id);
    };
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const options = { 
            // year: 'numeric', 
            // month: '2-digit', 
            // day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true
        };
        return date.toLocaleTimeString('en-US', options);
    }
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };

    if (error) return <div>ERROR</div>;
    if (isLoading) return <div>Loading ...</div>;

    return (
        <div className='w-full h-full'>
            <title>GameXTrade | Chat</title>

            <div className='flex flex-col h-full w-full rounded-xl border shadow-lg'>
                <div className="head flex border-b w-full min-h-14 items-center ">
                    <div className="SidebarHead border-r flex-grow w-full md:w-[30%] lg:w-[35%] px-5">
                        <Typography variant="h3" color="blue-gray" textGradient>
                            Chats
                        </Typography>
                    </div>
                    <div className="ChatHead flex-grow flex items-center w-full md:w-[70%] lg:w-[75%] pl-5">
                        {selectedPerson && (
                            <Avatar size='sm' className='mr-2' src={selectedPerson.image} alt="avatar" />
                        )}
                        {selectedPerson && (
                            <Typography color="blue-gray" className='text-blue-gray-900 font-semibold'>
                                {selectedPerson.name}
                            </Typography>
                        )}
                    </div>
                </div>

                <div className="body flex " style={{ height: "calc(100vh - 130px)" }}>
                    <div className="SidebarBody flex flex-col items-center py-5 w-full md:w-[30%] lg:w-[35%] border-r px-5">
                        <div className="searchbar w-full">
                            <Input type="text" label="Search contacts..." className='bg-white'
                                icon={<MagnifyingGlassIcon className="text-gray-500" />} 
                            />
                        </div>
                        <div className="FeatureButtons flex w-full py-2">
                            <List className="flex flex-row w-full">
                                <ListItem className="p-0">
                                    <label
                                        htmlFor="horizontal-list-all"
                                        className="flex w-full cursor-pointer items-center px-3 py-2"
                                    >
                                        <ListItemPrefix className="mr-3">
                                            <Radio
                                                name="horizontal-list"
                                                // defaultChecked={selectedOption === 'horizontal-list-all'}
                                                id="horizontal-list-all"
                                                ripple={false}
                                                
                                                className="hover:before:opacity-0"
                                                containerProps={{
                                                className: "p-0",
                                                }}
                                                checked={selectedOption === 'horizontal-list-all'}
                                                onChange={handleRadioOptionChange}
                                            />
                                        </ListItemPrefix>
                                        <Typography
                                        color="blue-gray"
                                        className="font-medium text-blue-gray-400"
                                        >
                                        All 
                                        </Typography>
                                    </label>
                                </ListItem>
                                <ListItem className="p-0">
                                    <label
                                        htmlFor="horizontal-list-friendreq"
                                        className="flex w-full cursor-pointer items-center px-3 py-2"
                                    >
                                        <ListItemPrefix className="mr-3">
                                            <Radio
                                                name="horizontal-list"
                                                id="horizontal-list-friendreq"
                                                ripple={false}
                                                className="hover:before:opacity-0"
                                                containerProps={{
                                                className: "p-0",
                                                }}
                                                checked={selectedOption === 'horizontal-list-friendreq'}
                                                onChange={handleRadioOptionChange}
                                            />
                                        </ListItemPrefix>
                                        <Typography
                                            color="blue-gray"
                                            className="font-medium text-blue-gray-400"
                                            >
                                            Friend Requests
                                        </Typography>
                                    </label>
                                </ListItem>
                            </List>
                            
                        </div>
                        <div className="messages flex flex-col w-full overflow-auto">
                            <List>
                                {userConversations.map(({name, image, chat }, index) =>{
                                    const lastMessage = chat[chat.length - 1];
                                    const isMeLastSender = lastMessage.sender_id === userId;    
                                    return (
                                        <ListItem key={index} onClick={() => handleListItemClick({ name, image, index })}>
                                            <ListItemPrefix>
                                                <Avatar variant="circular" alt="img" src={image} />
                                            </ListItemPrefix>
                                            <div>
                                                <Typography variant="h6" color="blue-gray">
                                                    {name}
                                                </Typography>
                                                <Typography variant="small" color="gray" className="font-normal">
                                                    {isMeLastSender ? 'You: ' + truncateText(lastMessage.message, 20) : truncateText(lastMessage.message, 50)}
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </div>
                    </div>
                    <div className="ChatBody flex justify-between flex-col md:w-[70%] lg:w-[75%]">
                        <div className="Chattop flex flex-col px-5 overflow-auto h-full">
                            {
                                selectedPerson && (FAKE_CHAT_DB[selectedPerson.index].chat.map(({message_id, sender_id, message, timestamp}) =>(
                                    userId !== sender_id ?
                                    <div className="friendchat" key={message_id}>
                                        <div className='inline-block my-2 border rounded-r-lg rounded-bl-lg max-w-[70%]' >
                                            <div className='break-all px-5 pt-3'>{message}</div>
                                            <div className='relative'>
                                                <Typography className='float-right pr-1' variant="small" color="blue-gray">
                                                    {formatTimestamp(timestamp)}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className='mychat relative'>
                                        <div className='inline-block bg-gray-50 my-2 rounded-l-lg rounded-br-lg border float-right max-w-[70%]'>
                                            <div className='break-all px-5 pt-3'>{message}</div>
                                            <div className='relative'>
                                                <Typography className='float-right pr-1' variant="small" color="blue-gray">
                                                    {formatTimestamp(timestamp)}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                )))
                            }
                        </div>
                        <div className="inputchat w-full border-t">
                            {selectedPerson? <div className="chatfield flex p-3 w-full">
                                <Input type="text" id='chat' label="Chat" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                                <Button type="button" className='send ml-2' onClick={handleSendButtonClick}>
                                    <PaperAirplaneIcon className="h-4 w-4" />
                                </Button>
                            </div>:""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBubbleWindow;
