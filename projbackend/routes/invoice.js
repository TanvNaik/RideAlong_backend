const express = require("express");
const router = express.Router();

const {
    getInvoiceById,
    addInvoice
} = require("../controllers/invoice")
const {
    isSignedIn,
    isAuthenticated
} = require("../controllers/authentication")


// PARAMs
router.param("invoiceId", getInvoiceById)


// POST
router.post("/create/invoice", isSignedIn, addInvoice);


module.exports = router;