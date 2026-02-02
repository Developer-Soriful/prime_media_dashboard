import { useState } from "react";
import { Edit3, X } from "lucide-react";
import { Link } from "react-router";
import { ButtonLoader } from "./common/Loader";
import { useAuth } from "../context/AuthProvider";
import images from "../assets/images";
import api from "../services/api";
import StatusModal from "./modal/StatusModal";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  //  USER DATA
  const { user, updateUser } = useAuth();
  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    actionLabel: "",
    onAction: null,
  });

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await api.put("/users/me/profile", userData);

      if (response.success) {
        updateUser(response.data); // Update local context
        setModal({
          isOpen: true,
          type: "success",
          title: "Profile Updated",
          message: "Your profile information has been updated successfully.",
          actionLabel: "OK",
          onAction: () => {
            closeModal();
            setIsEditing(false);
          },
        });
      }
    } catch (error) {
      console.error("Update failed:", error);
      let errorMessage = "Failed to update profile. Please try again.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      setModal({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message: errorMessage,
        actionLabel: "Try Again",
        onAction: closeModal,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    role: user?.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className=" mx-auto p-2 mr-10 ">
      <div className="flex justify-between items-center mb-8">
        <Link to={"/dashboard"}>
          <h2 className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
            <span className="cursor-pointer">←</span> Personal Information
          </h2>
        </Link>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <ButtonLoader
                isLoading={isSaving}
                text="Save Profile"
                loadingText="Saving..."
                onClick={handleSave}
                type="button"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              />
              <button
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex flex-col items-center p-6 border border-gray-100 rounded-2xl bg-gray-50/50">
          <div className="relative">
            <img
              src={user?.image || images.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
          <h3 className="mt-4 text-xl font-bold text-indigo-700">
            {userData.role}
          </h3>
          <p className="text-gray-500">Profile</p>
        </div>
        {/* NAME FIELD */}
        <div className="w-full md:w-2/3 space-y-6">
          <div>
            <label className="block text-gray-600 mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              disabled={!isEditing}
              value={userData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border transition-all ${isEditing
                ? "border-indigo-400 bg-white"
                : "border-gray-200 bg-gray-50"
                } outline-none`}
            />
          </div>
          {/*  EMAIL FIELD */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              disabled={!isEditing}
              value={userData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border transition-all ${isEditing
                ? "border-indigo-400 bg-white"
                : "border-gray-200 bg-gray-50"
                } outline-none`}
            />
          </div>
          {/* PHONE NUMBER FIELD */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 bg-indigo-100 px-3 py-2 rounded-lg border border-indigo-200">
                <span className="text-sm font-bold text-indigo-700">🇺🇸 +1</span>
              </div>
              <input
                type="text"
                name="phone"
                disabled={!isEditing}
                value={userData.phone}
                onChange={handleChange}
                className={`flex-1 p-3 rounded-lg border transition-all ${isEditing
                  ? "border-indigo-400 bg-white"
                  : "border-gray-200 bg-gray-50"
                  } outline-none`}
              />
            </div>
          </div>
        </div>
      </div>
      <StatusModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        actionLabel={modal.actionLabel}
        onAction={modal.onAction}
      />
    </div>
  );
};

export default ProfileSection;
