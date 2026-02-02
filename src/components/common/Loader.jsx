import { Loader2 } from 'lucide-react';

export const Loader = ({ size = 24, className = "" }) => {
    return (
        <Loader2
            size={size}
            className={`animate-spin ${className}`}
        />
    );
};

export const ButtonLoader = ({ isLoading, text = "Save", loadingText = "Saving...", className = "", disabled = false, type = "submit", onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${isLoading || disabled
                ? 'opacity-70 cursor-not-allowed bg-indigo-400 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200'
                } ${className}`}
        >
            {isLoading && <Loader size={20} />}
            {isLoading ? loadingText : text}
        </button>
    );
};

export const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                <p className="text-indigo-600 font-medium animate-pulse">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;
