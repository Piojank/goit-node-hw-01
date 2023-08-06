const contactsActions = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
require("colors");

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
                const contacts = await contactsActions.listContacts();
                console.log("Your contacts list:".green);
                console.table(contacts);
            break;

        case "get":
                const contact = await contactsActions.getContactById();
                console.log(`Contact with ID ${id}`.green)
                console.table(contact);
            break;

        case "add":
        
            break;

        case "remove":
        
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);