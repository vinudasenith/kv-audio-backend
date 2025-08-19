import Order from "../models/order.js";
import Product from "../models/product.js";
import { isItAdmin, isItCustomer } from "./userController.js";


//create order
export async function createOrder(req, res) {
    try {
        const data = req.body;


        if (!req.user) {
            return res.status(401).json({ message: "Please login and try again" });
        }


        const orderInfo = {
            email: req.user.email,
            orderedItems: []
        };


        const lastOrder = await Order.find().sort({ orderDate: -1 }).limit(1);
        if (lastOrder.length === 0) {
            orderInfo.orderId = "ORD0001";
        } else {
            const lastOrderId = lastOrder[0].orderId;
            const lastOrderNumber = parseInt(lastOrderId.replace("ORD", ""));
            const currentOrderNumber = lastOrderNumber + 1;
            orderInfo.orderId = "ORD" + String(currentOrderNumber).padStart(4, "0");
        }


        let oneDayCost = 0;
        for (const item of data.orderedItems) {
            const product = await Product.findOne({ key: item.key });

            if (!product) {
                return res.status(404).json({
                    message: `Product with key ${item.key} not found`
                });
            }

            if (!product.availability) {
                return res.status(400).json({
                    message: `Product with key ${item.key} is not available`
                });
            }

            orderInfo.orderedItems.push({
                product: {
                    key: product.key,
                    name: product.name,
                    image: product.image[0],
                    price: product.price,
                },
                quantity: item.qty,
            });

            oneDayCost += product.price * item.qty;
        }


        orderInfo.days = data.days;
        orderInfo.startingDate = data.startingDate;
        orderInfo.endingDate = data.endingDate;
        orderInfo.totalAmount = oneDayCost * data.days;


        const newOrder = new Order(orderInfo);
        const result = await newOrder.save();

        res.json({
            message: "Order created successfully",
            order: result,
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
}

//get quote
export async function getQuote(req, res) {
    try {
        const data = req.body;
        const orderInfo = {
            orderedItems: []
        };

        let oneDayCost = 0;
        for (const item of data.orderedItems) {
            const product = await Product.findOne({ key: item.key });

            if (!product) {
                return res.status(404).json({
                    message: `Product with key ${item.key} not found`
                });
            }

            if (!product.availability) {
                return res.status(400).json({
                    message: `Product with key ${item.key} is not available`
                });
            }

            orderInfo.orderedItems.push({
                product: {
                    key: product.key,
                    name: product.name,
                    image: product.image[0],
                    price: product.price,
                },
                quantity: item.qty,
            });

            oneDayCost += product.price * item.qty;
        }


        orderInfo.days = data.days;
        orderInfo.startingDate = data.startingDate;
        orderInfo.endingDate = data.endingDate;
        orderInfo.totalAmount = oneDayCost * data.days;

        res.json({
            message: "Order quotation",
            total: orderInfo.totalAmount,
            details: orderInfo
        });

    } catch (error) {
        console.error("Error generating quote:", error);
        res.status(500).json({ message: "Failed to generate quote" });
    }
}


//get orders
export async function getOrders(req, res) {
    try {
        if (isItCustomer(req)) {
            const orders = await Order.find({ email: req.user.email });
            return res.json(orders);
        }

        if (isItAdmin(req)) {
            const orders = await Order.find();
            return res.json(orders);
        }

        res.status(403).json({ error: "Unauthorized" });

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to get orders" });
    }
}


//update order
export async function approveOrRejectOrder(req, res) {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!isItAdmin(req)) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        await Order.updateOne(
            { orderId },
            { status }
        );

        res.json({
            message: "Order status updated successfully",
            orderId,
            newStatus: status
        });

    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Failed to update order status" });
    }
}