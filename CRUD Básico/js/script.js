const OpenModal = () => document.getElementById('modal').classList.add('active');
const CloseModal = () => {
    ClearFields();
    document.getElementById('modal').classList.remove('active');
}

const GetLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const SetLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient));

//CRUD - Create Read Update Delete

const ReadClient = () => GetLocalStorage();

const CreateClient = (client) => {
    const dbClient = ReadClient();
    dbClient.push(client);
    SetLocalStorage(dbClient);
}

const UpdateClient = (index, client) =>  {
    const dbClient = ReadClient();
    dbClient[index] = client;
    SetLocalStorage(dbClient);
}

const DeleteClient = (index) => {
    const dbClient = ReadClient();
    dbClient.splice(index, 1);
    SetLocalStorage(dbClient);
    RenderTable();
}

//Interações de usuário
const FieldsFilled = () => {
    return document.getElementById('form').reportValidity();
}

const SaveClient = () => {
    if (FieldsFilled()) {
        const client = {
            name: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('celular').value,
            city: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index;
        if (index == 'new') {
            CreateClient(client);
            CloseModal();
            RenderTable();
        } else {
            UpdateClient(index, client);
            RenderTable();
            CloseModal();
        }
    }
}

const ClearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = '');
}

const CreateTableRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.city}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">editar</button>
            <button type="button" class="button red" id="delete-${index}">excluir</button>
        </td>
    `
    document.querySelector('#tbClients tbody').appendChild(newRow);
}

const ClearTable = () => {
    const rows = document.querySelectorAll('#tbClients tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const RenderTable = () => {
    ClearTable();
    const dbClient = ReadClient();
    dbClient.forEach(CreateTableRow);
}

const FillFields = (client) => {
    document.getElementById('nome').value = client.name;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.phone;
    document.getElementById('cidade').value = client.city;
    document.getElementById('nome').dataset.index = client.index;
}

const EditClient = (index) => {
    const client = ReadClient()[index];
    client.index = index;
    FillFields(client);
    OpenModal();
}

const EditDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-');
        
        if (action == 'edit') {
            EditClient(index);
        } else {
            const client = ReadClient()[index];
            const response = confirm(`Tem cereteza que quer apagar ${client.name} dos registros?`);
            if (response) {
                DeleteClient(index);
            }
        }
    }
}

RenderTable();

// EVENTOS
document.getElementById('cadastrarCliente').addEventListener('click', OpenModal);
document.getElementById('modalClose').addEventListener('click', CloseModal);
document.getElementById('cancelar').addEventListener('click', CloseModal);
document.getElementById('salvar').addEventListener('click', SaveClient);
document.querySelector('#tbClients tbody').addEventListener('click', EditDelete);