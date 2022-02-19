const Invoice = require("../models/invoice")
const User = require("../models/user")
const Ride = require("../models/ride")
const invoice = require("../models/invoice")
exports.getInvoiceById = (req,res,next,id)=>{
    Invoice.findById(id)
    .populate('sender receiver')
    .exec((err,invoice)=>{
        if(err || !invoice){
            return res.status(400).json({
                error: "Unable to find invoice"
            })
        }
        req.invoice = invoice;
        next();
    })
}

exports.getRideInvoices = (req,res) => {
    Invoice.find({'ride': req.params.rideId})
    .populate("sender receiver").exec( (err, invoices) => {
        if(err || !invoices){
            return res.status(400).json({
                error: "Unable to find invoice"
            })
        }
        return res.json({
            invoices: invoices
        })
    })
}

exports.addInvoice = (req,res,next)=>{
    const invoice = new Invoice({
        sender: req.body.sender,
        receiver: req.body.receiver,
        ride: req.body.ride,
        invoiceAmount: req.body.invoiceAmount
    });
    invoice.save((err,invoice)=>{
        if(err){
            return res.status(400).json({
                error: "Cannot save the invoice"
            })
        }
        res.locals.invoice = invoice
        console.log("Done in Invoice")
        // push payment in ride             
        next()       
    })
}