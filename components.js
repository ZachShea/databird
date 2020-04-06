class Components {
  static Button(type, title, onclick) {
    let element = document.createElement("button");
    element.classList.add("mdc-button");
    element.classList.add(type);
    element.innerHTML = `
      <div class="mdc-button__ripple"></div>
      <span class="mdc-button__label">${title}</span>
    `;
    element.onclick = onclick;
    return element;
  }

  static Dialog(title, content, actions) {
    let element = document.createElement("div");
    element.classList.add("mdc-dialog");
    element.classList.add("mdc-dialog--open");
    element.innerHTML = `
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="my-dialog-title"
          aria-describedby="my-dialog-content">

          <h2 class="mdc-dialog__title">${title}</h2>
          <div class="mdc-dialog__content">${content}</div>
          <footer id="footer" class="mdc-dialog__actions"></footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    `;

    let footer = element.querySelector("#footer");
    actions.forEach(action => {
      footer.appendChild(action);
    });
    return element;
  }

  static DialogAction(title, onclick) {
    return this.Button("mdc-dialog__button", title, onclick);
  }

  static Table(headers, matrix) {
    let element = document.createElement("div");
    element.classList.add("mdc-data-table");
    element.style.marginBottom = "16px";
    element.innerHTML = `
      <table class="mdc-data-table__table">
        <thead><tr id="header" class="mdc-data-table__header-row"></tr></thead>
        <tbody id="body" class="mdc-data-table__content"></tbody>
      </table>
    `;

    // build headers
    let html = "";
    headers.forEach(header => {
      html += `<th class="mdc-data-table__header-cell" role="columnheader" scope="col">${header}</th>`;
    });
    element.querySelector("#header").innerHTML = html

    // build rows
    matrix.forEach(row => {
      let tr = document.createElement("tr");
      tr.classList.add("mdc-data-table__row");
      row.forEach(value => {
        let td = document.createElement("td");
        td.classList.add("mdc-data-table__cell");
        if (typeof value == 'object') td.appendChild(value);
        else td.innerHTML = value;
        tr.appendChild(td);
      });
      element.querySelector("#body").appendChild(tr);
    });
    return element;
  }

  static Card(title, subtitle) {
    let element = document.createElement("div");
    element.classList.add("mdc-card");
    element.style.width = "256px";
    element.style.marginBottom = "16px";
    element.innerHTML = `
      <div class="mdc-card__primary-action" tabindex="0">
        <div style="padding: 16px;">
          <h2 style="margin: 0;" class="mdc-typography mdc-typography--headline6">${title}</h2>
          <h3 style="margin: 0; color: var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,.54));" class="mdc-typography mdc-typography--subtitle2">${subtitle}</h3>
        </div>
      </div>
    `
    return element;
  }

  static Headline(text) {
    let element = document.createElement("h2");
    element.classList.add("mdc-typography");
    element.classList.add("mdc-typography--headline6");
    element.style.margin = "0";
    element.innerHTML = text
    return element;
  }

  static DrawerItem(text, id, onclick) {
    let element = document.createElement("a");
    element.classList.add("mdc-list-item");
    element.onclick = onclick
    element.id = id;
    element.innerHTML = `<span class="mdc-list-item__text">${text}</span>`;
    return element;
  }
}

export default Components;