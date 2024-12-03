const { CreateIncome, GetIncome, GetByIdIncome, DeleteIncome, UpdateIncome, updateResidentIncomePaymentMode, getCompletedIncomeRecords, fetchUserPendingIncome, GetTotalIncomeAmount } = require("../controller/incomeController");
const { authenticate } = require("../middleware/authenticate ");

const router=require("express").Router();

//add income
router.post("/addincome",CreateIncome)

//get income
router.get("/",GetIncome)

//get by id income
router.get("/:id",GetByIdIncome)

//delete income
router.delete("/delete/:id",DeleteIncome)

//update income
router.put("/update/:id",UpdateIncome)

//update and get payment
router.put('/:incomeId/resident/payment',authenticate,updateResidentIncomePaymentMode);

//get done income
router.get("/done/completed-payments/", getCompletedIncomeRecords);

//FindByIdUserAndMaintance
router.get("/find/getuserandIncome",authenticate,fetchUserPendingIncome)


// get total amount
router.get('/income/total-amount', GetTotalIncomeAmount);

module.exports=router