import React, { useContext, useEffect, useState } from 'react'
// import { userData } from '../lib/dummydata'
import noAvatar from '../../public/noAvatar.png'
import apirequest from '../lib/apirequest.js';
import { format } from 'timeago.js'
import { AuthContext } from '../context/AuthContext.jsx';
import { SocketContext } from '../context/SocketContext.jsx';

function Chat({ chats }) {

    // const john = userData;
    const { currentuser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    console.log(chats);
    const [chat, setChat] = useState(null);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apirequest("/chat/"+id);
            console.log("This is chat data", res.data);
            setChat({ ...res.data, receiver });
            console.log(chat)

        } catch (err) {
            console.log(err);
        }
    }

    const handleNewMessage = async (e) => {
        e.preventDefault();

        const formdata = new FormData(e.target);
        const text = formdata.get("newmessage");
        if (!text) {
            return;
        }
        try {
            console.log(chat)
            const res = await apirequest.post("/message/"+chat.id, { text });

            setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
            e.target.reset();

            socket.emit("send", {
                receiverId: chat.receiver.id,
                data: res.data
            });

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        const read = async () => {
            try {
                await apirequest.put("/chat/read/" + chat.id);
            }
            catch (err) {
                console.log(err);
            }
        }
        if (chat && socket) {
            socket.on("getmsg", (data) => {
                if (chat.id === data.chatID) {
                    setChat(prev => ({ ...prev, messages: [...prev.messages, data] }));
                    read();
                }
            })
        }
        return () => {
            socket.off("getMessage");
          };
    }, [chat, socket])


    return (
        <div className='w-full h-full'>
            <div className='messages'>
                <div className='text-xl font-bold'>Messages</div>
                <div className='flex flex-col gap-3 mt-4 h-[200px] overflow-y-scroll px-2 scroll-smooth'>
                    {chats?.map((c) => (
                        <div style={{
                            backgroundColor:
                              c.seenBy.includes(currentuser.id) || chat?.id === c.id
                                ? "white"
                                : "#678567",
                          }} onClick={() => handleOpenChat(c.id, c.receiver)} key={c.id} className='flex gap-2 w-full h-fit p-2 cursor-pointer bg-yellow-50 rounded-lg'>
                            <img src={c.receiver.profile || noAvatar} className='w-8 h-8 rounded-full object-cover'></img>
                            <div className='text-xs flex flex-col justify-between'>
                                <div className='font-bold'>{c.receiver.username}</div>
                                <div className='break-all'>{c.lastMessage}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {chat && <div className='chatbox border-2 border-gray-400 w-full rounded-md mt-10'>
                <div className="top bg-green-200 w-full h-10 rounded-t-md p-1 px-2 flex justify-between items-center">
                    <div className='flex gap-2 items-center justify-center'>
                        <img src={chat.receiver.profile || noAvatar} className='w-8 h-8 rounded-full object-cover'></img>
                        <div className='font-semibold text-sm'>{chat.receiver.username}</div>
                    </div>
                    <div onClick={() => setChat(null)} className='cursor-pointer'>X</div>
                </div>
                <div className="center bg-green-50 w-full p-2 h-[220px] overflow-y-scroll gap-4 flex flex-col-reverse text-xs">
                    <div className='flex flex-col gap-4'>
                    {chat.messages.map((m) => (
                        <div key={m.id} className="flex flex-col gap-2 w-fit max-w-[50%] bg-yellow-50 p-2 rounded-md">
                            <div style={{
                                alignSelf: m.userID === currentuser ? "flex-end" : "flex-start",
                                textAlign: m.userID === currentuser ? "right" : "left"
                            }}>
                                <div className=''>{m.text}</div>
                                <div className='text-gray-400'>{format(m.createdAt)}</div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <form onSubmit={handleNewMessage} className="bottom w-full bg-green-200 rounded-b-md border-2 h-10 justify-between gap-3 py-1 px-2 flex">
                    <input name="newmessage" className='w-full h-full rounded-lg' type="text"></input>
                    <button className='bg-green-200 text-sm cursor-pointer hover:bg-green-300 p-1 rounded-md px-3'>
                        Send
                    </button>
                </form>
            </div>}
        </div>
    )
}

export default Chat