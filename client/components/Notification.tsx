import React, { useEffect, useState } from 'react';

interface NotificationProps {
    visible: boolean;
    icon?: React.ReactNode;
    title: string;
    type: 'success' | 'error';
    message: string;
    onClose?: () => void;
    autoCloseDelay?: number;
}

const Notification: React.FC<NotificationProps> = ({ 
    visible, 
    icon, 
    title, 
    message,
    type,
    onClose,
    autoCloseDelay = 5000 
}) => {
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        setIsVisible(visible);
        
        if (visible && autoCloseDelay > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoCloseDelay);
            
            return () => clearTimeout(timer);
        }
    }, [visible, autoCloseDelay]);

    const handleClose = () => {
        setIsVisible(false);
        onClose && onClose();
    };

    if (!isVisible) return null;

    const bgColor = type === 'error' ? 'bg-red-600' : 'bg-green-600';

    return (
        <div role="alert" className={`mt-3 notification fixed top-4 right-4 flex flex-col w-80 p-4 text-sm text-white ${bgColor} rounded-lg shadow-lg transition-opacity duration-300`}>
            <p className="flex items-center text-base font-semibold mb-2">
                {icon || (type === 'error' ? <ErrorIcon /> : <SuccessIcon />)}
                <span className="ml-2">{title}</span>
            </p>
            <p className="ml-7">
                {message}
            </p>

            <button 
                onClick={handleClose}
                className="absolute top-2 right-2 p-1 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
                aria-label="Close notification"
            >
                <CloseIcon />
            </button>
        </div>
    );
};

const SuccessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);

const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364a9 9 0 0 1-12.728 0L12 12M12 12l8.354-8.354M4.5 12l.354 8.354z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default Notification;
