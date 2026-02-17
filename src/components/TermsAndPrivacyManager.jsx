import React, { useState } from 'react';

const TermsAndPrivacyManager = () => {
  // Main Data State
  const [activeTab, setActiveTab] = useState('terms');
  const [isEditing, setIsEditing] = useState(false);

  const [content, setContent] = useState({
    terms: "01. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s...\n\n01. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry...\n\n01. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry...",
    privacy: "01. Your Privacy is important to us. Lorem Ipsum has been the industry's standard dummy text...\n\n01. We protect your data with the highest standards...\n\n01. This policy explains how we collect and use your information."
  });

  // Temporary state for editing
  const [tempText, setTempText] = useState("");

  const handleEditStart = () => {
    setTempText(content[activeTab]);
    setIsEditing(true);
  };

  const handleSave = () => {
    setContent(prev => ({
      ...prev,
      [activeTab]: tempText
    }));
    setIsEditing(false);
  };

  return (
    <div className="pr-9 pt-10 min-h-screen font-sans">
      {/* Tab Switcher */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => { setActiveTab('terms'); setIsEditing(false); }}
          className={`px-6 py-2 rounded-xl border border-[#6200EE] font-medium transition-all ${activeTab === 'terms' ? 'bg-[#F3E8FF] text-[#6200EE]' : 'bg-gray-100 text-gray-400'}`}
        >
          Terms & Condition
        </button>
        <button
          onClick={() => { setActiveTab('privacy'); setIsEditing(false); }}
          className={`px-6 py-2 rounded-xl border border-[#6200EE] font-medium transition-all ${activeTab === 'privacy' ? 'bg-[#F3E8FF] text-[#6200EE]' : 'bg-gray-100 text-gray-400'}`}
        >
          Privacy Policy
        </button>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              className="w-full h-[500px] p-6 border border-purple-100 rounded-3xl focus:ring-2 focus:ring-[#6200EE] outline-none text-gray-600 leading-relaxed shadow-inner bg-gray-50"
              placeholder="Enter text here..."
            />
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-10 py-3 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-14 py-3 bg-gradient-to-r from-[#6200EE] to-purple-500 text-white rounded-2xl font-bold  active:translate-y-1 transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Displaying text with line breaks */}
            <div className="text-gray-500 leading-8 whitespace-pre-line text-justify pr-10">
              {content[activeTab]}
            </div>

            {/* Edit Button */}
            <button
              onClick={handleEditStart}
              className="mt-10 px-14 py-3 cursor-pointer bg-gradient-to-r from-[#6200EE] to-purple-500 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 hover:opacity-90 active:scale-95 transition-all"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsAndPrivacyManager;