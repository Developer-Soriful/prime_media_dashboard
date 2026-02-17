import { useState, useEffect, useCallback } from 'react';
import {
  FileText, Landmark, Building2, Download, User, Mail,
  Phone, X, Eye, Clock, Trash2, AlertCircle, Loader2,
  CheckCircle, XCircle
} from 'lucide-react';
import verificationService from '../services/verificationService';

// ─────────────────────────────────────────────────────
// Custom Hook — useVerificationManager
// ─────────────────────────────────────────────────────
const useVerificationManager = () => {
  const [requests, setRequests] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  // Fetch list
  const fetchRequests = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await verificationService.getPending(page);
      if (response.success) {
        setRequests(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Failed to fetch verification requests:', err);
      setError('Could not load verification requests. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch details
  const fetchDetails = async (userId) => {
    setIsDetailsLoading(true);
    setError(null);
    try {
      const response = await verificationService.getDetails(userId);
      if (response.success) {
        setSelectedDetails(response.data);
        return response.data;
      }
    } catch (err) {
      console.error('Failed to fetch details:', err);
      setError('Could not load details for this provider.');
    } finally {
      setIsDetailsLoading(false);
    }
  };

  // Actions
  const approveProvider = async (userId) => {
    setIsActionLoading(true);
    try {
      const response = await verificationService.approve(userId);
      if (response.success) {
        setRequests(prev => prev.filter(r => r.id !== userId));
        setSelectedDetails(null);
        return { success: true };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve provider');
      return { success: false };
    } finally {
      setIsActionLoading(false);
    }
  };

  const rejectProvider = async (userId, reason) => {
    if (!reason) return { success: false, error: 'Reason is required' };
    setIsActionLoading(true);
    try {
      const response = await verificationService.reject(userId, reason);
      if (response.success) {
        setRequests(prev => prev.filter(r => r.id !== userId));
        setSelectedDetails(null);
        return { success: true };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject provider');
      return { success: false };
    } finally {
      setIsActionLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    selectedDetails,
    setSelectedDetails,
    isLoading,
    isDetailsLoading,
    isActionLoading,
    error,
    pagination,
    fetchRequests,
    fetchDetails,
    approveProvider,
    rejectProvider,
  };
};

// ─────────────────────────────────────────────────────
// Main Component — VerificationManager
// ─────────────────────────────────────────────────────
const VerificationManager = () => {
  const {
    requests,
    selectedDetails,
    setSelectedDetails,
    isLoading,
    isDetailsLoading,
    isActionLoading,
    error,
    fetchDetails,
    approveProvider,
    rejectProvider,
  } = useVerificationManager();

  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  const handleCardClick = (user) => {
    fetchDetails(user.id);
  };

  const closeModal = () => {
    setSelectedDetails(null);
    setShowRejectInput(false);
    setRejectReason('');
  };

  const onApprove = async () => {
    if (!selectedDetails) return;
    const result = await approveProvider(selectedDetails.user.id);
    if (result.success) {
      alert('Provider approved successfully');
    }
  };

  const onReject = async () => {
    if (!selectedDetails || !rejectReason.trim()) return;
    const result = await rejectProvider(selectedDetails.user.id, rejectReason);
    if (result.success) {
      alert('Provider rejected successfully');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600 mb-4" />
        <p className="text-gray-500 font-medium">Loading verification requests...</p>
      </div>
    );
  }

  return (
    <div className="font-nunito mr-10 bg-gray-50 min-h-screen">
      <div className="mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Requests</h2>
        <p className="text-gray-500 mb-8">Review and manage business verification applications.</p>

        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-2xl">
            <AlertCircle size={18} className="shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
            <CheckCircle size={48} className="text-green-200 mb-4" />
            <p className="text-gray-500 font-bold text-lg">Work All Caught Up!</p>
            <p className="text-gray-400">No pending verification requests at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((user) => (
              <div
                key={user.id}
                onClick={() => handleCardClick(user)}
                className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center overflow-hidden">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User size={24} className="text-purple-300" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-gray-800 truncate">{user.name || 'Unknown User'}</h3>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <div className="bg-orange-50 p-2 rounded-xl text-orange-500">
                    <Clock size={18} />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase">
                    {user.status || 'Pending'}
                  </span>
                  <button className="flex items-center gap-1 text-xs font-bold text-gray-500 group-hover:text-[#6200EE]">
                    Review Details <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- Verification Modal --- */}
        {selectedDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <div className="bg-gray-50 w-full max-w-5xl my-8 rounded-[40px] shadow-2xl relative p-8">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-all z-10"
              >
                <X size={24} />
              </button>

              {isDetailsLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-purple-600 mb-4" />
                  <p className="text-gray-500">Fetching provider details...</p>
                </div>
              ) : (
                <>
                  {/* User Profile Header */}
                  <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-6 mt-4">
                    <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center overflow-hidden border-4 border-purple-50">
                      {selectedDetails.profile.profilePicture ? (
                        <img src={selectedDetails.profile.profilePicture} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} className="text-purple-300" />
                      )}
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                      <InfoBox icon={<User size={18} />} color="text-purple-600" label="Name" value={selectedDetails.profile.name} />
                      <InfoBox icon={<Mail size={18} />} color="text-blue-500" label="Email" value={selectedDetails.user.email} />
                      <InfoBox icon={<Phone size={18} />} color="text-green-500" label="Phone" value={selectedDetails.profile.phoneNumber || selectedDetails.user.phone || 'N/A'} />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-xl font-bold text-[#6200EE] uppercase tracking-wide">Reviewing Documents</h2>
                    {!showRejectInput ? (
                      <div className="flex gap-3 w-full md:w-auto">
                        <button
                          onClick={() => setShowRejectInput(true)}
                          disabled={isActionLoading}
                          className="flex-1 md:flex-none px-6 py-3 bg-white text-red-500 rounded-2xl font-bold border border-red-50 shadow-sm hover:bg-red-50 transition-all disabled:opacity-50"
                        >
                          Decline
                        </button>
                        <button
                          onClick={onApprove}
                          disabled={isActionLoading}
                          className="flex-1 md:flex-none px-6 py-3 bg-[#6200EE] text-white rounded-2xl font-bold shadow-lg hover:bg-purple-700 active:translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isActionLoading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                          Approve User
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row gap-3 w-full md:max-w-md">
                        <input
                          type="text"
                          placeholder="Enter reason for rejection..."
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          className="flex-1 px-4 py-3 rounded-2xl border border-red-100 focus:ring-2 focus:ring-red-400 outline-none"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={onReject}
                            disabled={isActionLoading || !rejectReason.trim()}
                            className="px-6 py-3 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all disabled:opacity-50"
                          >
                            Confirm Reject
                          </button>
                          <button
                            onClick={() => setShowRejectInput(false)}
                            className="p-3 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Business Info */}
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                      <h3 className="flex items-center gap-2 font-bold mb-5 text-gray-700">
                        <Building2 size={20} className="text-purple-600" /> Business Info
                      </h3>
                      {selectedDetails.businessInfo ? (
                        <div className="space-y-4">
                          <InfoRow label="Company Name" value={selectedDetails.businessInfo.companyName} />
                          <InfoRow label="Registration No." value={selectedDetails.businessInfo.registrationNumber} />
                          <InfoRow label="Tax ID" value={selectedDetails.businessInfo.taxNumber} />
                          <InfoRow label="VAT ID" value={selectedDetails.businessInfo.vatId} />
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm italic py-4">No business information provided.</p>
                      )}
                    </div>

                    {/* Banking Info */}
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                      <h3 className="flex items-center gap-2 font-bold mb-5 text-gray-700">
                        <Landmark size={20} className="text-green-600" /> Bank Details
                      </h3>
                      {selectedDetails.bankDetails ? (
                        <div className="space-y-4">
                          <InfoRow label="Holder Name" value={selectedDetails.bankDetails.holderName} />
                          <InfoRow label="IBAN Number" value={selectedDetails.bankDetails.iban} />
                          <InfoRow label="Bank Name" value={selectedDetails.bankDetails.bankName} />
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm italic py-4">No banking details provided.</p>
                      )}
                    </div>

                    {/* Documents Section */}
                    <div className="md:col-span-2 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                      <h3 className="flex items-center gap-2 font-bold mb-6 text-gray-700">
                        <FileText size={20} className="text-orange-500" /> Submitted Documents
                      </h3>
                      {selectedDetails.documents && selectedDetails.documents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedDetails.documents.map((doc, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-200 transition-all group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                                  <FileText size={20} />
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Document {idx + 1}</p>
                                  <p className="text-xs font-bold text-gray-700 truncate max-w-[200px]">{doc.split('/').pop()}</p>
                                </div>
                              </div>
                              <a
                                href={doc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white rounded-lg text-purple-600 hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                              >
                                <Download size={18} />
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                          <XCircle size={32} className="text-red-200 mb-2" />
                          <p className="text-gray-400 text-sm">No documents submitted for review.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Helpers ──
const InfoBox = ({ icon, color, label, value }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
    <div className={`p-2 bg-white rounded-xl shadow-sm ${color}`}>{icon}</div>
    <div className="overflow-hidden">
      <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">{label}</p>
      <p className="text-xs font-bold text-gray-800 truncate">{value || 'N/A'}</p>
    </div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-50 pb-2">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</span>
    <span className="text-sm font-bold text-gray-800">{value || 'N/A'}</span>
  </div>
);

export default VerificationManager;