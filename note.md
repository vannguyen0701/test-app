
https://dev.to/jasurkurbanov/how-to-export-data-to-excel-from-api-using-react-incl-custom-headers-5ded
npm install papaparse --save
<input type="file" onChange={handleFileSelect} />

import Papa from 'papaparse';

function handleFileSelect(event) {
  const file = event.target.files[0];
  Papa.parse(file, {
    header: true,
    complete: function(results) {
      console.log(results.data);
    }
  });
}

https://stackoverflow.com/questions/68558614/passing-a-csv-file-as-a-parameter-to-a-rest-api-in-reactjs