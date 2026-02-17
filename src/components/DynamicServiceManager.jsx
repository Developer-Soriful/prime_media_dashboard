import { useState, useRef, useEffect } from 'react';
import { X, Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import categoryService from '../services/categoryService';
import { useAuth } from '../context/AuthProvider';

const DynamicServiceManager = () => {
  const { user } = useAuth();

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI States
  const [modalType, setModalType] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permissionError, setPermissionError] = useState(null);

  // Form States
  const [tempName, setTempName] = useState('');
  const [tempImg, setTempImg] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await categoryService.getAll();
      if (response.success && response.data) {
        const mappedServices = response.data.map(cat => ({
          id: cat.id,
          name: cat.categoryName,
          img: null,
          servicesCount: cat.servicesCount
        }));
        setServices(mappedServices);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError("Failed to load categories.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (user) {
      console.log("Current User Role:", user.role);
    }
  }, [user]);

  // Modal Open Function
  const openModal = (type, service = null) => {
    setModalType(type);
    setError(null);
    if (service) {
      setSelectedService(service);
      setTempName(service.name);
      setTempImg(service.img);
    } else {
      setSelectedService(null);
      setTempName('');
      setTempImg(null);
    }
  };

  // Image Upload Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save or Add Logic
  const handleSave = async () => {
    if (!tempName) return alert("Please fill category name!");

    setIsSubmitting(true);
    try {
      if (modalType === 'add') {
        const response = await categoryService.create({ categoryName: tempName });
        if (response.success) {
          await fetchCategories(); // Refresh list
          closeModal();
        }
      } else if (modalType === 'edit' && selectedService) {
        const response = await categoryService.update(selectedService.id, { categoryName: tempName });
        if (response.success) {
          await fetchCategories(); // Refresh list
          closeModal();
        }
      }
    } catch (err) {
      console.error("Failed to save category:", err);
      if (err.response && err.response.status === 403) {
        alert("Permission Denied: You do not have permission to perform this action (PROVIDER role required).");
      } else {
        alert(err.response?.data?.message || "Failed to save category.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    setIsSubmitting(true);
    try {
      const response = await categoryService.delete(id);
      if (response.success) {
        await fetchCategories(); // Refresh list
        closeModal();
      }
    } catch (err) {
      console.error("Failed to delete category:", err);
      if (err.response && err.response.status === 403) {
        alert("Permission Denied: You do not have permission to delete this category (PROVIDER role required).");
      } else {
        alert(err.response?.data?.message || "Failed to delete category.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setTempName('');
    setTempImg(null);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={fetchCategories}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* 1. Service List Rendering */}
      <div className="flex flex-wrap gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => openModal('details', service)}
          >
            <div className="w-20 h-20 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center overflow-hidden group-hover:border-purple-400 transition-all relative">
              {service.img ? (
                <img src={service.img} alt={service.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-purple-50 flex items-center justify-center text-purple-200 text-2xl font-bold">
                  {service.name.charAt(0).toUpperCase()}
                </div>
              )}
              {service.servicesCount !== undefined && (
                <span className="absolute top-1 right-1 bg-purple-100 text-purple-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {service.servicesCount}
                </span>
              )}
            </div>
            <span className="text-xs mt-2 text-gray-700 font-semibold">{service.name}</span>
          </div>
        ))}

        {/* Add Button */}
        <button
          onClick={() => openModal('add')}
          className="w-20 h-20 bg-white rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-purple-500 hover:bg-purple-50 transition-all"
        >
          <Plus className="text-gray-400" />
        </button>
      </div>

      {/* 2. Dynamic Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">

            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-50 flex justify-center">
              <div className="border border-gray-300 rounded-full px-8 py-2">
                <h2 className="text-lg font-medium text-gray-800">
                  {modalType === 'add' && 'Add Category'}
                  {modalType === 'edit' && 'Edit Category'}
                  {modalType === 'details' && 'Category Details'}
                </h2>
              </div>
              <button
                onClick={closeModal}
                disabled={isSubmitting}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full p-1.5 hover:rotate-90 transition-transform disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Service Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Category Name</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  disabled={modalType === 'details' || isSubmitting}
                  className="w-full p-4 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:outline-none bg-gray-50 disabled:bg-white"
                  placeholder="Enter category name..."
                />
              </div>

              {/* Image Upload/Preview Area (Functionally limited for now as API doesn't support image on create) */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Image <span className="text-xs font-normal text-gray-400">(Optional - UI only)</span></label>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  disabled={modalType === 'details' || isSubmitting}
                />
                <div
                  onClick={() => modalType !== 'details' && !isSubmitting && fileInputRef.current.click()}
                  className={`border-2 border-dashed border-purple-200 rounded-[32px] min-h-[180px] flex flex-col items-center justify-center transition-all ${modalType !== 'details' ? 'cursor-pointer hover:bg-purple-50' : ''}`}
                >
                  {tempImg ? (
                    <img src={tempImg} alt="Preview" className="max-h-40 w-full object-contain p-2 rounded-3xl" />
                  ) : (
                    <div className="text-center">
                      <div className="text-purple-400 flex justify-center mb-2"><ImageIcon size={40} /></div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-relaxed">
                        Click To select Photo From your PC <br /> or <br /> Drag a photo and drop here
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                {modalType === 'details' ? (
                  <>
                    <button
                      onClick={() => handleDelete(selectedService.id)}
                      disabled={isSubmitting}
                      className="flex-1 py-4 border-2 border-red-500 text-red-500 rounded-2xl font-bold hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                      ) : (
                        'Remove'
                      )}
                    </button>
                    <button
                      onClick={() => setModalType('edit')}
                      disabled={isSubmitting}
                      className="flex-1 py-4 bg-linear-to-r from-[#6200EE] to-purple-500 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-linear-to-r from-[#6200EE] to-purple-500 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 hover:opacity-90 flex justify-center items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                    {modalType === 'add' ? 'Add Category' : 'Save Changes'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicServiceManager;