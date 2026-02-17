import { useEffect, useState } from "react";
import { Edit3, X } from "lucide-react";
import { Link } from "react-router";
import { ButtonLoader, PageLoader } from "./common/Loader";
import images from "../assets/images";
import adminService from "../services/adminService";
import StatusModal from "./modal/StatusModal";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    profilePicture: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    actionLabel: "",
    onAction: null,
  });

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await adminService.getProfile();
        console.log("Profile Data:", response.data);

        // response.data is directly the user object
        const data = response.data;
        setProfileData(data);

        setUserData({
          fullName: data.profile?.fullName || "",
          email: data.email || "",
          phoneNumber: data.profile?.phoneNumber || data.phone || "",
          role: data.role || "",
          profilePicture: data.profile?.profilePicture || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await adminService.updateProfile({
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        // profilePicture: userData.profilePicture // Add if supported
      });

      console.log("Profile Update Response:", response);

      // response.data is directly the updated user object
      const data = response.data;
      setProfileData(data);

      setUserData({
        fullName: data.profile?.fullName || "",
        email: data.email || "",
        phoneNumber: data.profile?.phoneNumber || data.phone || "",
        role: data.role || "",
        profilePicture: data.profile?.profilePicture || "",
      });

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
    } catch (error) {
      console.error("Update failed:", error);
      let errorMessage = "Failed to update profile. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className=" mx-auto p-2 mr-10 ">
      <div className="flex justify-between items-center mb-8">
        <Link to={"/"}>
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
              src={userData.profilePicture || images.avatar}
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
            <label className="block text-gray-600 mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              disabled={!isEditing}
              value={userData.fullName}
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
              disabled={true}
              value={userData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none cursor-not-allowed"
            />
          </div>
          {/* PHONE NUMBER FIELD */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              disabled={!isEditing}
              value={userData.phoneNumber}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border transition-all ${isEditing
                ? "border-indigo-400 bg-white"
                : "border-gray-200 bg-gray-50"
                } outline-none`}
            />
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
