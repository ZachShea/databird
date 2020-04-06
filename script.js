import Components from './components.js'

let currentDialog;

window.addFeature = () => {
  currentDialog = Components.Dialog(
    "New Feature", `
      <label class="mdc-text-field">
        <div class="mdc-text-field__ripple"></div>
        <input id="feature-title-field" class="mdc-text-field__input" type="text" aria-labelledby="feature-title-field">
        <span class="mdc-floating-label">Feature Title</span>
        <div class="mdc-line-ripple"></div>
      </label>
      <label class="mdc-text-field mdc-text-field--textarea">
        <textarea id="feature-js-field" class="mdc-text-field__input" aria-labelledby="feature-js-field" rows="8" cols="40"></textarea>
        <div class="mdc-notched-outline">
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            <label class="mdc-floating-label">Feature JavaScript</label>
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      </label>
    `, [
      Components.DialogAction("Cancel", closeDialog),
      Components.DialogAction("Test", null),
      Components.DialogAction("Save", saveFeature)
    ]
  );
  document.body.appendChild(currentDialog);
}

function closeDialog() {
  currentDialog.parentNode.removeChild(currentDialog);
}

function saveFeature() {
  let title = document.getElementById("feature-title-field").value;
  let js = document.getElementById("feature-js-field").value;

  document.getElementById("features-list").appendChild(
    Components.Button(null, title, () => { eval(js) })
  );

  closeDialog();
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
    let matrix = [];
    let row = 0;

    // create rows for each item
    json.forEach(element => {
      matrix.push([]);

      // create row items for each value
      keys.forEach(key => {
        let value = element[key];
        if (typeof value == 'object') {
          matrix[row].push(
            Components.Button(null, "Open", () => { displayJSON(value); })
          );
        } 
        else {
          matrix[row].push(value);
        }
      });

      row++;
    });

    // display table
    document.getElementById("display-area").appendChild(
      Components.Table(keys, matrix)
    );
  }

  // if object
  else {
    Object.keys(json).forEach(key => {
      let value = json[key];

      // display card or headline
      document.getElementById("display-area").appendChild(
        typeof value == 'object' ? Components.Headline(key) : Components.Card(value, key)
      );
      
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