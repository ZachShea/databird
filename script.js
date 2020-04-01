function saveFeature() {
  let name = document.getElementById("name-field").value;
  let js = document.getElementById("js-field").value;

  // create button
  let button = document.createElement("button");
  button.innerHTML = name
  button.onclick = () => { eval(js); };
  document.getElementById("features-list").appendChild(button);
}

function displayJSON(json) {
  removeUI();
  createJSONUI(json);
}

function displayCSV(csv) {
  removeUI();
  createCSVUI(csv);
}

function removeUI() {
  document.getElementById("display-area").innerHTML = '';
}

function createJSONUI(json) {
  // if array
  if (json.length > 0) {
    let keys = Object.keys(json[0]);
    let table = document.createElement("table");
    let header = document.createElement("tr");

    // create header from keys
    keys.forEach(key => {
      let headerItem = document.createElement("th");
      headerItem.innerHTML = key;
      header.appendChild(headerItem);
    });
    table.appendChild(header);

    // create rows for each item
    json.forEach(element => {
      let row = document.createElement("tr");

      // create row items for each value
      keys.forEach(key => {
        let value = element[key];
        let rowItem = document.createElement("td");
        
        if (typeof value == 'object') {
          let button = document.createElement("button");
          button.innerHTML = 'Open'
          button.onclick = () => { displayJSON(value); };
          rowItem.appendChild(button);
        } 
        else {
          rowItem.innerHTML = element[key];
        }

        row.appendChild(rowItem);
      });

      table.appendChild(row);
    });

    document.getElementById("display-area").appendChild(table);
  }

  // if object
  else {
    Object.keys(json).forEach(key => {
      let value = json[key];

      // display the data
      let card = document.createElement("div");
      if (typeof value == 'object') {
        card.innerHTML = key + ":";
      } else {
        card.innerHTML = key + ": " + value;
      }
      document.getElementById("display-area").appendChild(card);
      
      if (typeof value == 'object') {
        createJSONUI(value);
      }
    });
  }
}

function createCSVUI(csv) {
  let lines = csv.split('\n');
  let headerItems = lines[0].split(',');
  let table = document.createElement("table");
  let header = document.createElement("tr");

  // create header from first line
  headerItems.forEach(item => {
    let headerItem = document.createElement("th");
    headerItem.innerHTML = item;
    header.appendChild(headerItem);
  });
  table.appendChild(header);

  // create rows for each item
  lines.shift();
  lines.forEach(line => {
    let lineItems = line.split(',');
    let row = document.createElement("tr");

    // create row items for each value
    lineItems.forEach(item => {
      let rowItem = document.createElement("td");
      rowItem.innerHTML = item;
      row.appendChild(rowItem);
    });

    table.appendChild(row);
  });

  document.getElementById("display-area").appendChild(table);
}