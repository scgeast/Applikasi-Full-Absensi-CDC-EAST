// js/excel-export.js
export class ExcelExport {
    // Export table to Excel
    static exportToExcel(tableId, filename = 'data') {
        const table = document.getElementById(tableId);
        if (!table) {
            alert('Table not found!');
            return;
        }

        let csv = [];
        const rows = table.querySelectorAll('tr');
        
        for (let i = 0; i < rows.length; i++) {
            let row = [], cols = rows[i].querySelectorAll('td, th');
            
            for (let j = 0; j < cols.length; j++) {
                let data = cols[j].innerText.replace(/,/g, '');
                row.push(`"${data}"`);
            }
            csv.push(row.join(','));
        }

        // Download CSV file
        const csvString = csv.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // Export specific data array to Excel
    static exportDataToExcel(data, headers, filename = 'data') {
        if (!data || data.length === 0) {
            alert('No data to export!');
            return;
        }

        let csv = [headers.join(',')];
        
        data.forEach(item => {
            let row = [];
            headers.forEach(header => {
                let value = item[header] || '';
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                row.push(`"${value.toString().replace(/,/g, '')}"`);
            });
            csv.push(row.join(','));
        });

        // Download CSV file
        const csvString = csv.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
