import React, { useState } from 'react';
import MeasurementSettings from "./pages/MeasurementSettings";

function App() {
  const [hostProfile, setHostProfile] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <MeasurementSettings hostProfile={hostProfile} setHostProfile={setHostProfile} />
    </div>
  );
}

export default App;