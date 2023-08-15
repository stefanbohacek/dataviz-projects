const replacer = (key, value) => value === null ? '' : value;

const jsonToCSV = (data) => {
    const header = Object.keys(data[0])
    const csv = [
      header.join(','), // header row first
      ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');
    return csv;
};

const downloadCSV = (csv, name) => {
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', name);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('Sorry, download is not supported in this browser.');
    }
};

export { replacer, jsonToCSV, downloadCSV };
