import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Plus, Video as VideoIcon, Calendar, Loader2, AlertCircle, Trash2, Edit3 } from 'lucide-react';
import mediaService from '../services/mediaService';

// ─────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────
const MAX_VIDEO_SIZE_MB = 50;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;
const MEDIA_TYPE = 'VIDEO';
const STORAGE_KEY = 'admin_promotions';

// ─────────────────────────────────────────────────────
// Persistence Helpers (localStorage)
// ─────────────────────────────────────────────────────
const loadPromotions = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const persistPromotions = (promotions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(promotions));
};

// ─────────────────────────────────────────────────────
// Custom Hook — usePromotionManager
// Encapsulates CRUD logic with API-first + localStorage fallback
// ─────────────────────────────────────────────────────
const usePromotionManager = () => {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Load promotions on mount
  const fetchPromotions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const localData = loadPromotions();

      // For entries that have a mediaId (API-managed), try to refresh
      const refreshed = await Promise.all(
        localData.map(async (promo) => {
          if (promo.mediaId) {
            try {
              const res = await mediaService.getById(promo.mediaId);
              if (res.success && res.data) {
                return { ...promo, ...mapApiToLocal(res.data) };
              }
            } catch {
              // API failed — keep local copy as-is
            }
          }
          return promo;
        })
      );

      setPromotions(refreshed);
      persistPromotions(refreshed);
    } catch {
      // Fall back to raw localStorage
      setPromotions(loadPromotions());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  // ── Helpers ──
  const generateId = () => `promo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  const mapLocalToApi = (formData) => ({
    type: MEDIA_TYPE,
    url: formData.videoUrl || formData.url,
    title: formData.title,
    description: formData.description || '',
    category: formData.category || 'Promotion',
    location: formData.location || '',
  });

  const mapApiToLocal = (apiData) => ({
    mediaId: apiData.id,
    title: apiData.title,
    videoUrl: apiData.url,
    description: apiData.description || '',
    category: apiData.category || 'Promotion',
    type: apiData.type || MEDIA_TYPE,
  });

  // ── CREATE ──
  const createPromotion = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    const newPromo = {
      id: generateId(),
      title: formData.title,
      videoUrl: formData.videoUrl || formData.url,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description || '',
      category: formData.category || 'Promotion',
      location: formData.location || '',
      type: MEDIA_TYPE,
      mediaId: null,
      createdAt: new Date().toISOString(),
    };

    try {
      // Try API first
      const response = await mediaService.create(mapLocalToApi(formData));
      if (response.success && response.data) {
        newPromo.mediaId = response.data.id;
        newPromo.videoUrl = response.data.url || newPromo.videoUrl;
      }
    } catch (err) {
      // API failed (e.g. 403 for admin role) — proceed with local-only
      console.warn('Media API unavailable, saving locally:', err.response?.status || err.message);
    }

    // Always persist locally
    const updated = [...promotions, newPromo];
    setPromotions(updated);
    persistPromotions(updated);
    setIsSubmitting(false);
    return { success: true };
  };

  // ── UPDATE ──
  const updatePromotion = async (promoId, formData) => {
    setIsSubmitting(true);
    setError(null);

    const existing = promotions.find((p) => p.id === promoId);

    // Try API if we have a mediaId
    if (existing?.mediaId) {
      try {
        await mediaService.update(existing.mediaId, mapLocalToApi(formData));
      } catch (err) {
        console.warn('Media API update failed, saving locally:', err.response?.status || err.message);
      }
    }

    // Always update local state
    const updated = promotions.map((p) =>
      p.id === promoId
        ? {
          ...p,
          title: formData.title,
          videoUrl: formData.videoUrl || formData.url,
          startDate: formData.startDate,
          endDate: formData.endDate,
          description: formData.description || '',
          category: formData.category || 'Promotion',
          location: formData.location || '',
          updatedAt: new Date().toISOString(),
        }
        : p
    );
    setPromotions(updated);
    persistPromotions(updated);
    setIsSubmitting(false);
    return { success: true };
  };

  // ── DELETE ──
  const deletePromotion = async (promoId) => {
    setIsSubmitting(true);
    setError(null);

    const existing = promotions.find((p) => p.id === promoId);

    // Try API if we have a mediaId
    if (existing?.mediaId) {
      try {
        await mediaService.delete(existing.mediaId);
      } catch (err) {
        console.warn('Media API delete failed, removing locally:', err.response?.status || err.message);
      }
    }

    // Always remove locally
    const updated = promotions.filter((p) => p.id !== promoId);
    setPromotions(updated);
    persistPromotions(updated);
    setIsSubmitting(false);
    return { success: true };
  };

  return {
    promotions,
    isLoading,
    isSubmitting,
    error,
    setError,
    fetchPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion,
  };
};

// ─────────────────────────────────────────────────────
// Sub-Component — MediaUploadZone
// ─────────────────────────────────────────────────────
const MediaUploadZone = ({ videoUrl, onVideoChange, disabled }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      alert(`Video too large. Maximum size is ${MAX_VIDEO_SIZE_MB}MB.`);
      return;
    }
    onVideoChange(URL.createObjectURL(file));
  };

  return (
    <div>
      <label className="text-xs font-bold text-gray-400 uppercase ml-1">
        Promotion Video
      </label>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="video/*"
      />
      <div
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`mt-2 border-2 border-dashed border-purple-100 rounded-[32px] h-48 flex flex-col items-center justify-center overflow-hidden bg-gray-50 transition-colors ${disabled ? 'cursor-default' : 'cursor-pointer hover:border-purple-300 hover:bg-purple-50/30'
          }`}
      >
        {videoUrl ? (
          <video
            src={videoUrl}
            controls={disabled}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <VideoIcon className="mx-auto text-purple-300 mb-2" size={32} />
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              Upload Promo Video
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
// Sub-Component — PromotionCard
// ─────────────────────────────────────────────────────
const PromotionCard = ({ promotion, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-[32px] shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-purple-100 transition-all group"
    >
      <div className="relative h-40 bg-gray-200 rounded-3xl overflow-hidden mb-4">
        {promotion.videoUrl ? (
          <video src={promotion.videoUrl} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <VideoIcon className="text-gray-400" />
          </div>
        )}
        {/* Sync Badge */}
        <span
          className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase ${promotion.mediaId
              ? 'bg-green-500/80 text-white'
              : 'bg-amber-500/80 text-white'
            }`}
        >
          {promotion.mediaId ? 'Synced' : 'Local'}
        </span>
      </div>
      <h3 className="font-bold text-gray-800 truncate px-2">{promotion.title}</h3>
      {(promotion.startDate || promotion.endDate) && (
        <div className="flex items-center gap-2 text-[11px] text-indigo-600 font-semibold px-2 mt-2 bg-indigo-50 w-fit py-1 rounded-lg">
          <Calendar size={12} />
          <span>{promotion.startDate || '—'}</span>
          <span>→</span>
          <span>{promotion.endDate || '—'}</span>
        </div>
      )}
      {promotion.category && (
        <span className="inline-block text-[10px] text-purple-500 font-medium px-2 mt-1.5 bg-purple-50 py-0.5 rounded-md">
          {promotion.category}
        </span>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────
// Sub-Component — PromotionModal
// ─────────────────────────────────────────────────────
const INITIAL_FORM = {
  title: '',
  videoUrl: '',
  startDate: '',
  endDate: '',
  description: '',
  category: 'Promotion',
  location: '',
};

const PromotionModal = ({
  modalType,
  promotion,
  isSubmitting,
  onClose,
  onSave,
  onDelete,
  onSwitchToEdit,
}) => {
  const [form, setForm] = useState(INITIAL_FORM);

  // Populate form on open
  useEffect(() => {
    if (promotion && (modalType === 'details' || modalType === 'edit')) {
      setForm({
        title: promotion.title || '',
        videoUrl: promotion.videoUrl || '',
        startDate: promotion.startDate || '',
        endDate: promotion.endDate || '',
        description: promotion.description || '',
        category: promotion.category || 'Promotion',
        location: promotion.location || '',
      });
    } else {
      setForm(INITIAL_FORM);
    }
  }, [promotion, modalType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (blobUrl) => {
    setForm((prev) => ({ ...prev, videoUrl: blobUrl }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return alert('Please enter a promotion title.');
    if (!form.videoUrl) return alert('Please upload a video or paste a URL.');
    if (!form.startDate || !form.endDate) return alert('Please select start and end dates.');

    onSave({
      title: form.title.trim(),
      videoUrl: form.videoUrl,
      url: form.videoUrl,
      startDate: form.startDate,
      endDate: form.endDate,
      description: form.description.trim(),
      category: form.category.trim() || 'Promotion',
      location: form.location.trim(),
    });
  };

  const isReadOnly = modalType === 'details';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-50 flex justify-between items-center z-10 rounded-t-[40px]">
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
            {modalType === 'add' && 'Create Promotion'}
            {modalType === 'edit' && 'Edit Promotion'}
            {modalType === 'details' && 'Promotion Info'}
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="bg-red-500 text-white rounded-full p-2 hover:rotate-90 transition-all disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-5">
          {/* Title */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              Promotion Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              disabled={isReadOnly || isSubmitting}
              className="w-full mt-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#6200EE] outline-none disabled:bg-white disabled:text-gray-500"
              placeholder="e.g. 50% Ramadan Sale"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              Description <span className="text-gray-300 normal-case">(optional)</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={isReadOnly || isSubmitting}
              rows={3}
              className="w-full mt-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#6200EE] outline-none resize-none disabled:bg-white disabled:text-gray-500"
              placeholder="Describe this promotion..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={isReadOnly || isSubmitting}
              className="w-full mt-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#6200EE] outline-none disabled:bg-white disabled:text-gray-500"
              placeholder="e.g. Promotion, Seasonal, Flash Sale"
            />
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                disabled={isReadOnly || isSubmitting}
                className="w-full mt-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-400 disabled:bg-white disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                disabled={isReadOnly || isSubmitting}
                className="w-full mt-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-400 disabled:bg-white disabled:text-gray-500"
              />
            </div>
          </div>

          {/* Video Upload */}
          <MediaUploadZone
            videoUrl={form.videoUrl}
            onVideoChange={handleVideoChange}
            disabled={isReadOnly || isSubmitting}
          />

          {/* URL Input */}
          {!isReadOnly && (
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Or Paste Video URL
              </label>
              <input
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full mt-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#6200EE] outline-none"
                placeholder="https://example.com/promo-video.mp4"
              />
            </div>
          )}

          {/* Actions */}
          <div className="pt-4">
            {modalType === 'details' ? (
              <div className="flex gap-4">
                <button
                  onClick={() => onDelete(promotion.id)}
                  disabled={isSubmitting}
                  className="flex-1 py-4 border-2 border-red-500 text-red-500 rounded-2xl font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete
                    </>
                  )}
                </button>
                <button
                  onClick={onSwitchToEdit}
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-gradient-to-r from-[#6200EE] to-purple-500 text-white rounded-2xl font-bold active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Edit3 size={16} />
                  Edit
                </button>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#6200EE] to-purple-500 text-white rounded-2xl font-bold active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                {modalType === 'add' ? 'Publish Promotion' : 'Update Details'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
// Main Component — DynamicPromotionManager
// ─────────────────────────────────────────────────────
const DynamicPromotionManager = () => {
  const {
    promotions,
    isLoading,
    isSubmitting,
    error,
    setError,
    fetchPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion,
  } = usePromotionManager();

  const [modalType, setModalType] = useState(null);
  const [selectedPromo, setSelectedPromo] = useState(null);

  // ── Modal Handlers ──
  const openModal = (type, promo = null) => {
    setError(null);
    setModalType(type);
    setSelectedPromo(promo);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedPromo(null);
  };

  const handleSave = async (formData) => {
    let result;

    if (modalType === 'add') {
      result = await createPromotion(formData);
    } else if (modalType === 'edit' && selectedPromo) {
      result = await updatePromotion(selectedPromo.id, formData);
    }

    if (result?.success) {
      closeModal();
    }
  };

  const handleDelete = async (promoId) => {
    if (!window.confirm('Are you sure you want to delete this promotion?')) return;

    const result = await deletePromotion(promoId);
    if (result?.success) {
      closeModal();
    }
  };

  // ── Loading State ──
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="pr-9 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Advanced Promotions</h2>
        <button
          onClick={() => openModal('add')}
          className="flex items-center gap-2 bg-[#6200EE] text-white px-6 py-3 rounded-2xl font-bold shadow-[0px_4px_0px_0px_rgba(98,0,238,1)] active:translate-y-1 transition-all"
        >
          <Plus size={20} /> Add New
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-2xl">
          <AlertCircle size={18} className="shrink-0" />
          <p className="text-sm font-medium flex-1">{error}</p>
          <button
            onClick={fetchPromotions}
            className="text-sm font-bold text-red-600 hover:text-red-800 underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {promotions.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <VideoIcon size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-400 font-medium">No promotions yet</p>
          <p className="text-gray-300 text-sm mt-1">
            Click &quot;Add New&quot; to create your first promotion
          </p>
        </div>
      )}

      {/* Promotion Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <PromotionCard
            key={promo.id}
            promotion={promo}
            onClick={() => openModal('details', promo)}
          />
        ))}
      </div>

      {/* Modal */}
      {modalType && (
        <PromotionModal
          modalType={modalType}
          promotion={selectedPromo}
          isSubmitting={isSubmitting}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
          onSwitchToEdit={() => setModalType('edit')}
        />
      )}
    </div>
  );
};

export default DynamicPromotionManager;