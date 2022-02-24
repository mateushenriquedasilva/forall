import { database } from "../service/firebase";
import { push, ref, set, onValue } from "firebase/database";

import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../components/Button";

import "../styles/chat.scss";

import sendIcon from "../assets/send.png";
import userIcon from "../assets/user.png";
import useAuth from "../hooks/useAuth";

export function Chat() {
  const { user } = useAuth();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState([]);

  function sendMessage(event: FormEvent) {
    event.preventDefault();

    if (message === "") {
      toast.error("Write a messenger!");
    }else{
        const newMessage = push(ref(database, "message/"));
        set(newMessage, {
          message: message,
          author: user?.name,
          authorId: user?.id,
          avatarAuthor: user?.avatar,
          time: new Date().toLocaleTimeString(),
        }).catch((_) => {
          toast.error("Your message was not sent!");
        });
    
        setMessage("");
    }
  }

  useEffect(() => {
    onValue(
      ref(database, "message/"),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          getMenssages(Object.values(data));
        }
      }
    );
  }, []);

  function getMenssages(data: any) {
    setMessages(data);
  }

  return (
    <div id="page-chat">
      <div>
        <header>
          <h1>Forall</h1>
          <div>
            <img src={user?.avatar || userIcon} alt="foto do usuário" />
          </div>
        </header>
        <main>
          <div className="message-content">
            {messages?.map((menssage: any) => {
              return (
                <div
                  className={
                    user?.id === menssage?.authorId
                      ? "menssage-author"
                      : "menssage-user"
                  }
                >
                  <div className="menssage">
                    <img src={menssage.avatarAuthor || userIcon} alt="foto do usuário" />
                    <p><span>{menssage?.author}</span>{menssage?.message}</p>
                  </div>
                </div>
              );    
            })}
          </div>
          <div ref={scroll}></div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Send a message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Button type="submit">
              <img src={sendIcon} alt="Enviar" />
            </Button>
          </form>
        </main>
        <div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
