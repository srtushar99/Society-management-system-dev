import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import NotificationIcon from "../../assets/notification-bing.png"; 
import AvatarImage from "../../assets/Avatar.png"; 
import AddExpense from './AddExpense';
import EditExpense from './EditExpense';
import ViewExpense from './ViewExpense';
import DeleteExpense from './DeleteExpense';
import HeaderBaner  from "../../Dashboard/Header/HeaderBaner";
import { FileImage, FileIcon as FilePdf } from 'lucide-react';
import axiosInstance from '../../Common/axiosInstance';
import moment from 'moment';
import "../../Dashboard/Maintenance/scrollbar.css";

const initialData = [
  { id: 1, title: 'Rent or Mortgage', description: 'A visual representation of your spending categories...', date: '10/02/2024', Amount: '1000', billFormat: 'JPG'},
  { id: 2, title: 'Housing Costs', description: 'Rack the fluctuations in your spending over time...', date: '11/02/2024', Amount: '1000', billFormat: 'PDF'},
  { id: 3, title: 'Property Taxes', description: 'Easily compare your planned budget against your expenses...', date: '12/02/2024', Amount: '1000', billFormat: 'JPG'},
  { id: 4, title: 'Transportation', description: 'Identify your largest expenditures, enabling you to adjust accordingly...', date: '13/02/2024', Amount: '1000', billFormat: 'PDF'},
  { id: 5, title: 'Financial Breakdown', description: 'Tailor the dashboard to your unique financial goals...', date: '14/02/2024', Amount: '1000', billFormat: 'JPG'},
  { id: 6, title: 'Expense Tracker', description: 'Organizing and categorizing your expenses...', date: '15/02/2024', Amount: '1000', billFormat: 'PDF'},
  { id: 7, title: 'Personal Expenses', description: 'Future-proof your budget by adjusting accordingly...', date: '16/02/2024', Amount: '1000', billFormat: 'JPG'},
  { id: 8, title: 'Rent or Mortgage', description: 'Expenses that make sense for your budget...', date: '17/02/2024', Amount: '1000', billFormat: 'PDF'},
  { id: 9, title: 'Cost Management Hub', description: 'Helping you identify where your money is going...', date: '18/02/2024', Amount: '1000', billFormat: 'JPG'},
  { id: 10, title: 'Entertainment', description: 'Simply navigate through the different sections to get a better view...', date: '19/02/2024', Amount: '1000', billFormat: 'PDF'},
  { id: 11, title: 'Rent or Mortgage', description: 'A visual representation of your spending categories...', date: '20/02/2024', Amount: '1000', billFormat: 'JPG'},
];

const Expense = () => {
  const [data, setData] = useState(initialData);
  const [isCreateExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpenseForView, setSelectedExpenseForView] = useState(null);
  const [selectedExpenseForDelete, setSelectedExpenseForDelete] = useState(null);
  const [Expense, setExpense] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };


  const openCreateExpenseModal = () => setIsExpenseOpen(true);
  const closeCreateExpenseModal = () => setIsExpenseOpen(false);

  const openEditModal = (item) => {
    setSelectedExpenseForView(item);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const openViewModal = (item) => {
    setSelectedExpenseForView(item);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => setIsViewModalOpen(false);

  const openDeleteModal = (item) => {
    setSelectedExpenseForDelete(item);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDelete = (id) => {
    setExpense(Expense.filter(item => item._id !== id));
    closeDeleteModal();
  };


    // Fetch Expense  from the API
    const fetchExpense = async () => {
      try {
          const response = await axiosInstance.get('/v2/expenses/viewexpenses');
          console.log(response.data);
          if(response.status === 200){
            const updatedData = response.data.expenses.map(item => {
              const url = item.Upload_Bill;
              const format = url.split('.').pop().toLowerCase();
              return {
                ...item,
                billFormat: format
              };
            });
          setExpense(updatedData); 
          }
         
      } catch (error) {
          console.error('Error fetching Expense :', error);
      }
  };


  useEffect(() => {
    fetchExpense();
  }, []);


  return (
    <div className="flex bg-gray-100 w-full h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
      <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] 2xl:ml-[320px]  text-muted d-none d-sm-flex ">
            <Link
              to="/dashboard"
              className=" text-[#A7A7A7] text-decoration-none font-weight-semibold  sm:text-base"
            >
              Home
            </Link>
            <span className="text-[#202224] fs-5 mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
            Expenses
            </span>
          </div>

          {/* Search Icon (Visible only on small screens) */}
          <div
            className={`d-block ml-auto d-sm-none p-2 rounded-lg ${
              isSearchVisible ? "border-none" : "border border-[#D3D3D3]"
            }`}
          >
            {!isSearchVisible && (
              <button
                onClick={toggleSearchVisibility}
                className="text-muted bg-transparent border-0"
              >
                <i className="fas fa-search"></i> {/* Search Icon */}
              </button>
            )}
            {isSearchVisible && (
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-1 py-1 w-[100px] rounded-md border mt-2"
                />
              </div>
            )}
          </div>

          <HeaderBaner />
        </header>

        <div className="bg-[#FFFFFF] rounded-lg lg:ml-[310px] shadow-md lg:w-[1590px] mt-5">
          <div className="flex justify-between items-center mb-6 p-2 pt-4 ps-3">
            <h1 className="text-xl font-semibold  whitespace-nowrap text-gray-800">Add Expense Details</h1>
            <button
              onClick={openCreateExpenseModal}
              className="bg-orange-500  whitespace-nowrap hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
            >
              Add Expense Details
            </button>
          </div>
           
          <div className="overflow-x-auto h-[700px] rounded-2xl scrollbar-thin 2xl:ml-5 ml-2 mr-2  scrollbar-thumb-gray-300 scrollbar-track-gray-100">
           <div className='Content'>
            <table className="bg-white border 2xl:w-[1560px] border-gray-200 rounded-lg shadow-md w-full">
              <thead className="bg-[#5678E9] w-full" style={{ backgroundColor:"rgba(86, 120, 233, 0.1)" }} >
                <tr className="text-left text-sm font-semibold">
                  <th className="p-3  whitespace-nowrap text-[#202224]">Title</th>
                  <th className="p-3 text-left whitespace-nowrap  sm:table-cell">Description</th>
                  <th className="p-3 text-center whitespace-nowrap  md:table-cell">Date</th>
                  <th className="p-3 text-center whitespace-nowrap  lg:table-cell">Amount</th>
                  <th className="p-3 ps-5 whitespace-nowrap  lg:table-cell">Bill Format</th>
                  <th className="p-3 lg:table-cell text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {Expense.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-3 pt-2 text-start whitespace-nowrap text-gray-700 font-medium">{!!item.Title ? item.Title : ""}</td>
                    <td className="p-3 pt-2 text-left whitespace-nowrap sm:table-cell text-gray-600">{!!item.Description ? item.Description : ""}</td>
                    <td className="p-3 pt-2 text-center md:table-cell text-gray-600">{!!item.Date ? moment(item.Date).format("DD/MM/YYYY") : ""}</td>
                    <td className="p-3 pt-2 text-center lg:table-cell text-[#39973D]">₹{!!item.Amount ? item.Amount : 0}</td>
                    <><td className="p-3 ps-5 pt-2   text-center lg:table-cell text-gray-600">
                      {!!item.billFormat ? <div className="flex items-center space-x-2">
                        {item.billFormat == 'JPG' || item.billFormat == "jpg" ? (
                          <FileImage className="w-5 h-5 text-blue-500" />
                        ) : (
                          <FilePdf className="w-5 h-5 text-red-500" />
                        )}
                        <span>{item.billFormat}</span>
                      </div> :
                      <div className="flex items-center space-x-2"></div>
                      }
                    </td></>
                    <td className="p-3 pt-2">
                      <div className="flex  space-x-2  justify-center">
                        <button
                          className="bg-blue-50 text-[#39973D] rounded-2 p-2 sm:w-10 sm:h-10"
                          onClick={() => openEditModal(item)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          className="bg-blue-50 text-[#5678E9] rounded-2 p-2 sm:w-10 sm:h-10"
                          onClick={() => openViewModal(item)}
                        >
                          <i className="fa-solid fa-eye w-2 me-2"></i>
                        </button>
                        <button
                          className="bg-blue-50 text-red-600 rounded-2 p-2 sm:w-10 sm:h-10"
                          onClick={() => openDeleteModal(item)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {isCreateExpenseOpen && <AddExpense isOpen={isCreateExpenseOpen} onClose={closeCreateExpenseModal} fetchExpense={fetchExpense}/>}
        
        {isEditModalOpen && selectedExpenseForView && (
          <EditExpense
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            expense={selectedExpenseForView}
            // onSave={(updatedData) => {
            //   console.log(updatedData);
            //   closeEditModal();
            // }}
            fetchExpense={fetchExpense}
          />
        )}
        {isViewModalOpen && selectedExpenseForView && (
          <ViewExpense isOpen={isViewModalOpen} onClose={closeViewModal} expense={selectedExpenseForView} />
        )}
        {isDeleteModalOpen && selectedExpenseForDelete && (
          <DeleteExpense
            isOpen={isDeleteModalOpen}
            onCancel={closeDeleteModal}
            expense={selectedExpenseForDelete}
            onDelete={() => handleDelete(selectedExpenseForDelete._id)}
            fetchExpense={fetchExpense}
          />
        )}
      </div>
    </div>
  );
};

export default Expense;