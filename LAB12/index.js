document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");

    const saveContacts = (contacts) => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    };

    const getContacts = () => {
        const contacts = localStorage.getItem("contacts");
        return contacts ? JSON.parse(contacts) : [];
    };

    const renderContacts = () => {
        const contacts = getContacts();
        contactList.innerHTML = "";

        if (contacts.length === 0) {
            contactList.innerHTML = "<p>No contacts available. Add one above!</p>";
            return;
        }

        contacts.forEach((contact, index) => {
            const contactCard = document.createElement("div");
            contactCard.className = "contact-card";
            contactCard.innerHTML = `
                <p><strong>${contact.name}</strong></p>
                <p>${contact.phone}</p>
                <p>${contact.email}</p>
                <p>${contact.address}</p>
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
            `;
            contactList.appendChild(contactCard);
        });
    };

    const addContact = (contact) => {
        const contacts = getContacts();
        contacts.push(contact);
        saveContacts(contacts);
        renderContacts();
    };

    const deleteContact = (index) => {
        let contacts = getContacts();
        contacts.splice(index, 1);
        saveContacts(contacts);
        renderContacts();
    };

    window.deleteContact = deleteContact;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const contact = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            address: formData.get("address"),
        };
        addContact(contact);
        contactForm.reset();
    });

    renderContacts();
});
