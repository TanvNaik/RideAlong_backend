const Invoice = require("../models/invoice")
const User = require("../models/user")

exports.getInvoiceById = (req,res,next,id)=>{
    Invoice.findById(id).exec((err,invoice)=>{
        if(err || !invoice){
            return res.status(400).json({
                error: "Unable to find invoice"
            })
        }
        req.invoice = invoice;
        next();
    })
}

exports.addInvoice = (req,res)=>{
    const invoice = new Invoice(req.body);
    invoice.save((err,invoice)=>{
        if(err){
            return res.status(400).json({
                error: "Cannot save the invoice"
            })
        }
        User.findByIdAndUpdate(invoice.sender, 
            {"$push" : { "payments": invoice._id}},
            {new: true, useFindAndModify: false },
            (err, user)=>{
                if(err){
                    return res.status(400).json({
                        error: "Unable to update payment to sender"
                    })
                }
                req.invoiceSender = user;
            }
            )
        User.findByIdAndUpdate(invoice.receiver, 
                {"$push" : { "payments": invoice._id}},
                {new: true, useFindAndModify: false },
                (err, user)=>{
                    if(err){
                        return res.status(400).json({
                            error: "Unable to update payment to receiver"
                        })
                    }
                    req.invoiceReceiver = user;

                }
                )

        return res.json({
            invoice: invoice,
            sender: req.invoiceSender,
            receiver: req.invoiceReceiver
        })
    })
}