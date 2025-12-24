import React, { useState, useRef } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';

const DynamicServiceManager = () => {
  // Main Services State
  const [services, setServices] = useState([
    { id: 1, name: 'Hair Salons', img: 'https://via.placeholder.com/80?text=Hair' },
    { id: 2, name: 'Nail Salons', img: 'https://via.placeholder.com/80?text=Nail' },
  ]);

  // UI States
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'details'
  const [selectedService, setSelectedService] = useState(null);
  
  // Form States
  const [tempName, setTempName] = useState('');
  const [tempImg, setTempImg] = useState(null);
  const fileInputRef = useRef(null);

  // Modal Open Function
  const openModal = (type, service = null) => {
    setModalType(type);
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
  const handleSave = () => {
    if (!tempName || !tempImg) return alert("Please fill name and image!");

    if (modalType === 'add') {
      const newService = {
        // id: Date.now(),
        name: tempName,
        img: tempImg
      };
      setServices([...services, newService]);
    } else if (modalType === 'edit') {
      setServices(services.map(s => 
        s.id === selectedService.id ? { ...s, name: tempName, img: tempImg } : s
      ));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setServices(services.filter(s => s.id !== id));
    closeModal();
  };

  const closeModal = () => {
    setModalType(null);
    setTempName('');
    setTempImg(null);
  };

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
            <div className="w-20 h-20 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center overflow-hidden group-hover:border-purple-400 transition-all">
               <img src={service.img} alt={service.name} className="w-full h-full object-cover" />
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
                  {modalType === 'add' && 'Service Add Details'}
                  {modalType === 'edit' && 'Edit Service'}
                  {modalType === 'details' && 'Service Details'}
                </h2>
              </div>
              <button 
                onClick={closeModal}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full p-1.5 hover:rotate-90 transition-transform"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Service Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Service Name</label>
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  disabled={modalType === 'details'}
                  className="w-full p-4 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:outline-none bg-gray-50 disabled:bg-white"
                  placeholder="Enter service name..."
                />
              </div>

              {/* Image Upload/Preview Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Image</label>
                <input 
                  type="file" 
                  hidden 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*"
                />
                <div 
                  onClick={() => modalType !== 'details' && fileInputRef.current.click()}
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
                      className="flex-1 py-4 border-2 border-red-500 text-red-500 rounded-2xl font-bold hover:bg-red-50 transition-colors"
                    >
                      Remove
                    </button>
                    <button 
                      onClick={() => setModalType('edit')}
                      className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 hover:opacity-90 transition-opacity"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleSave}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 hover:opacity-90"
                  >
                    {modalType === 'add' ? 'Add Service' : 'Save'}
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