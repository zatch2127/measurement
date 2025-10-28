import React, { useState } from "react";
import MeasurementForm from "../components/MeasurementForm";
import ConfirmationModal from "../components/ConfirmationModal";
import MeasurementCard from "../components/MeasurementCard";

export default function MeasurementSettings({ hostProfile, setHostProfile }) {
  const [showForm, setShowForm] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [pendingData, setPendingData] = useState(null);
  const [profileToDeleteName, setProfileToDeleteName] = useState(null);

  const handleAddNew = () => {
    setEditingIndex(null);
    setShowForm(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setModalType("delete");
    setEditingIndex(index);
    setProfileToDeleteName(profiles[index].name);
    setShowModal(true);
  };

  const HostForm = ({ onSubmit }) => {
    const [name, setName] = useState("Me");
    const [image, setImage] = useState("");
    const [gender, setGender] = useState("Male");

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, image, gender });
    };

    return (
      <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create Host Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
            />
            {image && (
              <img
                src={image}
                alt="Profile Preview"
                className="mt-3 w-24 h-24 rounded-full object-cover mx-auto ring-2 ring-red-300"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="mt-2 flex justify-center sm:justify-start gap-6">
              {["Male", "Female"].map((g) => (
                <label
                  key={g}
                  className="inline-flex items-center text-gray-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={g}
                    checked={gender === g}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-radio text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2">{g}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300"
          >
            Create Profile
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 transition-all duration-500 px-4 sm:px-6 md:px-8 pb-10">
      {/* Left Section */}
      <div className="w-full lg:w-1/2">
        {!hostProfile ? (
          <HostForm onSubmit={setHostProfile} />
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <img
              src={hostProfile.image || "https://via.placeholder.com/60"}
              alt={hostProfile.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-red-300"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Welcome, {hostProfile.name}!
              </h1>
              <p className="text-gray-600">
                Gender:{" "}
                {hostProfile.gender === "Male" ? (
                  <span className="text-blue-500 text-lg">♂</span>
                ) : (
                  <span className="text-pink-500 text-lg">♀</span>
                )}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Measurement Settings
          </h1>
          <button
            onClick={handleAddNew}
            className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 ${
              !hostProfile ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!hostProfile}
          >
            + Add New
          </button>
        </div>

        {/* Profile List */}
        <div className="space-y-3">
          {profiles.length === 0 ? (
            <p className="text-gray-500 text-center sm:text-left">
              No measurements yet. Click “Add New” to create one.
            </p>
          ) : (
            profiles.map((profile, index) => (
              <div
                key={index}
                className="animate-fadeInUp transition-all duration-500"
              >
                <MeasurementCard
                  profile={profile}
                  onEdit={() => handleEdit(index)}
                  onDelete={() => handleDelete(index)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Section (Form) */}
      {showForm && (
        <div
          className="w-full lg:w-1/2 bg-white shadow-xl rounded-xl p-6 transform transition-all duration-500 animate-slideInUp"
        >
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            {editingIndex !== null ? "Edit Measurement" : "Add Measurement"}
          </h2>
          <MeasurementForm
            onSave={(data) => {
              setPendingData(data);
              setModalType("save");
              setShowModal(true);
            }}
            onCancel={() => setShowForm(false)}
            defaultData={editingIndex !== null ? profiles[editingIndex] : null}
          />
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          message={
            modalType === "delete"
              ? `Are you sure you want to delete "${profileToDeleteName}" measurement profile? All your data will be permanently removed. Kindly confirm.`
              : "Kindly confirm if you want to save this profile."
          }
          onCancel={() => {
            setShowModal(false);
            setPendingData(null);
            setEditingIndex(null);
          }}
          onConfirm={() => {
            if (modalType === "save") {
              if (editingIndex !== null) {
                const updated = [...profiles];
                updated[editingIndex] = pendingData;
                setProfiles(updated);
              } else {
                setProfiles((prev) => [...prev, pendingData]);
              }
            } else if (modalType === "delete") {
              setProfiles((prev) => prev.filter((_, i) => i !== editingIndex));
            }

            setShowModal(false);
            setShowForm(false);
            setPendingData(null);
            setEditingIndex(null);
          }}
        />
      )}
    </div>
  );
}
