document.addEventListener("DOMContentLoaded", () => {
    getHeroes();
});

function showCreateForm() {
    document.getElementById('createForm').style.display = 'block';
}

function addHero() {
    const name = document.getElementById('heroName').value;
    const alias = document.getElementById('heroAlias').value;
    const powers = document.getElementById('heroPowers').value.split(',');

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
            <button class='btn'>Edit</button>
            <button class='btn delete' onclick="deleteHero(${hero.id})">Delete</button>
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

function resetForm() {
    document.getElementById('heroName').value = '';
    document.getElementById('heroAlias').value = '';
    document.getElementById('heroPowers').value = '';
    document.getElementById('createForm').style.display = 'none';
}
