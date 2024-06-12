import { useContext, useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import apirequest from "../lib/apirequest.js";
// import { useNotificationStore } from "../../lib/notificationStore";
import noAvatar from '../../public/noAvatar.png'
import { useNotificationStore } from "../lib/notification.js";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentuser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apirequest("/chat/" + id);
      if (!res.data.seenBy.includes(currentuser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewMessage = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("newmessage");

    if (!text) return;
    try {
      const res = await apirequest.post("/message/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apirequest.put("/chat/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);




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
                <div className="center bg-green-50 w-full p-2 h-[220px] overflow-y-scroll gap-4 flex flex-col text-xs">
                    {chat.messages.map((m) => (
                        <div style={{
                            alignSelf: m.userID === currentuser.id ? "flex-end" : "flex-start",
                            textAlign: m.userID === currentuser.id ? "right" : "left"
                        }} key={m.id} className="flex flex-col gap-2 w-fit max-w-[50%] bg-yellow-50 p-2 rounded-md">
                            <div>{m.text}</div>
                            <div className='text-gray-400 flex'>{format(m.createdAt)}</div>
                        </div>
                    ))}
                    <div ref={messageEndRef}></div>
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