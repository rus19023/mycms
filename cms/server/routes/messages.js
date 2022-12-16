var express = require('express');
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");
const Contact = require("../models/contact");

router.get("/", (req, res, next) => {
    db.Message.find()
        .populate('sender')
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json({ error: err }));
});

router.post("/", (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
  });

  message
        .save()
        .then(async (createdMessage) => {
        await Contact
            .findById(createdMessage.sender)
            .then((c) => createdMessage.sender = c);

        res.status(201).json({
            message: "Message added successfully",
            data: createdMessage,
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "An error occurred",
            error: error,
        });
    });
});

router.put("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then((message) => {
            message.subject = req.body.subject;
            message.msgText = req.body.msgText;
            Message.updateOne({ id: req.params.id }, message)
            .then((result) => {
                res.status(204).json({
                    message: "Message updated successfully",
                });
            })
            .catch((error) => {
            res.status(500).json({
                message: "An error occurred",
                error: error,
            });
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Message not found.",
            error: { data: "Message not found" },
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then((message) => {
        Message.deleteOne({ id: req.params.id })
            .then((result) => {
            res.status(204).json({
                message: "Message deleted successfully",
            });
            })
            .catch((error) => {
            res.status(500).json({
                message: "An error occurred",
                error: error,
            });
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Message not found.",
            error: { data: "Message not found" },
        });
    });
});

module.exports = router;