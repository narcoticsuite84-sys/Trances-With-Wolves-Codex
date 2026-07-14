(function () {
  "use strict";

  const data = window.CODEX_DATA;
  if (!data) throw new Error("Codex data failed to load.");

  const homeView = document.getElementById("homeView");
  const contentView = document.getElementById("contentView");
  const searchView = document.getElementById("searchView");
  const contentBody = document.getElementById("contentBody");
  const breadcrumbs = document.getElementById("breadcrumbs");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const stack = [];

  function show(view) {
    [homeView, contentView, searchView].forEach((item) => item.classList.remove("active"));
    view.classList.add("active");
  }

  function goHome() {
    stack.length = 0;
    show(homeView);
  }

  const getSettlement = (id) => data.settlements.find((item) => item.id === id);
  const getLocation = (id) => data.locations.find((item) => item.id === id);
  const getPerson = (id) => data.people.find((item) => item.id === id);

  function createTile(title, subtitle, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tile-button";
    button.innerHTML = `<strong>${title}</strong>${subtitle ? `<span>${subtitle}</span>` : ""}`;
    button.addEventListener("click", onClick);
    return button;
  }

  function artwork(src, alt, portrait = false) {
    if (!src) return '<div class="art-placeholder">Artwork not yet added</div>';
    return `<img class="entry-art${portrait ? " portrait" : ""}" src="${src}" alt="${alt}">`;
  }

  function push(view) {
    stack.push(view);
    render(view);
  }

  function goBack() {
    if (stack.length > 1) {
      stack.pop();
      render(stack[stack.length - 1]);
    } else {
      goHome();
    }
  }

  function renderPlaces() {
    show(contentView);
    breadcrumbs.textContent = "Places";
    contentBody.innerHTML = `
      <section class="directory">
        <h2>Places</h2>
        <p>Settlements and landmarks known to the party.</p>
        <div class="directory-list" id="placeList"></div>
      </section>`;

    const list = document.getElementById("placeList");
    data.settlements.forEach((settlement) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "directory-button";
      button.innerHTML = `<strong>${settlement.name}</strong><span>${settlement.subtitle}</span>`;
      button.addEventListener("click", () => push({ type: "settlement", id: settlement.id }));
      list.appendChild(button);
    });
  }

  function renderSettlement(id) {
    const settlement = getSettlement(id);
    if (!settlement) return;
    show(contentView);
    breadcrumbs.textContent = `Places › ${settlement.name}`;
    contentBody.innerHTML = `
      <article class="entry-page">
        ${artwork(settlement.image, settlement.name)}
        <div class="entry-copy">
          <div class="entry-kicker">Settlement</div>
          <h1>${settlement.name}</h1>
          <div class="entry-subtitle">${settlement.subtitle}</div>
          <p class="entry-overview">${settlement.overview}</p>
          <section class="entry-section">
            <h2>Known Locations</h2>
            <div class="tile-grid" id="locationTiles"></div>
          </section>
          <section class="entry-section">
            <h2>Known Residents</h2>
            <div class="tile-grid" id="residentTiles"></div>
          </section>
        </div>
      </article>`;

    const locationTiles = document.getElementById("locationTiles");
    settlement.locations.map(getLocation).filter(Boolean).forEach((location) => {
      locationTiles.appendChild(createTile(location.name, location.subtitle, () => push({ type: "location", id: location.id })));
    });

    const residentTiles = document.getElementById("residentTiles");
    settlement.residents.map(getPerson).filter(Boolean).forEach((person) => {
      residentTiles.appendChild(createTile(person.name, person.subtitle, () => push({ type: "person", id: person.id })));
    });
  }

  function renderLocation(id) {
    const location = getLocation(id);
    if (!location) return;
    const settlement = getSettlement(location.settlementId);
    show(contentView);
    breadcrumbs.textContent = `Places › ${settlement.name} › ${location.name}`;
    contentBody.innerHTML = `
      <article class="entry-page">
        ${artwork(location.image, location.name)}
        <div class="entry-copy">
          <div class="entry-kicker">Location</div>
          <h1>${location.name}</h1>
          <div class="entry-subtitle">${location.subtitle}</div>
          <p class="entry-overview">${location.overview}</p>
          <section class="entry-section">
            <h2>Known Residents</h2>
            <div class="tile-grid" id="residentTiles"></div>
          </section>
        </div>
      </article>`;

    const residentTiles = document.getElementById("residentTiles");
    location.residents.map(getPerson).filter(Boolean).forEach((person) => {
      residentTiles.appendChild(createTile(person.name, person.subtitle, () => push({ type: "person", id: person.id })));
    });
  }

  function renderPerson(id) {
    const person = getPerson(id);
    if (!person) return;
    const settlement = getSettlement(person.settlementId);
    const location = getLocation(person.locationId);
    show(contentView);
    breadcrumbs.textContent = `Places › ${settlement.name}${location ? ` › ${location.name}` : ""} › ${person.name}`;
    contentBody.innerHTML = `
      <article class="entry-page">
        ${artwork(person.image, person.name, true)}
        <div class="entry-copy">
          <div class="entry-kicker">Person</div>
          <h1>${person.name}</h1>
          <div class="entry-subtitle">${person.subtitle}</div>
          ${person.quote ? `<blockquote class="entry-quote">“${person.quote}”</blockquote>` : ""}
          <p class="entry-overview">${person.overview}</p>
          <section class="entry-section">
            <h2>Known Location</h2>
            <div class="tile-grid" id="knownLocation"></div>
          </section>
          ${person.associates.length ? `
          <section class="entry-section">
            <h2>Known Associates</h2>
            <div class="tile-grid" id="associateTiles"></div>
          </section>` : ""}
        </div>
      </article>`;

    const knownLocation = document.getElementById("knownLocation");
    if (location) {
      knownLocation.appendChild(createTile(location.name, settlement.name, () => push({ type: "location", id: location.id })));
    } else {
      knownLocation.appendChild(createTile(settlement.name, settlement.subtitle, () => push({ type: "settlement", id: settlement.id })));
    }

    const associateTiles = document.getElementById("associateTiles");
    if (associateTiles) {
      person.associates.map(getPerson).filter(Boolean).forEach((associate) => {
        associateTiles.appendChild(createTile(associate.name, associate.subtitle, () => push({ type: "person", id: associate.id })));
      });
    }
  }

  function renderEmpty(title) {
    show(contentView);
    breadcrumbs.textContent = title;
    contentBody.innerHTML = `<div class="empty-state"><div><h2>${title}</h2><p>Nothing has been recorded here yet.</p></div></div>`;
  }

  function render(view) {
    if (view.type === "places") renderPlaces();
    else if (view.type === "settlement") renderSettlement(view.id);
    else if (view.type === "location") renderLocation(view.id);
    else if (view.type === "person") renderPerson(view.id);
    else if (view.type === "empty") renderEmpty(view.title);
  }

  function openSection(section) {
    if (section === "places") {
      stack.length = 0;
      stack.push({ type: "places" });
      renderPlaces();
    } else if (section === "factions") {
      stack.length = 0;
      stack.push({ type: "empty", title: "Factions" });
      renderEmpty("Factions");
    } else if (section === "history") {
      stack.length = 0;
      stack.push({ type: "empty", title: "History" });
      renderEmpty("History");
    } else if (section === "search") {
      show(searchView);
      searchInput.value = "";
      searchResults.innerHTML = "";
      window.setTimeout(() => searchInput.focus(), 50);
    }
  }

  function updateSearch() {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";
    if (!query) return;

    const results = [];
    data.settlements.forEach((item) => {
      if (`${item.name} ${item.subtitle} ${item.overview}`.toLowerCase().includes(query)) results.push({ type: "settlement", item });
    });
    data.locations.forEach((item) => {
      if (`${item.name} ${item.subtitle} ${item.overview}`.toLowerCase().includes(query)) results.push({ type: "location", item });
    });
    data.people.forEach((item) => {
      if (`${item.name} ${item.subtitle} ${item.overview}`.toLowerCase().includes(query)) results.push({ type: "person", item });
    });

    results.forEach((result) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "directory-button";
      button.innerHTML = `<strong>${result.item.name}</strong><span>${result.type} · ${result.item.subtitle}</span>`;
      button.addEventListener("click", () => {
        stack.length = 0;
        stack.push({ type: "places" }, { type: result.type, id: result.item.id });
        render(stack[stack.length - 1]);
      });
      searchResults.appendChild(button);
    });
  }

  document.getElementById("homeButton").addEventListener("click", goHome);
  document.getElementById("placesButton").addEventListener("click", () => openSection("places"));
  document.getElementById("factionsButton").addEventListener("click", () => openSection("factions"));
  document.getElementById("historyButton").addEventListener("click", () => openSection("history"));
  document.getElementById("searchButton").addEventListener("click", () => openSection("search"));
  document.getElementById("backButton").addEventListener("click", goBack);
  document.getElementById("closeButton").addEventListener("click", goHome);
  document.getElementById("closeSearchButton").addEventListener("click", goHome);
  searchInput.addEventListener("input", updateSearch);
  document.querySelectorAll("[data-mobile]").forEach((button) => {
    button.addEventListener("click", () => openSection(button.dataset.mobile));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") goHome();
  });
})();
