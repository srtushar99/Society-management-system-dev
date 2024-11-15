import React, { useState } from "react";

const VehicleForm = () => {
  // Form state with initial empty vehicleDetails
  const [formData, setFormData] = useState({
    vehicleCount: 0,  // Number of vehicles selected
    vehicleDetails: [],  // Array to store details for each vehicle
  });

  // Handle vehicle count change
  const handleVehicleCountChange = (e) => {
    const count = parseInt(e.target.value, 10);  // Get the vehicle count from the dropdown
    setFormData((prevState) => {
      // If the new count is smaller than the previous count, slice the array
      const updatedVehicleDetails = [...prevState.vehicleDetails].slice(0, count);

      // If the new count is larger, add empty vehicle fields
      while (updatedVehicleDetails.length < count) {
        updatedVehicleDetails.push({
          vehicleType: "",
          vehicleName: "",
          vehicleNumber: "",
        });
      }

      return {
        ...prevState,
        vehicleCount: count,
        vehicleDetails: updatedVehicleDetails,
      };
    });
  };

  // Handle vehicle detail change (vehicle type, name, number)
  const handleVehicleDetailChange = (index, field, value) => {
    const updatedVehicleDetails = [...formData.vehicleDetails];
    updatedVehicleDetails[index][field] = value;
    setFormData({ ...formData, vehicleDetails: updatedVehicleDetails });
  };

  // Validate Vehicle Name (only alphabet characters and spaces)
  const validateVehicleName = (name) => {
    const regex = /^[A-Za-z\s]*$/; // Only allows letters and spaces
    return regex.test(name);
  };

  // Validate Vehicle Number (only uppercase alphanumeric characters)
  const validateVehicleNumber = (number) => {
    const regex = /^[A-Z0-9]*$/; // Only allows uppercase letters and numbers
    return regex.test(number);
  };

  // Handle form submission and validation
  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    formData.vehicleDetails.forEach((vehicle) => {
      // Validate Vehicle Name
      if (!validateVehicleName(vehicle.vehicleName)) {
        valid = false;
      }

      // Validate Vehicle Number
      if (!validateVehicleNumber(vehicle.vehicleNumber)) {
        valid = false;
      }
    });

    if (!valid) {
      alert("Please fix the errors in the form before submitting.");
      return;
    }

    alert("Form submitted successfully!");
  };

  return (
    <div className="gap-4">
      <form onSubmit={handleSubmit}>
        {/* Vehicle Count Selection */}
        <div className="flex justify-between items-center ml-5">
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Counting:
          </label>
          <div className="d-flex ml-4">
            <span className="mr-2">Select Vehicle</span>
            <select
              name="vehicleCount"
              value={formData.vehicleCount}
              onChange={handleVehicleCountChange}
              className="mr-4 w-10 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>

        {/* Render vehicle fields based on vehicleCount */}
        {formData.vehicleCount >= 1 && (
          <div className="space-y-2 border mt-2 w-[700px] bg-white p-3 pt-1">
            <div className="flex gap-6 items-center">
              {/* Vehicle Type Dropdown for Vehicle 1 */}
              <div className="flex flex-col w-[250px]">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Type<span className="text-red-500">*</span>
                </label>
                <select
                  name="vehicleType-0"
                  value={formData.vehicleDetails[0]?.vehicleType || ""}
                  onChange={(e) =>
                    handleVehicleDetailChange(0, "vehicleType", e.target.value)
                  }
                  className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="2-wheeler">2-Wheeler</option>
                  <option value="4-wheeler">4-Wheeler</option>
                </select>
              </div>

              {/* Vehicle Name Input for Vehicle 1 */}
              <div className="flex flex-col w-[250px]">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleName-0"
                  value={formData.vehicleDetails[0]?.vehicleName || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    handleVehicleDetailChange(0, "vehicleName", value);
                  }}
                  className="mt-1 w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholder="Enter Vehicle Name"
                />
              </div>

              {/* Vehicle Number Input for Vehicle 1 */}
              <div className="flex flex-col w-[250px]">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleNumber-0"
                  value={formData.vehicleDetails[0]?.vehicleNumber || ""}
                  onChange={(e) => {
                    const value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "");
                    handleVehicleDetailChange(0, "vehicleNumber", value);
                  }}
                  className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholder="Enter Vehicle Number"
                />
              </div>
            </div>
          </div>
        )}

        {formData.vehicleCount >= 2 && (
          <div className="space-y-2 border mt-2 w-[700px] bg-white p-3 pt-1">
            <div className="flex gap-6 items-center">
              {/* Vehicle Type Dropdown for Vehicle 2 */}
              <div className="flex flex-col w-[250px]">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Type<span className="text-red-500">*</span>
                </label>
                <select
                  name="vehicleType-1"
                  value={formData.vehicleDetails[1]?.vehicleType || ""}
                  onChange={(e) =>
                    handleVehicleDetailChange(1, "vehicleType", e.target.value)
                  }
                  className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="2-wheeler">2-Wheeler</option>
                  <option value="4-wheeler">4-Wheeler</option>
                </select>
              </div>

              {/* Vehicle Name Input for Vehicle 2 */}
              <div className="flex flex-col w-[250px]">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleName-1"
                  value={formData.vehicleDetails[1]?.vehicleName || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    handleVehicleDetailChange(1, "vehicleName", value);
                  }}
                  className="mt-1 w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholder="Enter Vehicle Name"
                />
              </div>

              {/* Vehicle Number Input for Vehicle 2 */}
              <div className="flex flex-col w-[250px]">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleNumber-1"
                  value={formData.vehicleDetails[1]?.vehicleNumber || ""}
                  onChange={(e) => {
                    const value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "");
                    handleVehicleDetailChange(1, "vehicleNumber", value);
                  }}
                  className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholder="Enter Vehicle Number"
                />
              </div>
            </div>
          </div>
        )}

        {formData.vehicleCount >= 3 && (
          <div className="space-y-2 border mt-2 w-[700px] bg-white p-3 pt-1">
            <div className="flex gap-6 items-center">
              {/* Vehicle Type Dropdown for Vehicle 3 */}
              <div className="flex flex-col w-[250px]">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Type<span className="text-red-500">*</span>
                </label>
                <select
                  name="vehicleType-2"
                  value={formData.vehicleDetails[2]?.vehicleType || ""}
                  onChange={(e) =>
                    handleVehicleDetailChange(2, "vehicleType", e.target.value)
                  }
                  className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="2-wheeler">2-Wheeler</option>
                  <option value="4-wheeler">4-Wheeler</option>
                </select>
              </div>

              {/* Vehicle Name Input for Vehicle 3 */}
              <div className="flex flex-col w-[250px]">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleName-2"
                  value={formData.vehicleDetails[2]?.vehicleName || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    handleVehicleDetailChange(2, "vehicleName", value);
                  }}
                  className="mt-1 w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholder="Enter Vehicle Name"
                />
              </div>

              {/* Vehicle Number Input for Vehicle 3 */}
              <div className="flex flex-col w-[250px]">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleNumber-2"
                  value={formData.vehicleDetails[2]?.vehicleNumber || ""}
                  onChange={(e) => {
                    const value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "");
                    handleVehicleDetailChange(2, "vehicleNumber", value);
                  }}
                  className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholder="Enter Vehicle Number"
                />
              </div>
            </div>
          </div>
        )}

      
      </form>
    </div>
  );
};

export default VehicleForm;
