const router=require("express").Router();

const { createExpense, GetAllExpenses,  } = require("../controller/expensesController");
const upload=require("../utils/expensesImage")


router.post("/addexpenses", upload.fields([
    { name: 'Upload_Bill', maxCount: 1 },
]),createExpense);


router.get("/viewexpenses",GetAllExpenses)

module.exports=router;