import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const messages = [
  {
    supplier: "Endüstriyel Mutfak Ltd.",
    lastMessage: "Ürün stokta mevcut, hemen kargoya verebiliriz.",
    date: "2024-02-05",
    unread: true,
    conversation: [
      {
        sender: "supplier",
        message: "Merhaba, nasıl yardımcı olabilirim?",
        date: "2024-02-05 09:00"
      },
      {
        sender: "me",
        message: "Ürün stoğunuz var mı?",
        date: "2024-02-05 09:05"
      },
      {
        sender: "supplier",
        message: "Ürün stokta mevcut, hemen kargoya verebiliriz.",
        date: "2024-02-05 09:10"
      }
    ]
  },
  {
    supplier: "Pro Ekipman A.Ş.",
    lastMessage: "İndirim kampanyamız devam ediyor.",
    date: "2024-02-04",
    unread: false,
    conversation: [
      {
        sender: "supplier",
        message: "İndirim kampanyamız başladı!",
        date: "2024-02-04 10:00"
      },
      {
        sender: "me",
        message: "Ne kadar indirim var?",
        date: "2024-02-04 10:30"
      },
      {
        sender: "supplier",
        message: "İndirim kampanyamız devam ediyor.",
        date: "2024-02-04 11:00"
      }
    ]
  }
];

const Messages = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const selectedConversation = messages.find(m => m.supplier === selectedSupplier)?.conversation || [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedSupplier) return;

    const messageToAdd = {
      sender: "me" as const,
      message: newMessage,
      date: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    const supplierIndex = messages.findIndex(m => m.supplier === selectedSupplier);
    if (supplierIndex !== -1) {
      messages[supplierIndex].conversation.push(messageToAdd);
      messages[supplierIndex].lastMessage = newMessage;
      messages[supplierIndex].date = messageToAdd.date.split(' ')[0];
    }

    setNewMessage("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Mesajlar
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Mesajlarım</DialogTitle>
          <DialogDescription>Tedarikçilerle olan mesajlaşmalarınız</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row h-[calc(100vh-200px)] sm:h-[500px] gap-4">
          <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r pr-4">
            <ScrollArea className="h-full">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 mb-2 border rounded-lg cursor-pointer transition-colors
                    ${message.unread ? 'bg-blue-50' : 'bg-white'}
                    ${selectedSupplier === message.supplier ? 'border-primary' : 'border-gray-200'}
                    hover:border-primary`}
                  onClick={() => setSelectedSupplier(message.supplier)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{message.supplier}</h3>
                    <span className="text-xs text-gray-500">{message.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4 mb-4">
              {selectedSupplier ? (
                <div className="space-y-4">
                  {selectedConversation.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.sender === 'me'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {msg.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Mesajlaşmayı görüntülemek için bir tedarikçi seçin
                </div>
              )}
            </ScrollArea>
            <div className="flex gap-2 mt-auto">
              <Input 
                placeholder="Mesajınızı yazın..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>Gönder</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Messages;
