import React, { useState } from "react";

export default function MeasurementForm({ onSave, onCancel, defaultData }) {
  const [formData, setFormData] = useState(
    defaultData || {
      name: "",
      gender: "Male",
      height: { value: "", unit: "cm" },
      clothingSize: "",
      bodySizes: {
        chest: { value: "", unit: "cm" },
        arm: { value: "", unit: "cm" },
        waist: { value: "", unit: "cm" },
        hips: { value: "", unit: "cm" },
        thigh: { value: "", unit: "cm" },
      },
      customField: "",
      image: "",
    }
  );

  const [heightUnit, setHeightUnit] = useState(formData.height.unit);
  const [showBodySizeFields, setShowBodySizeFields] = useState(false);
  const [bodySizeUnit, setBodySizeUnit] = useState("cm");

  const toggleHeightUnit = () => {
    setHeightUnit((prev) => (prev === "cm" ? "ft" : "cm"));
    setFormData((prev) => ({
      ...prev,
      height: { value: "", unit: heightUnit === "cm" ? "ft" : "cm" },
    }));
  };

  const handleHeightChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      height: { ...prev.height, [name]: value },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleBodySizeUnit = () => {
    setBodySizeUnit((prev) => (prev === "cm" ? "in" : "cm"));
    setFormData((prev) => ({
      ...prev,
      bodySizes: Object.fromEntries(
        Object.entries(prev.bodySizes).map(([key]) => [
          key,
          { value: "", unit: bodySizeUnit === "cm" ? "in" : "cm" },
        ])
      ),
    }));
  };

  const handleBodySizeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      bodySizes: {
        ...prev.bodySizes,
        [name]: { ...prev.bodySizes[name], value },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8"
    >
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Profile Image</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Profile Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Measurement Profile Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. My Profile"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <div className="flex flex-wrap gap-4">
          {["Male", "Female"].map((g) => (
            <label
              key={g}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="gender"
                value={g}
                checked={formData.gender === g}
                onChange={handleChange}
                className="text-red-500 focus:ring-red-400"
                required
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-medium mb-1">Height</label>
        <div className="flex flex-wrap items-center gap-2">
          {heightUnit === "cm" ? (
            <input
              type="number"
              name="value"
              value={formData.height.value}
              onChange={handleHeightChange}
              placeholder="e.g. 178"
              required
              className="flex-1 min-w-[120px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          ) : (
            <>
              <input
                type="number"
                name="feet"
                value={formData.height.feet || ""}
                onChange={handleHeightChange}
                placeholder="ft"
                required
                className="w-1/2 sm:w-1/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                type="number"
                name="inches"
                value={formData.height.inches || ""}
                onChange={handleHeightChange}
                placeholder="in"
                required
                className="w-1/2 sm:w-1/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </>
          )}
          <button
            type="button"
            onClick={toggleHeightUnit}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {heightUnit}
          </button>
        </div>
      </div>

      {/* Clothing Size */}
      <div>
        <label className="block text-sm font-medium mb-1">Clothing Size</label>
        <select
          name="clothingSize"
          value={formData.clothingSize}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="">Select Size</option>
          <option value="XS">XS</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>

      {/* Body Size */}
      <div>
        <label className="block text-sm font-medium mb-1">Body Size</label>
        <button
          type="button"
          onClick={() => setShowBodySizeFields((prev) => !prev)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          {showBodySizeFields ? "Hide Body Measurements" : "Add Body Measurements"}
        </button>

        {showBodySizeFields && (
          <div className="mt-4 space-y-3">
            {Object.keys(formData.bodySizes).map((key) => (
              <div
                key={key}
                className="flex flex-wrap items-center gap-2 sm:gap-4"
              >
                <label className="w-full sm:w-1/3 text-sm font-medium capitalize">
                  {key}
                </label>
                <input
                  type="number"
                  name={key}
                  value={formData.bodySizes[key].value}
                  onChange={handleBodySizeChange}
                  placeholder="e.g. 90"
                  required
                  className="flex-1 min-w-[100px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <button
                  type="button"
                  onClick={toggleBodySizeUnit}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {bodySizeUnit}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Field (optional) */}
      <div>
        <label className="block text-sm font-medium mb-1">Custom Field</label>
        <textarea
          name="customField"
          value={formData.customField}
          onChange={handleChange}
          placeholder="Write something..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
        >
          Save Measurement
        </button>
      </div>
    </form>
  );
}
