const contactsListHandling = () => {
  const contacts = document.querySelector('.contacts');
  if (contacts) {
    const contactPersonContacts = contacts.querySelectorAll('.contact-person__contacts');
    const managementContacts = contacts.querySelectorAll('.management__contacts');
    if (contactPersonContacts && managementContacts) {
      let breakpointTb = window.matchMedia('(min-width: 768px)');
      if (breakpointTb.matches) {
        let widthArrayPersons = [];
        contactPersonContacts.forEach((element) => {
          let contactPersonWidth = element.getBoundingClientRect().width;
          widthArrayPersons.push(contactPersonWidth);
        });
        let contactsMaxWidth = Math.max.apply(null, widthArrayPersons);
        contactPersonContacts.forEach((element) => {
          element.style.width = `${contactsMaxWidth}px`;
        });

        let widthArrayManagement = [];
        managementContacts.forEach((element) => {
          let managementContactWidth = element.getBoundingClientRect().width;
          widthArrayManagement.push(managementContactWidth);
        });
        let managementMaxWidth = Math.max.apply(null, widthArrayManagement);
        managementContacts.forEach((element) => {
          element.style.width = `${managementMaxWidth}px`;
        });
      }
    }
  }
};

export {contactsListHandling};
