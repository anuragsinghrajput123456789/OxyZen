
import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Bot, Sparkles, Mic, MicOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface ChatBotProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Your Gemini API key - replace with your actual key
const GEMINI_API_KEY = 'c4be273320974f06b606241977fde51a';

export const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Hello! I\'m your AI Air Quality Assistant. Ask me anything about air pollution, masks, health protection, or AQI levels. You can type or use voice input by clicking the microphone button. How can I help you breathe safer today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check for speech recognition support
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => {
          setIsListening(true);
        };

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          toast({
            title: "Voice Recognition Error",
            description: "Could not recognize speech. Please try again or use text input.",
            variant: "destructive",
          });
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast({
          title: "Voice Recognition Error",
          description: "Could not start voice recognition. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert AI assistant specializing in air quality, air pollution, masks, and respiratory health protection. Your knowledge includes:

- Air Quality Index (AQI) levels and their health implications
- Different types of masks (N95, KN95, P100, surgical, cloth) and their effectiveness
- Air pollution sources and health effects
- Respiratory health protection strategies
- When and how to use different protective equipment
- Indoor and outdoor air quality management

Answer this question with practical, accurate, and helpful information: "${input}"

Keep your response informative but conversational, and always prioritize health and safety. If the question is outside your expertise area, politely redirect to air quality and health protection topics.`
            }]
          }]
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to get AI response');
      }

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I couldn\'t process your question. Please try again.';

      const aiMessage: Message = {
        role: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "What AQI level requires a mask?",
    "Difference between N95 and KN95?",
    "Best mask for wildfire smoke?",
    "How to improve indoor air quality?",
    "When is it safe to exercise outdoors?",
    "Signs of air pollution exposure?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="w-full max-w-2xl h-[700px] flex flex-col bg-white dark:bg-gray-800 shadow-2xl border-0 rounded-3xl overflow-hidden">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Air Quality Assistant</h3>
              <p className="text-blue-100 text-sm flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by Gemini AI • Voice Enabled
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 rounded-xl">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-md ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                  <div className={`text-xs mt-2 opacity-70`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        {!loading && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="mb-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">💡 Quick questions to get started:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs h-auto p-2 text-left rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all duration-200"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Voice Recognition Status */}
            {isListening && (
              <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Listening... Speak now</span>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                </div>
              </div>
            )}

            {/* Input with Voice */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about air quality, masks, or health protection..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={loading || isListening}
                className="rounded-xl"
              />
              
              {/* Voice Recognition Button */}
              {speechSupported && (
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={loading}
                  variant="outline"
                  size="icon"
                  className={`rounded-xl transition-all duration-200 ${
                    isListening 
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30' 
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              )}
              
              <Button 
                onClick={sendMessage} 
                disabled={loading || !input.trim() || isListening}
                className="rounded-xl px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Voice Support Info */}
            {!speechSupported && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Voice input not supported in this browser
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
