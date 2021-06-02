import asyncHandler from 'express-async-handler';   //Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
import Order from '../models/orderModel.js';


// @desc      Create New Order
// @route     POST  /api/orders
// @access    Private
const addOrderItems = asyncHandler(async(req, res) => {

    const { 
        orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No Order Items');
        return;
    } else {
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createdOrder = await order.save();
        res.status(201).json({
            createdOrder
        })
    }
})



// @desc      Get Order by ID
// @route     GET  /api/orders/:id
// @access    Private
const getOrderById = asyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order)  
    } else {
        res.status(404);
        throw new Error('Order Not Found')
    }
})


// @desc      Update Order to Paid
// @route     GET  /api/orders/:id/pay
// @access    Private
const updateOrderToPaid = asyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();

        // Recieved from PayPal
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,

        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order Not Found')
    }
})



// @desc      Update Order to Delivered 
// @route     GET  /api/orders/:id/deliver
// @access    Private/admin 
const updateOrderToDelivered = asyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order Not Found')
    }
})



// @desc      Get Logged In User Orders
// @route     GET  /api/orders/myorders
// @access    Private
const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id }); 

    res.json(orders)
})


// @desc      Get All Orders
// @route     GET  /api/orders/
// @access    Private/admin
const getOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({}).populate('user', 'id name')

    res.json(orders)
})


// RAZORPAY IMPLEMENTATION
const razorPayPayment = asyncHandler(async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: 50000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
})


const razorPayPaymentSucces = asyncHandler(async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
})



export { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders, razorPayPayment, razorPayPaymentSucces }
