import React, { useEffect, useRef } from 'react';
import { X, Bell, Clock, CheckCircle } from 'lucide-react';
import { createPortal } from 'react-dom';

const NotificationDetailModal = ({
    isOpen,
    onClose,
    notification,
    onMarkAsRead
}) => {
    const modalRef = useRef(null);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !notification) return null;

    // Format timestamp to readable date and time
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return {
            date: date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };

    const { date, time } = formatDateTime(notification.createdAt);

    // Type badge colors
    const typeColors = {
        NORMAL: 'bg-blue-100 text-blue-700',
        AI: 'bg-purple-100 text-purple-700',
        URGENT: 'bg-red-100 text-red-700',
        INFO: 'bg-green-100 text-green-700',
    };

    return createPortal(
        <div className="fixed inset-0 z-130 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                ref={modalRef}
                className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 relative z-10 animate-in zoom-in-95 fade-in duration-200 border-t-8 border-[#6200EE]"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-full ${!notification.isRead ? 'bg-purple-100' : 'bg-gray-100'}`}>
                        <Bell
                            size={28}
                            className={!notification.isRead ? 'text-[#6200EE]' : 'text-gray-400'}
                            fill={!notification.isRead ? '#6200EE' : 'none'}
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-bold text-gray-800">{notification.title}</h2>
                            {!notification.isRead && (
                                <span className="px-2 py-0.5 bg-[#6200EE] text-white text-xs rounded-full font-semibold">
                                    New
                                </span>
                            )}
                            {notification.type && (
                                <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${typeColors[notification.type] || typeColors.NORMAL}`}>
                                    {notification.type}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                            <Clock size={14} />
                            <span>{date} at {time}</span>
                        </div>
                    </div>
                </div>

                {/* Notification Content */}
                <div className="mb-8">
                    <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-100">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {notification.message}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {!notification.isRead && (
                        <button
                            onClick={() => {
                                onMarkAsRead(notification.id);
                                onClose();
                            }}
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-[#6200EE] hover:bg-[#7722FF] text-white font-semibold rounded-xl transition-all shadow-md active:scale-95"
                        >
                            <CheckCircle size={18} />
                            Mark as Read
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className={`${!notification.isRead ? 'flex-1' : 'w-full'} py-3.5 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all active:scale-95`}
                    >
                        Close
                    </button>
                </div>

                {/* Read Status Indicator */}
                {notification.isRead && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
                        <CheckCircle size={16} />
                        <span className="font-medium">Already marked as read</span>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default NotificationDetailModal;
