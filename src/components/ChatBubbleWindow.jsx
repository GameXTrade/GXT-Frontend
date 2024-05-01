import React, { useState } from 'react';



function ChatBubbleWindow() {
    return (
        <div className='flex w-full bg-gray-100 justify-center' style={{ height: "calc(100dvh - 64px)" }}>
            <title>GameXTrade | Chat</title>
            <div className='flex bg-slate-300 w-full h-full'>
                <div className={`bg-green-50 w-[25%]`}>
                    Sidebar
                </div>
                
                <div className={`chat w-[75%]`}>
                    <div className="bg-white h-[90%]">
                        Display

                        
                    </div>
                    <div className="flex bg-blue-50 h-[10%] items-center justify-center border-x">
                        
                        <input type="text" className='h-10 rounded-md w-[80%] pl-[20px]' placeholder='Gib deine Nachricht ein'/>
                    </div>
                </div>
            </div>
        </div>

      );
}
<div class="flex bg-slate-300 w-full h-full">flex
    <div class="bg-green-50 w-[25%]">Sidebar</div>
    <div class="chat w-[75%]">…</div>
</div>
export default ChatBubbleWindow