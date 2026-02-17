import React from 'react';
import { useRouteError, useNavigate } from 'react-router';
import { AlertCircle, ArrowLeft, Home, RefreshCcw } from 'lucide-react';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    console.error(error);

    const is404 = error?.status === 404;

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8 flex justify-center">
                    <div className="p-4 bg-red-50 rounded-full">
                        <AlertCircle className="w-12 h-12 text-red-500" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {is404 ? '404 - Page Not Found' : 'Oops! Something went wrong'}
                </h1>

                <p className="text-gray-600 mb-8">
                    {is404
                        ? "The page you're looking for doesn't exist or has been moved."
                        : "An unexpected error occurred. Our team has been notified and is working to fix it."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#006C76] text-white rounded-xl hover:bg-[#005a63] transition-all duration-200 font-medium shadow-lg shadow-[#006C76]/20"
                    >
                        <Home className="w-4 h-4" />
                        Dashboard
                    </button>

                    {!is404 && (
                        <button
                            onClick={() => window.location.reload()}
                            className="sm:col-span-2 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                        >
                            <RefreshCcw className="w-4 h-4" />
                            Try Again
                        </button>
                    )}
                </div>

                <div className="mt-12 text-sm text-gray-400">
                    {error?.statusText || error?.message || "Unexpected Application Error"}
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
