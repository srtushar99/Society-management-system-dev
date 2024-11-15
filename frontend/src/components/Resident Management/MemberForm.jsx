import React, { useState } from 'react';

const MemberForm = () => {
    const [formData, setFormData] = useState({
        memberCount: 0,
        memberDetails: [],
    });

    const handleMemberCountChange = (e) => {
        const newMemberCount = parseInt(e.target.value, 10);
        const newMemberDetails = [...formData.memberDetails].slice(0, newMemberCount);

        while (newMemberDetails.length < newMemberCount) {
            newMemberDetails.push({
                fullName: "",
                phoneNumber: "",
                email: "",
                age: "",
                gender: "",
                relation: "",
            });
        }

        setFormData({
            ...formData,
            memberCount: newMemberCount,
            memberDetails: newMemberDetails,
        });
    };

    const handleMemberDetailChange = (index, fieldName, value) => {
        const newMemberDetails = [...formData.memberDetails];

        switch (fieldName) {
            case 'fullName':
                if (/^[A-Za-z\s]*$/.test(value) || value === "") {
                    newMemberDetails[index][fieldName] = value;
                }
                break;
            case 'phoneNumber':
                const cleanPhoneValue = value.replace(/[^0-9]/g, '');
                if (cleanPhoneValue.length === 0 || 
                    (cleanPhoneValue.length === 1 && /^[6-9]$/.test(cleanPhoneValue)) ||
                    (cleanPhoneValue.length > 1 && /^[6-9][0-9]{0,9}$/.test(cleanPhoneValue))) {
                    newMemberDetails[index][fieldName] = cleanPhoneValue;
                }
                break;
            case 'email':
                newMemberDetails[index][fieldName ] = value; // Update email without blocking
                break;
            case 'age':
                const cleanAgeValue = value.replace(/[^0-9]/g, '');
                if (cleanAgeValue === '' || /^[0-9]*$/.test(cleanAgeValue)) {
                    newMemberDetails[index][fieldName] = cleanAgeValue;
                }
                break;
            case 'relation':
                if (/^[A-Za-z\s]*$/.test(value) || value === "") {
                    newMemberDetails[index][fieldName] = value;
                }
                break;
            case 'gender':
                newMemberDetails[index][fieldName] = value;
                break;
            default:
                break;
        }

        setFormData({
            ...formData,
            memberDetails: newMemberDetails,
        });
    };

    return (
        <form className="space-y-4 bg-white p-3 pt-1">
            <div>
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                        Member Counting: (Other Members)
                    </label>
                    <div>
                        <span>Select Member</span>
                        <select
                            name="memberCount"
                            value={formData.memberCount}
                            onChange={handleMemberCountChange}
                            className="mt-1 w-10 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        >
                            {[...Array(6).keys()].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {Array.from({ length: formData.memberCount }).map((_, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.memberDetails[index]?.fullName || ""}
                                onChange={(e) => handleMemberDetailChange(index, 'fullName', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                                placeholder="Enter Full Name"
                            />
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.memberDetails[index]?.phoneNumber || ""}
                                onChange={(e) => handleMemberDetailChange(index, 'phoneNumber', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                                placeholder="Enter Phone Number"
                            />
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.memberDetails[index]?.email || ""}
                                onChange={(e) => handleMemberDetailChange(index, 'email', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                                placeholder="Enter Email Address"
                            />
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700">
                                Age<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="age"
                                value={formData.memberDetails[index]?.age || ""}
                                onChange={(e) => handleMemberDetailChange(index, 'age', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                                placeholder="Enter Age"
                            />
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700">
                                Gender<span className="text-red-500">*</span>
                            </label>
                            <select name="gender"
                                value={formData.memberDetails[index]?.gender || ""}
                                onChange={(e) => handleMemberDetailChange(index, 'gender', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700">
                                Relation<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="relation"
                                value={formData.memberDetails[index]?.relation || ""}
                                onChange={(e) => handleMemberDetailChange(index, 'relation', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                                placeholder="Enter Relation"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </form>
    );
};

export default MemberForm;