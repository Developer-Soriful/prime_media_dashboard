import React, { useEffect, useRef } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { createPortal } from 'react-dom';

const StatusModal = ({
    isOpen,
    onClose,
    type = 'info', // success, error, warning, info
    title,
    message,
    actionLabel,
    onAction
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

    if (!isOpen) return null;

    // Configuration based on type
    const config = {
        success: {
            icon: <CheckCircle size={48} className="text-green-500" />,
            borderColor: 'border-green-500',
            bgColor: 'bg-green-50',
            titleColor: 'text-green-700',
            buttonColor: 'bg-green-600 hover:bg-green-700'
        },
        error: {
            icon: <AlertCircle size={48} className="text-red-500" />,
            borderColor: 'border-red-500',
            bgColor: 'bg-red-50',
            titleColor: 'text-red-700',
            buttonColor: 'bg-red-600 hover:bg-red-700'
        },
        warning: {
            icon: <AlertTriangle size={48} className="text-amber-500" />,
            borderColor: 'border-amber-500',
            bgColor: 'bg-amber-50',
            titleColor: 'text-amber-700',
            buttonColor: 'bg-amber-600 hover:bg-amber-700'
        },
        info: {
            icon: <Info size={48} className="text-blue-500" />,
            borderColor: 'border-blue-500',
            bgColor: 'bg-blue-50',
            titleColor: 'text-blue-700',
            buttonColor: 'bg-blue-600 hover:bg-blue-700'
        }
    };

    const currentConfig = config[type] || config.info;

    return createPortal(
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                ref={modalRef}
                className={`bg-white w-full max-w-sm md:max-w-md rounded-3xl shadow-2xl p-6 md:p-8 relative z-10 animate-in zoom-in-95 duration-200 border-t-8 ${currentConfig.borderColor}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className={`mb-6 p-4 rounded-full ${currentConfig.bgColor}`}>
                        {currentConfig.icon}
                    </div>

                    <h2 className={`text-2xl font-bold mb-3 ${currentConfig.titleColor}`}>
                        {title}
                    </h2>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {message}
                    </p>

                    <div className="w-full flex flex-col gap-3">
                        {actionLabel && onAction && (
                            <button
                                onClick={() => {
                                    onAction();
                                    onClose();
                                }}
                                className={`w-full py-3.5 px-6 rounded-xl text-white font-semibold transition-all shadow-md active:scale-95 ${currentConfig.buttonColor}`}
                            >
                                {actionLabel}
                            </button>
                        )}

                        {!actionLabel && (
                            <button
                                onClick={onClose}
                                className={`w-full py-3.5 px-6 rounded-xl text-white font-semibold transition-all shadow-md active:scale-95 ${currentConfig.buttonColor}`}
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default StatusModal;
