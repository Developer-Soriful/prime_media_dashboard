import { useState } from 'react';
import { X, Send } from 'lucide-react';
import adminService from '../../services/adminService';
import StatusModal from './StatusModal';

const SingleUserModal = ({ user, onClose, onUpdate }) => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });

  if (!user) return null;

  const handleSendNotification = async () => {
    if (!message.trim()) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please enter a message before sending.',
      });
      return;
    }

    if (!title.trim()) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please enter a notification title.',
      });
      return;
    }

    setIsSending(true);
    try {
      const response = await adminService.sendDirectNotification(user.id, user.role, {
        title: title,
        message: message,
        type: 'NORMAL',
      });

      console.log('Notification response:', response);

      setModal({
        isOpen: true,
        type: 'success',
        title: 'Notification Sent',
        message: 'Your notification has been sent successfully!',
      });

      setMessage('');
      setTitle('');
    } catch (error) {
      console.error('Failed to send notification:', error);
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Send Failed',
        message: error.response?.data?.message || 'Failed to send notification. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleBlockUnblock = async () => {
    setIsBlocking(true);
    try {
      if (isBlocked) {
        await adminService.unblockUser(user.id);
        setModal({
          isOpen: true,
          type: 'success',
          title: 'User Unblocked',
          message: 'The user has been successfully unblocked.',
        });
      } else {
        await adminService.blockUser(user.id, { reason: 'Admin action' }); // Provide a default reason
        setModal({
          isOpen: true,
          type: 'success',
          title: 'User Blocked',
          message: 'The user has been successfully blocked.',
        });
      }
      if (onUpdate) onUpdate(); // callback to refresh list
    } catch (error) {
      console.error('Failed to update user block status:', error);
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Action Failed',
        message: error.response?.data?.message || 'Failed to update user status.',
      });
    } finally {
      setIsBlocking(false);
    }
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const isBlocked = user.isBlocked || user.role === "Blocked"; // basic check, might need refinement if 'role' isn't reliably 'Blocked'

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-700 mx-auto">User Details</h2>
          <button
            onClick={onClose}
            className="absolute right-6 top-4 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: User Info */}
          <div className="space-y-4">
            <div>
              <label className="text-gray-500 text-sm">Name</label>
              <input readOnly value={user.userName || user.name || 'N/A'} className="w-full p-3 border-2 border-purple-100 rounded-xl bg-gray-50 outline-none" />
            </div>
            <div>
              <label className="text-gray-500 text-sm">Email</label>
              <input readOnly value={user.email} className="w-full p-3 border-2 border-purple-100 rounded-xl bg-gray-50 outline-none" />
            </div>
            <div>
              <label className="text-gray-500 text-sm">Phone</label>
              <input readOnly value={user.phoneNumber || user.phone || 'N/A'} className="w-full p-3 border-2 border-purple-100 rounded-xl bg-gray-50 outline-none" />
            </div>

            {/* Dynamic Block/Unblock Button */}
            <button
              onClick={handleBlockUnblock}
              disabled={isBlocking}
              className={`w-full py-4 text-white font-bold rounded-2xl shadow-lg mt-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isBlocked
                ? "bg-linear-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                : "bg-linear-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
                }`}
            >
              {isBlocking ? 'Processing...' : (isBlocked ? "Unblock User" : "Block User")}
            </button>
          </div>

          {/* Right Side: Message Input */}
          <div className="space-y-4 flex flex-col">
            <label className="font-bold text-gray-700">Write Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-4 border-2 border-purple-100 rounded-2xl min-h-[180px] focus:border-purple-500 outline-none transition-all"
            ></textarea>
            <div className="flex gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notification Title"
                className="flex-1 p-3 border-2 border-purple-100 rounded-xl outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSendNotification}
                disabled={isSending}
                className="p-3 bg-purple-50 text-purple-600 border-2 border-purple-100 rounded-xl hover:bg-purple-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <StatusModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        actionLabel="OK"
        onAction={closeModal}
      />
    </div>
  );
};

export default SingleUserModal;