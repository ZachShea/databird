import Components from './components.js'

//////////////
// UI LOGIC //
//////////////

let currentDialog, currentFeatureID;

window.onload = () => {
  // load features
  Object.keys(localStorage).forEach(key => {
    let feature = JSON.parse(localStorage.getItem(key));
    addDrawerItem(key, feature.title, feature.js);
  });
}

window.addFeature = () => {
  currentDialog = Components.Dialog(
    "Create Feature", `
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
      // Components.DialogAction("Test", null),
      Components.DialogAction("Save", saveFeature)
    ]
  );
  document.body.appendChild(currentDialog);
}

function removeFromDOM(element) {
  if (element == null) return;
  element.parentNode.removeChild(element);
}

function closeDialog() {
  removeFromDOM(currentDialog);
}

function saveFeature() {
  let title = document.getElementById("feature-title-field").value;
  let js = document.getElementById("feature-js-field").value;
  
  // make ID
  let id;
  let lastDrawerItem = document.getElementById("features-list").lastChild;
  if (lastDrawerItem == null) {
    id = "feature-1";
  } else {
    id = "feature-" + (parseInt(lastDrawerItem.id.split("-")[1]) + 1);
  }

  // save
  localStorage.setItem(id, JSON.stringify({ "title" : title, "js" : js }));
  addDrawerItem(id, title, js);

  closeDialog();
}

function addDrawerItem(id, title, js) {
  document.getElementById("features-list").appendChild(
    Components.DrawerItem(id, title, () => { 
      selectDrawerItem(id, title);
      eval(js);
    })
  );
}

function selectDrawerItem(id, title) {
  let activated = "mdc-list-item--activated";
  
  // deselect all
  document.getElementById("features-list").childNodes.forEach(drawerItem => {
    drawerItem.classList.remove(activated);
  });

  // select new item
  document.getElementById(id).classList.add(activated);
  document.getElementById("current-feature-title").innerHTML = title;
  
  // draw feature button
  let deleteButtonID = "delete-button";
  removeFromDOM(document.getElementById(deleteButtonID));
  let deleteButton = Components.Button(null, "Delete Feature", deleteFeature);
  deleteButton.id = deleteButtonID;
  document.getElementById("current-feature-buttons").appendChild(deleteButton);

  currentFeatureID = id;
}

function deleteFeature() {
  localStorage.removeItem(currentFeatureID);
  location.reload();
}


//////////////////////////////
// FEATURE JAVASCRIPT LOGIC //
//////////////////////////////

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
  // ARRAY //
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
        if (value == null) {
          matrix[row].push("null");
        }
        else if (typeof value == 'object') {
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

  // OBJECT //
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
  let matrix = [];
  let row = 0;

  lines.shift();
  lines.forEach(line => {
    matrix.push([]);

    let lineItems = line.split(',');
    lineItems.forEach(item => {
      matrix[row].push(item);
    });

    row++;
  });

  document.getElementById("display-area").appendChild(
    Components.Table(headerItems, matrix)
  );
}