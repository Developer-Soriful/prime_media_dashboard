
import React, { useState } from 'react';
import { X, Send, Megaphone } from 'lucide-react';
import adminService from '../../services/adminService';
import StatusModal from './StatusModal';

const GlobalAnnouncementModal = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });

  const handleSendBroadcast = async () => {
    if (!message.trim() || !title.trim()) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please enter both a title and a message.',
      });
      return;
    }

    setIsSending(true);
    try {
      await adminService.sendBroadcast({
        title,
        message,
        type: 'INFO', // Default type, could be made selectable
        targetRole: 'ALL'
      });

      setModal({
        isOpen: true,
        type: 'success',
        title: 'Broadcast Sent',
        message: 'Global announcement sent successfully.',
      });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Broadcast error:", error);
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Send Failed',
        message: error.response?.data?.message || 'Failed to send broadcast.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative">
        <div className="flex justify-between items-center mb-6 text-purple-700">
          <h2 className="text-xl font-bold flex items-center gap-2"><Megaphone /> Global Announcement</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500"><X size={28} /></button>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Announcement Title"
          className="w-full p-4 border-2 border-purple-100 rounded-2xl mb-4 focus:border-purple-500 outline-none"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message to everyone..."
          className="w-full p-4 border-2 border-purple-100 rounded-2xl min-h-[150px] focus:border-purple-500 outline-none mb-4"
        ></textarea>

        <button
          onClick={handleSendBroadcast}
          disabled={isSending}
          className="w-full py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all flex justify-center gap-2 items-center disabled:opacity-50"
        >
          <Send size={20} /> {isSending ? 'Sending...' : 'Send Announcement'}
        </button>
      </div>

      <StatusModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
};

export default GlobalAnnouncementModal;