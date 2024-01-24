document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');
    let tsvData = [];

    async function loadTSV() {
        const response = await fetch('datapals.tsv'); // Replace 'data.tsv' with your TSV file path
        const data = await response.text();
        tsvData = data.split('\n').slice(1).map(row => row.split('\t')); // Parse TSV data
        updateTable(tsvData); // Initial table population
    }

    function updateTable(filteredData) {
        tableBody.innerHTML = '';
        filteredData.forEach(row => {
            const tr = document.createElement('tr');
            tr.classList.add('border', 'md:table-row');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.classList.add('block', 'md:table-cell', 'p-2');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    function searchInTSV(term) {
        return tsvData.filter(row => row.some(cell => cell.toLowerCase().includes(term.toLowerCase())));
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        const filteredData = searchTerm ? searchInTSV(searchTerm) : tsvData;
        updateTable(filteredData);
    });

    loadTSV();
});

