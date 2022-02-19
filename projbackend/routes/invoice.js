const express = require("express");
const router = express.Router();

const {
    getInvoiceById,
    addInvoice,
    getRideInvoices
} = require("../controllers/invoice")
const {
    isSignedIn,
    isAuthenticated
} = require("../controllers/authentication");
const { updatePayemtInRide } = require("../controllers/ride");
const { updatePaymentInUser } = require("../controllers/user");


// PARAMs
router.param("/invoiceId", getInvoiceById)

//GET
router.get("/invoices/:rideId", getRideInvoices )

// POST
router.post("/create/invoice/:rideId/:userId",addInvoice,  updatePayemtInRide , updatePaymentInUser );


module.exports = router;