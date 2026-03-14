import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex-1 flex flex-col p-8 bg-gray-50 overflow-hidden">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Messages</h1>
        <p className="text-gray-500 text-sm">Communicate with your team</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-gray-400">
        <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
        <p>No new messages</p>
      </div>
    </div>
  );
}
