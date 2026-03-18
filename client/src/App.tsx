
import { useState, useEffect, useRef } from 'react'
import './index.css'

// API URL - uses environment variable in production, relative path in development
const API_URL = import.meta.env.VITE_API_URL || '';

interface Message {
  role: 'user' | 'model'
  text: string
}

export default function App() {

  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false) //микрофон (голосовой ввод)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
      if (!inputText.trim()) return;

      const userMsg = inputText; // Сохраняем текст

      // 1. Добавляем сообщение юзера в UI
      setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
      setInputText('');
      setIsLoading(true);

      try {
        const response = await fetch(`${API_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg }),
        });

        if (!response.ok) throw new Error('Бэк ответил ошибкой');

        const data = await response.json();

        // 3. Добавляем ответ ИИ в чат
        setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
      } catch (error) {
        console.error(error);
        setMessages((prev) => [...prev, { role: 'model', text: 'Ошибка: сервер не отвечает :(' }]);
      } finally {
        setIsLoading(false);
      }
  };

  const toggleMicro = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if(!SpeechRec) {
      alert('А где микрофон ? :(');
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = 'ru-RU';
    recognition.interimResults = false;
  
    recognition.onstart = () => {
      setIsListening(true)
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(inputText + transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  }


  return (
    <div className='flex flex-col items-center w-screen h-screen text-2xl text-white bg-blue-950 '>
      <main ref={scrollRef} className='flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-w-3xl mx-auto w-full pb-12 no-scrollbar'>
        {messages.length === 0 ? (
          <div className="text-center mt-20 text-slate-400">
            <h2 className='text-3xl mb-6'>Hi there!</h2>
            <p className='text-xl'>What would you like to know?</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-xl max-w-[80%] wrap-break-word whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-slate-800 self-start'}`}>
              {msg.text}
            </div>
          ))
        )}
        {isLoading && (
          <div className="self-start bg-slate-800 p-4 rounded-xl rounded-bl-none border border-slate-700 text-slate-400 animate-pulse">
            Writing...
          </div>
        )}
      </main>
      <footer className="w-full m-6 max-w-2xl bottom-8 px-4 shrink-0">
        <div className="relative flex items-center bg-[#0a2540] border border-blue-900/50 rounded-2xl p-2 shadow-xl">
          <button onClick={toggleMicro} className={`p-3 
            ${isListening 
            ? 
              'animate-pulse bg-red-600 bg rounded-full text-white hover:scale-110' 
            : 
              'text-blue-300 rounded-full hover:text-white transition'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask whatever you want"
            className="text-center bg-transparent border-none outline-none text-white placeholder-blue-300/50 text-xl w-5xl"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 p-3 rounded-xl text-white hover:bg-blue-500 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </footer>
    </div>
  )
}
