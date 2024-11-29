const router=require("express").Router();

const { createExpense, GetAllExpenses, GetExpenseById, UpdateExpense, DeleteExpense,  } = require("../controller/expensesController");
const upload=require("../utils/expensesImage")

// add expenses
router.post("/addexpenses", upload.fields([{ name: 'Upload_Bill', maxCount: 1 },]),createExpense);

// get expenses
router.get("/viewexpenses",GetAllExpenses)

// get by id expenses
router.get('/:id', GetExpenseById);

// update expenses
router.put('/updateexpenses/:id',  upload.fields([{ name: 'Upload_Bill', maxCount: 1 },]), UpdateExpense);

// delete expense
router.delete('/:id', DeleteExpense);

module.exports=router;