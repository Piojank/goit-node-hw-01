const fs = require('fs').promises;
const path = require('path');
const { v4 } = require("uuid");

const contactsPath = path.resolve(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        console.log(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const result = contacts.find(({ id }) => id === contactId);
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const contactToDelete = getContactById(contactId);
        const newContacts = contacts.filter(({ id }) => id === contactId);
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        return contactToDelete;
    } catch (error) {
        console.log(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const addContact = { id: v4(), name, email, phone };
        const newContacts = [...contacts, addContact];
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        return addContact;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};
