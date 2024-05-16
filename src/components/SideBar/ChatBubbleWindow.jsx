import React, { useState, useEffect  } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Input, Button } from "@material-tailwind/react";

import axios from '../../api/axios';
function ChatBubbleWindow() {

    const [email, setEmail] = React.useState("");
    const onChange = ({ target }) => setEmail(target.value);

    const fetchItems = async () => {
        try 
        {
            const response = await axios.get('/item/all');
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error fetching items:', error);
        }
    };

    const {data: items, isLoading, error} = useQuery({
        queryKey: ['items'], 
        queryFn:  () => {
            // fetch('https://v2202405172564268947.bestsrv.de/item/all').then((res)=> res.json())
            return fetchItems()
        }
    });
    // console.log(items)
    if (error) return <div>ERROR</div>;

    if (isLoading) return <div>Loading ...</div>;
    return (
        <div className='flex w-full h-full p-5 justify-center '>
            
            <title>GameXTrade | Chat</title>
            <div className='flex w-full h-full rounded-xl shadow-xl border'>
                <div className="w-[25%] p-5 rounded-tl-xl rounded-bl-xl bg-red-50 border-r-2">
                    Sidebar
                </div>
                
                <div className="chat w-[75%]">
                    <div className="bg-white h-[90%] rounded-tr-xl">
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>{item.name}</li>
                            ))}
                        </ul>

                  
                    </div>
                    <div className=" flex bg-blue-50 h-[10%] items-center justify-center rounded-br-xl border-t-2">
                        <div className="relative flex w-full mx-10">
                            <Input
                                type="text"
                                label="Chat"
                                value={email}
                                onChange={onChange}
                                className="pr-20"
                                containerProps={{
                                className: "min-w-0",
                                }}
                            />
                            <Button
                                size="sm"
                                color={email ? "gray" : "blue-gray"}
                                disabled={!email}
                                className="!absolute right-1 top-1 rounded"
                            >
                                SEND
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBubbleWindow;
