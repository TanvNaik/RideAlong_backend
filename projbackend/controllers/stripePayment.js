const stripe = require("stripe")("sk_test_51K8cO1SJbisPWPLvO3NYA0dFnqzwOv2uRw3h5GKU8eiqZBKoVXKafgYdCBcf7C8PVaweiOAfxT74PRYOi5cpncN600j3YAYHZE")
const { v4: uuidv4 } = require('uuid');


exports.makePayment = (req,res) => {
    const { fare, token} = req.body

    const idempotencyKey = uuidv4()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: fare * 100,
            currency: 'inr',
            customer: customer.id,
            
        }, {idempotencyKey})
        .then((result) => res.json(result))
        .catch(err => console.log(err))
    })
}