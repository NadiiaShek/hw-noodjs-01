const fs = require("fs").promises;
const path = require("path");

const listContacts = async () => {
  try {
    const data = await fs.readFile(path.resolve("./db/contacts.json"), "utf8");
    const parsedData = JSON.parse(data);
    console.table(parsedData);
  } catch (err) {
    console.error(err);
  }
};
const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(path.resolve("./db/contacts.json"), "utf8");

    const parsedData = JSON.parse(data);

    parsedData.map((contact) => {
      if (contact.id === contactId.toString()) {
        console.table(contact);
        return;
      }
    });
  } catch (err) {
    console.error(err);
  }
};
const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(path.resolve("./db/contacts.json"), "utf8");

    const parsedData = JSON.parse(data);
    let index = parsedData.findIndex((contact) => {
      return contact.id === contactId.toString();
    });

    parsedData.splice(index, 1);

    await fs.writeFile(
      "./db/contacts.json",
      JSON.stringify(parsedData),
      "utf8"
    );
    console.table(parsedData);
  } catch (err) {
    console.error(err);
  }
};
const addContact = async (name, email, phone) => {
  console.log("addContact");
  try {
    const data = await fs.readFile(path.resolve("./db/contacts.json"), "utf8");
    const parsedData = JSON.parse(data);
    phone = phone.toString();
    const newContact = {
      name,
      email,
      phone,
    };
    parsedData.push(newContact);

    await fs.writeFile(
      "./db/contacts.json",
      JSON.stringify(parsedData),
      "utf8"
    );
    console.table(parsedData);
  } catch (err) {
    console.error(err);
  }
};
module.exports = { listContacts, getContactById, removeContact, addContact };