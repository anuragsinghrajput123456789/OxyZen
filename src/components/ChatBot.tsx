
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
const GEMINI_API_KEY = 'AIzaSyBrVugq-g35-6OSMAL_YRmY8iq_j8uWfuE';

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="w-full max-w-3xl h-[750px] flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-3xl overflow-hidden animate-bounce-in">
        {/* Enhanced Header with better typography */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg">
              <Bot className="h-8 w-8 text-white drop-shadow-sm" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-poppins tracking-tight">AI Air Quality Assistant</h3>
              <p className="text-blue-100/90 text-sm flex items-center font-medium">
                <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                Powered by Gemini AI • Voice & Text Enabled
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-white/90 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200 relative z-10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Enhanced Messages Section */}
        <ScrollArea className="flex-1 p-6 bg-gradient-to-b from-transparent to-white/50 dark:to-gray-900/50">
          <div className="space-y-5">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`max-w-[85%] p-5 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white shadow-blue-500/25 border border-blue-400/20'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 border border-gray-200/50 dark:border-gray-600/50 shadow-gray-500/10'
                  }`}
                >
                  <div className="text-base font-medium leading-relaxed whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-3 flex items-center gap-1 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span className="text-base font-medium text-gray-700 dark:text-gray-300">AI is thinking...</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Enhanced Quick Questions Section */}
        {!loading && (
          <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 dark:from-gray-800/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quick questions to get started</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-sm font-medium h-auto p-4 text-left rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/60 dark:border-gray-600/60 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md hover:scale-[1.02] transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 group-hover:scale-125 transition-transform duration-200"></div>
                      <span className="leading-relaxed">{question}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Enhanced Voice Recognition Status */}
            {isListening && (
              <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/60 dark:border-blue-700/60 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-3 text-blue-600 dark:text-blue-400">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-200"></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse animation-delay-400"></div>
                  </div>
                  <span className="text-base font-semibold">Listening... Speak now</span>
                  <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            )}

            {/* Enhanced Input Section */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about air quality, masks, or health protection..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={loading || isListening}
                  className="rounded-2xl h-12 text-base font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/60 dark:border-gray-600/60 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 pr-4"
                />
                {input && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 font-medium">
                    {input.length}/500
                  </div>
                )}
              </div>
              
              {/* Enhanced Voice Recognition Button */}
              {speechSupported && (
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={loading}
                  variant="outline"
                  size="icon"
                  className={`rounded-2xl h-12 w-12 transition-all duration-300 backdrop-blur-sm hover:scale-105 ${
                    isListening 
                      ? 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 shadow-red-400/20 shadow-lg animate-pulse' 
                      : 'bg-white/80 dark:bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-400/20'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  {isListening ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
              )}
              
              <Button 
                onClick={sendMessage} 
                disabled={loading || !input.trim() || isListening}
                className="rounded-2xl h-12 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Enhanced Voice Support Info */}
            {!speechSupported && (
              <div className="mt-3 p-3 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl border border-amber-200/50 dark:border-amber-700/30">
                <p className="text-sm text-amber-700 dark:text-amber-400 text-center font-medium flex items-center justify-center gap-2">
                  <Bot className="h-4 w-4" />
                  Voice input not supported in this browser
                </p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
