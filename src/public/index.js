document.addEventListener("DOMContentLoaded", () => {
    getHeroes();
});

function showCreateForm() {
    document.getElementById('createForm').style.display = 'block';
}

function showUpdateForm(hero) {
    document.getElementById('updateForm').style.display = 'block';
    document.getElementById('updateHeroName').value = hero.name;
    document.getElementById('updateHeroAlias').value = hero.alias;
    document.getElementById('updateHeroPowers').value = hero.powers.join(', ');
    document.getElementById('updateHeroId').value = hero.id; // Hidden field for hero ID
}

function addHero() {
    const name = document.getElementById('heroName').value;
    const alias = document.getElementById('heroAlias').value;
    const powers = document.getElementById('heroPowers').value.split(',');

    // Validate required fields
    if (!name || !alias) {
        alert("Both 'Hero Name' and 'Alias' are required.");
        return; // Exit the function if validation fails
    }

    const hero = { name, alias, powers };

    fetch('/heroes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
    })
        .then(response => response.json())
        .then(data => {
            displayHero(data);
            resetForm();
        })
        .catch(error => console.error('Error:', error));
}

function getHeroes() {
    fetch('/heroes')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('heroesTable');
            table.innerHTML = ''; // Clear existing content
            data.forEach(hero => displayHero(hero));
        })
        .catch(error => console.error('Error:', error));
}

function displayHero(hero) {
    const table = document.getElementById('heroesTable');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${hero.name}</td>
        <td>${hero.alias}</td>
        <td>${hero.powers.join(', ')}</td>
        <td>
            <button class='btn' onclick='showUpdateForm(${JSON.stringify(hero)})'>Edit</button>
            <button class='btn delete' onclick='deleteHero(${hero.id})'>Delete</button>
        </td>
    `;

    table.appendChild(row);
}

function deleteHero(id) {
    fetch(`/heroes/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            getHeroes(); // Refresh the table
        })
        .catch(error => console.error('Error:', error));
}

function updateHero() {
    const id = document.getElementById('updateHeroId').value;
    const name = document.getElementById('updateHeroName').value;
    const alias = document.getElementById('updateHeroAlias').value;
    const powers = document.getElementById('updateHeroPowers').value.split(',');

    const updatedHero = { name, alias, powers };

    fetch(`/heroes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedHero),
    })
        .then(response => response.json())
        .then(data => {
            getHeroes(); // Refresh the table with updated data
            resetUpdateForm();
        })
        .catch(error => console.error('Error:', error));
}

function resetForm() {
    document.getElementById('heroName').value = '';
    document.getElementById('heroAlias').value = '';
    document.getElementById('heroPowers').value = '';
    document.getElementById('createForm').style.display = 'none';
}

function resetUpdateForm(){
    document.getElementById('updateHeroName').value = '';
    document.getElementById('updateHeroAlias').value = '';
    document.getElementById('updateHeroPowers').value = '';
    document.getElementById('updateForm').style.display = 'none';
}
