let contacts = []; // Armazena os contatos no navegador (simulando o localStorage)

document.addEventListener('DOMContentLoaded', () => {
  // Carregar contatos do localStorage (se existirem)
  if (localStorage.getItem('contacts')) {
    contacts = JSON.parse(localStorage.getItem('contacts'));
    displayContacts();
  }
});

function addContact() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // Validar se os campos estão preenchidos
  if (name && email && phone) {
    const contact = { name, email, phone };
    contacts.push(contact);
    
    // Salvar no localStorage
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    // Limpar campos
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';

    displayContacts();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

function displayContacts() {
  const tableBody = document.querySelector('#contactsTable tbody');
  tableBody.innerHTML = '';

  contacts.forEach((contact, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>
        <button onclick="editContact(${index})">Editar</button>
        <button onclick="deleteContact(${index})">Excluir</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Atualizar o total de contatos
  document.getElementById('totalContacts').textContent = contacts.length;
}

function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  displayContacts();
}

function editContact(index) {
  const contact = contacts[index];
  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;
  document.getElementById('phone').value = contact.phone;
  
  // Remover o contato antigo antes de editar
  deleteContact(index);
}

function filterContacts() {
  const filter = document.getElementById('filter').value.toLowerCase();
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(filter)
  );
  
  // Exibir os contatos filtrados
  const tableBody = document.querySelector('#contactsTable tbody');
  tableBody.innerHTML = '';

  filteredContacts.forEach((contact, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>
        <button onclick="editContact(${index})">Editar</button>
        <button onclick="deleteContact(${index})">Excluir</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Atualizar o total de contatos filtrados
  document.getElementById('totalContacts').textContent = filteredContacts.length;
}