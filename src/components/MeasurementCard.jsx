import React, { useState, useEffect } from "react";
import { Edit2, Trash2 } from "lucide-react";

export default function MeasurementCard({ profile, onEdit, onDelete }) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Delay to trigger entrance animation
    const timer = setTimeout(() => setShowMessage(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Gender-based symbol and color
  const isMale = profile.gender?.toLowerCase() === "male";
  const genderSymbol = isMale ? "♂" : "♀";
  const genderColor = isMale ? "text-blue-500" : "text-pink-500";

  return (
    <div className="flex flex-col bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={profile.image || "https://via.placeholder.com/48"}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
          />
          <div>
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              {profile.name}
              <span
                className={`${genderColor} text-lg transition-transform duration-300 transform group-hover:scale-110`}
              >
                {genderSymbol}
              </span>
            </h3>
            
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-blue-50 rounded-full text-blue-600 transition"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 rounded-full text-red-600 transition"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Animated Bottom Section */}
      <div
        className={`mt-4 flex items-center justify-center gap-2 text-gray-600 text-sm font-medium transition-all duration-500 ${
          showMessage
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3"
        }`}
      >
        <span>Add a measurement profile</span>
      </div>
    </div>
  );
}
