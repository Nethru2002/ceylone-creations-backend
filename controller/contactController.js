const Contact = require('../model/contact');
const express = require('express');

const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newContact = new Contact({
            name,
            email,
            subject,
            message,
        });
        await newContact.save();
        res.status(201).json({ message: 'Contact created successfully' });
        
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }

}

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
        
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = { createContact, getContacts };