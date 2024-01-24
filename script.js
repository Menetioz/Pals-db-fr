document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('tableBody');

    async function loadTSV() {
        const response = await fetch('datapals.tsv'); 
        const data = await response.text();
        return data.split('\n').slice(1).map(row => row.split('\t'));
    }

    function updateTable(tsvData) {
        tableBody.innerHTML = '';
        tsvData.forEach(row => {
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

    loadTSV().then(tsvData => {
        updateTable(tsvData);
    });
});