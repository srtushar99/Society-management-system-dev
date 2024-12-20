const Owner = require('../models/ownerModel'); 
const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")
const crypto= require("crypto");
const senData = require('../config/nodemailer');
const { hash } = require('../utils/hashpassword');
const Tenant = require('../models/tenantModel');

// add owner data

exports.addOwnerData = async (req, res) => {
  try {
      // Generate a secure password
      function generatePassword(length = 9) {
          const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
          const numbers = '0123456789';
          const specialChar = '@';

          if (length < 3) {
              throw new Error('Password length must be at least 3 for this format');
          }

          const randomAlphabet = alphabets[crypto.randomInt(0, alphabets.length)];
          const randomNumber = numbers[crypto.randomInt(0, numbers.length)];

          let remainingChars = '';
          const remainingLength = length - 2;
          const allCharacters = alphabets + numbers;

          for (let i = 0; i < remainingLength; i++) {
              const randomIndex = crypto.randomInt(0, allCharacters.length);
              remainingChars += allCharacters[randomIndex];
          }

          return randomAlphabet + specialChar + randomNumber + remainingChars;
      }

      const {
          Full_name,
          Phone_number,
          Email_address,
          Age,
          Gender,
          Wing,
          Unit,
          Relation,
          Member_Counting,
          Vehicle_Counting,
          role,
          Resident_status,
          UnitStatus,
      } = req.body;

      const Password = generatePassword();
      const hashpassword = await hash(Password);

      const uploadAndDeleteLocal = async (fileArray) => {
          if (fileArray && fileArray[0]) {
              const filePath = fileArray[0].path;
              try {
          
                  const result = await cloudinary.uploader.upload(filePath);
             
                  fs.unlink(filePath, (err) => {
                      if (err) console.error("Error deleting file from server:", err);
                   
                  });
                  return result.secure_url;
              } catch (error) {
                  console.error("Error uploading to Cloudinary:", error);
                  throw error;
              }
          }
          return '';
      };

      const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
      const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
      const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
      const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
      const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);

      if (
          !Full_name ||
          !Phone_number ||
          !Email_address ||
          !Age ||
          !Gender ||
          !Wing ||
          !Unit ||
          !Relation ||
          !profileImage ||
          !Adhar_front ||
          !Adhar_back ||
          !Address_proof ||
          !Rent_Agreement
      ) {
          return res.status(400).json({
              success: false,
              message: "All fields are required",
          });
      }

      const existingWing = await Owner.findOne({ Wing, Unit });
      if (existingWing) {
          return res.status(400).json({
              success: false,
              message: "A resident with this Wing and Unit already exists.",
          });
      }

      let parsedMembers = [];
      let parsedVehicles = [];

      try {
          parsedMembers = Member_Counting ? JSON.parse(Member_Counting) : [];
          parsedVehicles = Vehicle_Counting ? JSON.parse(Vehicle_Counting) : [];
      } catch (error) {
          return res.status(400).json({
              success: false,
              message: "Invalid JSON format for Member_Counting or Vehicle_Counting.",
          });
      }

      if (!Array.isArray(parsedMembers) || !Array.isArray(parsedVehicles)) {
          return res.status(400).json({
              success: false,
              message: "Member_Counting and Vehicle_Counting must be arrays.",
          });
      }

      const newOwner = new Owner({
          profileImage,
          Full_name,
          Phone_number,
          Email_address,
          Age,
          Gender,
          Wing,
          Unit,
          Relation,
          Adhar_front,
          Adhar_back,
          Address_proof,
          Rent_Agreement,
          role: role || "resident",
          Resident_status: Resident_status || "Owner",
          UnitStatus: UnitStatus || "Occupied",
          Password: hashpassword,
          Member_Counting: parsedMembers,
          Vehicle_Counting: parsedVehicles,
      });

      await newOwner.save();

      await senData(
          newOwner.Email_address,
          "Registration Successful - Login Details",
          `Dear ${newOwner.Full_name},\n\nYou have successfully registered as a resident. Your login details are as follows:\n\nUsername: ${newOwner.Email_address}\nPassword: <b>${Password}</b>\n\nPlease keep this information secure.\n\nBest Regards,\nManagement`
      );

      return res.status(201).json({
          success: true,
          message: "Owner data added successfully",
      });
  } catch (error) {
      console.error("Error adding owner data:", error);
      return res.status(500).json({
          success: false,
          message: "Failed to add owner data",
      });
  }
};

// get all owner

exports.GetAllOwner = async (req, res) => {
  try {
      const owners = await Owner.find().sort({ Wing: 1, Unit: 1 });

      if (!owners || owners.length === 0) {
          return res.status(400).json({
              success: false,
              message: "No data found"
          });
      }

      const ownerDetails = owners.map(owner => ({
          profileImage: owner.profileImage,
          Full_name: owner.Full_name,
          Phone_number: owner.Phone_number,
          Email_address: owner.Email_address,
          Age: owner.Age,
          Gender: owner.Gender,
          Wing: owner.Wing,
          Unit: owner.Unit,
          Relation: owner.Relation,
          Resident_status: owner.Resident_status,
          UnitStatus: owner.UnitStatus,
          Adhar_front: owner.Adhar_front,
          Adhar_back: owner.Adhar_back,
          Address_proof: owner.Address_proof,
          Rent_Agreement: owner.Rent_Agreement,
          Member_Counting: owner.Member_Counting,
          Vehicle_Counting: owner.Vehicle_Counting,
      }));

      return res.json({
          success: true,
          owners: ownerDetails
      });
  } catch (error) {
      console.error("Error fetching owner data:", error);
      return res.status(500).json({
          success: false,
          message: "Failed to retrieve owner data"
      });
  }
};


// get by id resident 

exports.GetByIdResident = async (req, res) => {
    try {
      let resident = await Tenant.findById(req.params.id);
  
      if (!resident) {
        resident = await Owner.findById(req.params.id);
      }
  
      if (!resident) {
        return res.status(400).json({
          success: false,
          message: "No data found, ID is incorrect",
        });
      }
  
      const residentData = {
        Resident_Status: resident.Resident_status,
        profileImage: resident.profileImage,
        Full_name: resident.Full_name,
        Phone_number: resident.Phone_number,
        Email_address: resident.Email_address,
        Age: resident.Age,
        Gender: resident.Gender,
        Unit: resident.Unit,
        Wing: resident.Wing,
        Relation: resident.Relation,
        Adhar_front: resident.Adhar_front,
        Address_proof: resident.Address_proof,
        Owner_Full_name: resident.Owner_Full_name,
        Owner_Phone: resident.Owner_Phone,
        Owner_Address: resident.Owner_Address,
        Member_Counting_Total: resident.Member_Counting
          ? resident.Member_Counting.length
          : 0,
        Member_Counting: resident.Member_Counting || [],
        Vehicle_Counting_Total: resident.Vehicle_Counting
          ? resident.Vehicle_Counting.length
          : 0,
        Vehicle_Counting: resident.Vehicle_Counting || [],
  
        ...(resident.Owner_Full_name
          ? {
              Owner_Full_name: resident.Owner_Full_name,
              Owner_Phone: resident.Owner_Phone,
              Owner_Address: resident.Owner_Address,
            }
          : {}),
      };

      return res.status(200).json({
        success: true,
        Resident: residentData,
      });
    } catch (error) {
      console.error("Error fetching resident data:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching resident data",
      });
    }
  };

// delete by id residenet

exports.DeleteByIdResident = async (req, res) => {
    try {
        
        let resident = await Tenant.findByIdAndDelete(req.params.id);

        
        if (!resident) {
            resident = await Owner.findByIdAndDelete(req.params.id);
        }

       
        if (!resident) {
            return res.status(400).json({
                success: false,
                message: "No data found, ID is incorrect or already deleted"
            });
        }

        
        return res.status(200).json({
            success: true,
            message: "Resident data deleted successfully",
           
        });
    } catch (error) {
        console.error("Error deleting resident data:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting resident data"
        });
    }
};

// get all residenet=

exports.GetAllResidents = async (req, res) => {
  try {
      // Fetch tenants and owners in parallel
      const [tenants, owners] = await Promise.all([
          Tenant.find(),
          Owner.find(),
      ]);

      // Check if no residents exist
      if (!tenants.length && !owners.length) {
          return res.status(400).json({
              success: false,
              message: "No residents found.",
          });
      }

      // Helper function to format resident data
      const formatResidentData = (resident) => ({
          ...resident._doc,
          Member_Counting_Total: resident.Member_Counting?.length || 0,
          Vehicle_Counting_Total: resident.Vehicle_Counting?.length || 0,
      });

      // Combine all residents and format them
      const allResidents = [
          ...tenants.map(formatResidentData),
          ...owners.map(formatResidentData),
      ];

      // Sort residents by Wing and Unit
      allResidents.sort((a, b) => {
          if (a.Wing === b.Wing) {
              return a.Unit - b.Unit;
          }
          return a.Wing.localeCompare(b.Wing);
      });

      // Calculate the total number of residents
      const totalResidentsCount = tenants.length + owners.length;

      // Return all residents and total user count
      return res.json({
          success: true,
          Residents: allResidents,
          TotalResidents: totalResidentsCount, // Include total count here
      });
  } catch (error) {
      console.error("Error fetching residents:", error.message);
      return res.status(500).json({
          success: false,
          message: "An error occurred while retrieving residents data.",
      });
  }
};

// update owner data

exports.updateOwnerData = async (req, res) => {
    try {
      const {
        Full_name,
        Phone_number,
        Email_address,
        Age,
        Gender,
        Wing,
        Unit,
        Relation,
        Member_Counting,
        Vehicle_Counting,
        role,
        Resident_status,
        UnitStatus,
      } = req.body;
  
      const { id } = req.params; 
    
      const uploadAndDeleteLocal = async (fileArray) => {
        if (fileArray && fileArray[0]) {
          const filePath = fileArray[0].path;
          try {
            const result = await cloudinary.uploader.upload(filePath);
            fs.unlink(filePath, (err) => {
              if (err) console.error("Error deleting file from server:", err);
            
            });
            return result.secure_url;
          } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw error;
          }
        }
        return ''; 
      };

      const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
      const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
      const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
      const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
      const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);
  
    
      if (!Full_name || !Phone_number || !Email_address || !Age || !Gender || !Wing || !Unit || !Relation || !profileImage || !Adhar_front || !Adhar_back || !Address_proof || !Rent_Agreement) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      
      const existingOwner = await Owner.findOne({ Wing, Unit });
      if (existingOwner && existingOwner._id.toString() !== id) {
        return res.status(400).json({
          success: false,
          message: "Wing and Unit already exists for another owner.",
        });
      }

      const owner = await Owner.findById(id);
      if (!owner) {
        return res.status(404).json({
          success: false,
          message: "Owner not found",
        });
      }
  
      if (Full_name) owner.Full_name = Full_name;
      if (Phone_number) owner.Phone_number = Phone_number;
      if (Email_address) owner.Email_address = Email_address;
      if (Age) owner.Age = Age;
      if (Gender) owner.Gender = Gender;
      if (Wing) owner.Wing = Wing;
      if (Unit) owner.Unit = Unit;
      if (Relation) owner.Relation = Relation;
      if (Resident_status) owner.Resident_status = Resident_status;
      if (UnitStatus) owner.UnitStatus = UnitStatus;
      if (profileImage) owner.profileImage = profileImage;
      if (Adhar_front) owner.Adhar_front = Adhar_front;
      if (Adhar_back) owner.Adhar_back = Adhar_back;
      if (Address_proof) owner.Address_proof = Address_proof;
      if (Rent_Agreement) owner.Rent_Agreement = Rent_Agreement;
     
      if (Member_Counting) {
        const members = JSON.parse(Member_Counting);
        owner.Member_Counting = members; 
      }

      if (Vehicle_Counting) {
        const vehicles = JSON.parse(Vehicle_Counting);
        owner.Vehicle_Counting = vehicles;
      }
  
      await owner.save();
  
      return res.status(200).json({
        success: true,
        message: "Owner data updated successfully",
      });
  
    } catch (error) {
      console.error("Error updating owner data:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update owner data",
      });
    }
  };
  
  // get total resident count

  exports.GetTotalResidentsCount = async (req, res) => {
    try {
   
        const [tenantsCount, ownersCount] = await Promise.all([
            Tenant.countDocuments(),
            Owner.countDocuments(),
        ]);

        const totalResidentsCount = tenantsCount + ownersCount;

        if (totalResidentsCount === 0) {
            return res.status(400).json({
                success: false,
                message: "No residents found.",
            });
        }

        return res.json({
            success: true,
            TotalResidents: totalResidentsCount,
        });
    } catch (error) {
        console.error("Error fetching total residents count:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the total residents count.",
        });
    }
};

