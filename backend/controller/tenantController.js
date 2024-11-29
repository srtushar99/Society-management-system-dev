const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")
const crypto= require("crypto");
const senData = require('../config/nodemailer');
const { hash } = require('../utils/hashpassword');
const Tenante = require('../models/tenantModel');

// add tenante

exports.addTenante = async (req, res) => {
  try {
      // Function to generate a random password
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
          const remainingLength = length - 2; // Subtract 2 for alphabet and number
          const allCharacters = alphabets + numbers;

          for (let i = 0; i < remainingLength; i++) {
              const randomIndex = crypto.randomInt(0, allCharacters.length);
              remainingChars += allCharacters[randomIndex];
          }

          return randomAlphabet + specialChar + randomNumber + remainingChars;
      }

      const {
          Owner_Full_name,
          Owner_Phone,
          Owner_Address,
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
          UnitStatus
      } = req.body;

      const Password = generatePassword();
      console.log("Generated Password:", Password);

      const hashpassword = await hash(Password);

      const uploadAndDeleteLocal = async (fileArray) => {
          if (fileArray && fileArray[0]) {
              const filePath = fileArray[0].path;
              try {
                  // Upload to Cloudinary
                  const result = await cloudinary.uploader.upload(filePath);
                  // Delete from local server
                  fs.unlink(filePath, (err) => {
                      if (err) console.error("Error deleting file from server:", err);
                      else console.log("File deleted from server:", filePath);
                  });
                  return result.secure_url;
              } catch (error) {
                  console.error("Error uploading to Cloudinary:", error);
                  throw error;
              }
          }
          return '';
      };

      // Upload images to Cloudinary
      const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
      const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
      const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
      const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
      const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);

      // Validate required fields
      if (
          !Owner_Full_name || !Owner_Phone || !Owner_Address || !Full_name ||
          !Phone_number || !Email_address || !Age || !Gender || !Wing || !Unit ||
          !Relation || !profileImage || !Adhar_front || !Adhar_back || !Address_proof || !Rent_Agreement
      ) {
          return res.status(400).json({
              success: false,
              message: "All fields are required",
          });
      }

      // Check if Wing and Unit already exist
      const existingWing = await Tenante.findOne({ Wing, Unit });
      if (existingWing) {
          return res.status(400).json({
              success: false,
              message: "A tenant with the given Wing and Unit already exists.",
          });
      }

      // Parse Member_Counting and Vehicle_Counting
      const parsedMemberCounting = Member_Counting ? JSON.parse(Member_Counting) : [];
      const parsedVehicleCounting = Vehicle_Counting ? JSON.parse(Vehicle_Counting) : [];

      // Create a new tenant document
      const newTenant = new Tenante({
          Owner_Full_name,
          Owner_Phone,
          Owner_Address,
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
          Resident_status: Resident_status || "Tenant",
          UnitStatus: UnitStatus || "Occupied",
          Password: hashpassword,
          Member_Counting: parsedMemberCounting,
          Vehicle_Counting: parsedVehicleCounting
      });

      await newTenant.save();

      // Send email with login details
      await senData(
          newTenant.Email_address,
          "Tenant Registration Successful - Login Details",
          `Dear ${newTenant.Full_name},\n\nYou have successfully registered as a tenant. Your login details are as follows:\n\nUsername: ${newTenant.Email_address}\nPassword: <b>${Password}</b>\n\nPlease keep this information secure.\n\nBest Regards,\nManagement`
      );

      // Send success response
      return res.status(201).json({
          success: true,
          message: "Tenant data added successfully",
      });
  } catch (error) {
      console.error("Error adding tenant data:", error);
      return res.status(500).json({
          success: false,
          message: "Failed to add tenant data",
      });
  }
};

// get all tenante
exports.GetAllTenante= async(req,res)=>{
    try {
        // Fetch all owners sorted by Wing and Unit
        const owners = await Tenante.find().sort({ Wing: 1, Unit: 1 });

        if (!owners || owners.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            });
        }

        
        const ownerCounts = owners.map(owner => ({
            profileImage:owner.profileImage,
            Full_name: owner.Full_name,
            Unit: owner.Unit,
            Wing: owner.Wing,
            Resident_status: owner.Resident_status,
            Phone_number: owner.Phone_number,
            Member_Counting_Total: owner.Member_Counting ? owner.Member_Counting.length : 0,
            Vehicle_Counting_Total: owner.Vehicle_Counting ? owner.Vehicle_Counting.length : 0
        }));

        // Respond with only the counts
        return res.json({
            success: true,
            Owner: ownerCounts
        });
    } catch (error) {
        console.error("Error fetching owner Tenante:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve Tenante data"
        });
    }
}

// update tenante

exports.updateTenantData = async (req, res) => {
    try {
      const {
        Owner_Full_name,
        Owner_Phone,
        Owner_Address,
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
        Resident_status,
        UnitStatus
      } = req.body;
  
      const { id } = req.params; 
  
      
      const uploadAndDeleteLocal = async (fileArray) => {
        if (fileArray && fileArray[0]) {
          const filePath = fileArray[0].path;
          try {
            const result = await cloudinary.uploader.upload(filePath);
            fs.unlink(filePath, (err) => {
              if (err) console.error("Error deleting file from server:", err);
              else console.log("File deleted from server:", filePath);
            });
            return result.secure_url;
          } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw error;
          }
        }
        return ''; 
      };
  
      // Upload images to Cloudinary and delete local files (only if new files are uploaded)
      const profileImage = req.files?.profileImage ? await uploadAndDeleteLocal(req.files?.profileImage) : null;
      const Adhar_front = req.files?.Adhar_front ? await uploadAndDeleteLocal(req.files?.Adhar_front) : null;
      const Adhar_back = req.files?.Adhar_back ? await uploadAndDeleteLocal(req.files?.Adhar_back) : null;
      const Address_proof = req.files?.Address_proof ? await uploadAndDeleteLocal(req.files?.Address_proof) : null;
      const Rent_Agreement = req.files?.Rent_Agreement ? await uploadAndDeleteLocal(req.files?.Rent_Agreement) : null;
  
     
      if (
        !Owner_Full_name ||
        !Owner_Phone ||
        !Owner_Address ||
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
  
      
      const existingTenant = await Tenante.findOne({ Wing, Unit });
      if (existingTenant && existingTenant._id.toString() !== id) {
        return res.status(400).json({
          success: false,
          message: "An tenant already exists with this Wing and Unit.",
        });
      }
  
     
      const tenant = await Tenante.findById(id);
      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: "Tenant not found",
        });
      }
  
     
      if (Owner_Full_name) tenant.Owner_Full_name = Owner_Full_name;
      if (Owner_Phone) tenant.Owner_Phone = Owner_Phone;
      if (Owner_Address) tenant.Owner_Address = Owner_Address;
      if (Full_name) tenant.Full_name = Full_name;
      if (Phone_number) tenant.Phone_number = Phone_number;
      if (Email_address) tenant.Email_address = Email_address;
      if (Age) tenant.Age = Age;
      if (Gender) tenant.Gender = Gender;
      if (Wing) tenant.Wing = Wing;
      if (Unit) tenant.Unit = Unit;
      if (Relation) tenant.Relation = Relation;
      if (Resident_status) tenant.Resident_status = Resident_status;
      if (UnitStatus) tenant.UnitStatus = UnitStatus;
  
      
      if (profileImage) tenant.profileImage = profileImage;
      if (Adhar_front) tenant.Adhar_front = Adhar_front;
      if (Adhar_back) tenant.Adhar_back = Adhar_back;
      if (Address_proof) tenant.Address_proof = Address_proof;
      if (Rent_Agreement) tenant.Rent_Agreement = Rent_Agreement;
  
      
      if (Member_Counting) {
        const members = JSON.parse(Member_Counting);
        tenant.Member_Counting = members; 
      }
  
     
      if (Vehicle_Counting) {
        const vehicles = JSON.parse(Vehicle_Counting);
        tenant.Vehicle_Counting = vehicles; 
      }
  
      
      await tenant.save();
  
      return res.status(200).json({
        success: true,
        message: "Tenant data updated successfully",
      });
  
    } catch (error) {
      console.error("Error updating tenant data:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update tenant data",
      });
    }
  };
  


