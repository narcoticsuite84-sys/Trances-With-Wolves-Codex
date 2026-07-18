(function () {
  "use strict";

  const D = window.CODEX_DATA;
  if (!D || !Array.isArray(D.settlements) || !Array.isArray(D.locations) || !Array.isArray(D.people)) {
    throw new Error("CODEX_DATA is missing or invalid.");
  }

  const homeView = document.getElementById("homeView");
  const contentView = document.getElementById("contentView");
  const searchView = document.getElementById("searchView");
  const contentBody = document.getElementById("contentBody");
  const breadcrumbs = document.getElementById("breadcrumbs");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const stack = [];

  const settlement = id => D.settlements.find(item => item.id === id);
  const location = id => D.locations.find(item => item.id === id);
  const person = id => D.people.find(item => item.id === id);

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function show(view) {
    [homeView, contentView, searchView].forEach(item => item.classList.remove("active"));
    view.classList.add("active");
    contentBody.scrollTop = 0;
  }

  function home() {
    stack.length = 0;
    show(homeView);
  }

  function push(view) {
    stack.push(view);
    render(view);
  }

  function back() {
    if (stack.length > 1) {
      stack.pop();
      render(stack[stack.length - 1]);
    } else {
      home();
    }
  }

  function tile(title, subtitle, onClick) {
    const button = document.createElement("button");
    button.className = "tile-button";
    button.type = "button";
    button.innerHTML = "<strong>" + escapeHtml(title) + "</strong>" +
      (subtitle ? "<span>" + escapeHtml(subtitle) + "</span>" : "");
    button.addEventListener("click", onClick);
    return button;
  }

  function art(src, name, portrait = false) {
    if (!src) {
      return '<div class="art-placeholder">Artwork lost to the Mists</div>';
    }
    return '<img class="entry-art' + (portrait ? ' portrait' : '') +
      '" src="' + escapeHtml(src) + '" alt="' + escapeHtml(name) + '">';
  }

  function personArt(entry) {
    if (Array.isArray(entry.images) && entry.images.length) {
      const first = entry.images[0];
      return '<div class="appearance-block">' +
        '<span class="appearance-label">Appearance</span>' +
        '<div id="appearanceControls" class="appearance-controls"></div>' +
        '</div>' +
        '<img id="appearanceImage" class="entry-art portrait" src="' +
        escapeHtml(first.file) + '" alt="' +
        escapeHtml(entry.name + " — " + first.label) + '">';
    }
    return art(entry.image, entry.name, true);
  }

  function bindAppearance(entry) {
    if (!Array.isArray(entry.images) || !entry.images.length) return;
    const controls = document.getElementById("appearanceControls");
    const image = document.getElementById("appearanceImage");

    entry.images.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "appearance-button" + (index === 0 ? " active" : "");
      button.textContent = option.label;
      button.addEventListener("click", () => {
        image.src = option.file;
        image.alt = entry.name + " — " + option.label;
        controls.querySelectorAll(".appearance-button").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
      });
      controls.appendChild(button);
    });
  }

  function influenceMarkup(value) {
    if (!value || (Array.isArray(value) && !value.length)) return "";

    const content = Array.isArray(value)
      ? '<ul>' + value.map(item => '<li>' + escapeHtml(item) + '</li>').join("") + '</ul>'
      : '<p>' + escapeHtml(value) + '</p>';

    return '<section class="entry-section influence-section">' +
      '<h2>Your Influence</h2>' +
      content +
      '</section>';
  }

  function specialSectionsMarkup(sections) {
    if (!Array.isArray(sections) || !sections.length) return "";

    return sections.map(section => {
      if (section.type === "story") {
        return '<section class="entry-section special-section story-section">' +
          '<h2>' + escapeHtml(section.heading || "Game of Stories") + '</h2>' +
          (section.title ? '<h3>' + escapeHtml(section.title) + '</h3>' : '') +
          '<div class="special-prose">' + escapeHtml(section.text).replaceAll("\n", "<br>") + '</div>' +
          '</section>';
      }

      if (section.type === "reading") {
        const results = (section.results || []).map(result =>
          '<div class="reading-result">' +
            '<p class="reading-introduction">“' + escapeHtml(result[0]) + '”</p>' +
            '<p class="reading-card">' + escapeHtml(result[1]) + '</p>' +
            '<p class="reading-prophecy">“' + escapeHtml(result[2]) + '”</p>' +
          '</div>'
        ).join("");

        return '<section class="entry-section special-section reading-section">' +
          '<h2>' + escapeHtml(section.heading || "Tarokka Reading") + '</h2>' +
          results +
          '</section>';
      }

      return "";
    }).join("");
  }

  function renderPlaces() {
    show(contentView);
    breadcrumbs.textContent = "Places";
    contentBody.innerHTML =
      '<section class="directory">' +
        '<h2>Places</h2>' +
        '<p>Settlements and landmarks known to the party.</p>' +
        '<div class="directory-list" id="placeList"></div>' +
      '</section>';

    const list = document.getElementById("placeList");
    D.settlements.forEach(entry => {
      const button = document.createElement("button");
      button.className = "directory-button";
      button.type = "button";
      button.innerHTML = "<strong>" + escapeHtml(entry.name) + "</strong>" +
        "<span>" + escapeHtml(entry.subtitle) + "</span>";
      button.addEventListener("click", () => push({ type: "settlement", id: entry.id }));
      list.appendChild(button);
    });
  }

  function renderSettlement(id) {
    const entry = settlement(id);
    if (!entry) return renderError("Place not found.");

    show(contentView);
    breadcrumbs.textContent = "Places › " + entry.name;
    contentBody.innerHTML =
      '<article class="entry-page">' +
        art(entry.image, entry.name) +
        '<div class="entry-copy">' +
          '<div class="entry-kicker">Place</div>' +
          '<h1>' + escapeHtml(entry.name) + '</h1>' +
          '<div class="entry-subtitle">' + escapeHtml(entry.subtitle) + '</div>' +
          '<p class="entry-overview">' + escapeHtml(entry.overview) + '</p>' +
          '<section class="entry-section">' +
            '<h2>Places of Interest</h2>' +
            '<div class="tile-grid" id="locations"></div>' +
          '</section>' +
          '<section class="entry-section">' +
            '<h2>Notable People</h2>' +
            '<div class="tile-grid" id="residents"></div>' +
          '</section>' +
          influenceMarkup(entry.influence) +
        '</div>' +
      '</article>';

    const locations = document.getElementById("locations");
    entry.locations.map(location).filter(Boolean).forEach(item => {
      locations.appendChild(tile(item.name, item.subtitle, () => push({ type: "location", id: item.id })));
    });

    const residents = document.getElementById("residents");
    entry.residents.map(person).filter(Boolean).forEach(item => {
      residents.appendChild(tile(item.name, item.subtitle, () => push({ type: "person", id: item.id })));
    });
  }

  function renderLocation(id) {
    const entry = location(id);
    if (!entry) return renderError("Location not found.");
    const parent = settlement(entry.settlementId);

    show(contentView);
    breadcrumbs.textContent = "Places › " + parent.name + " › " + entry.name;
    contentBody.innerHTML =
      '<article class="entry-page">' +
        art(entry.image, entry.name) +
        '<div class="entry-copy">' +
          '<div class="entry-kicker">Location</div>' +
          '<h1>' + escapeHtml(entry.name) + '</h1>' +
          '<div class="entry-subtitle">' + escapeHtml(entry.subtitle) + '</div>' +
          '<p class="entry-overview">' + escapeHtml(entry.overview) + '</p>' +
          '<section class="entry-section">' +
            '<h2>Known People</h2>' +
            '<div class="tile-grid" id="residents"></div>' +
          '</section>' +
          specialSectionsMarkup(entry.specialSections) +
          influenceMarkup(entry.influence) +
        '</div>' +
      '</article>';

    const residents = document.getElementById("residents");
    entry.residents.map(person).filter(Boolean).forEach(item => {
      residents.appendChild(tile(item.name, item.subtitle, () => push({ type: "person", id: item.id })));
    });
  }

  function renderPerson(id) {
    const entry = person(id);
    if (!entry) return renderError("Person not found.");
    const parent = settlement(entry.settlementId);
    const knownLocation = entry.locationId ? location(entry.locationId) : null;

    show(contentView);
    breadcrumbs.textContent = "Places › " + parent.name +
      (knownLocation ? " › " + knownLocation.name : "") + " › " + entry.name;

    contentBody.innerHTML =
      '<article class="entry-page">' +
        personArt(entry) +
        '<div class="entry-copy">' +
          '<div class="entry-kicker">Person</div>' +
          '<h1>' + escapeHtml(entry.name) + '</h1>' +
          '<div class="entry-subtitle">' + escapeHtml(entry.subtitle) + '</div>' +
          (entry.quote ? '<blockquote class="entry-quote">“' + escapeHtml(entry.quote) + '”</blockquote>' : '') +
          '<p class="entry-overview">' + escapeHtml(entry.overview) + '</p>' +
          specialSectionsMarkup(entry.specialSections) +
          '<section class="entry-section">' +
            '<h2>Known Location</h2>' +
            '<div class="tile-grid" id="knownLocation"></div>' +
          '</section>' +
          ((entry.associates || []).length
            ? '<section class="entry-section"><h2>Known Associates</h2><div class="tile-grid" id="associates"></div></section>'
            : '') +
          influenceMarkup(entry.influence) +
        '</div>' +
      '</article>';

    bindAppearance(entry);

    const knownLocationContainer = document.getElementById("knownLocation");
    if (knownLocation) {
      knownLocationContainer.appendChild(
        tile(knownLocation.name, parent.name, () => push({ type: "location", id: knownLocation.id }))
      );
    } else {
      knownLocationContainer.appendChild(
        tile(parent.name, parent.subtitle, () => push({ type: "settlement", id: parent.id }))
      );
    }

    const associates = document.getElementById("associates");
    if (associates) {
      entry.associates.map(person).filter(Boolean).forEach(item => {
        associates.appendChild(tile(item.name, item.subtitle, () => push({ type: "person", id: item.id })));
      });
    }
  }

  function renderError(message) {
    show(contentView);
    breadcrumbs.textContent = "Codex";
    contentBody.innerHTML =
      '<div class="empty-state"><div><h2>Something went wrong</h2><p>' +
      escapeHtml(message) + '</p></div></div>';
  }

  function empty(title) {
    show(contentView);
    breadcrumbs.textContent = title;
    contentBody.innerHTML =
      '<div class="empty-state"><div><h2>' + escapeHtml(title) +
      '</h2><p>Nothing has been recorded here yet.</p></div></div>';
  }

  function render(view) {
    if (view.type === "places") renderPlaces();
    else if (view.type === "settlement") renderSettlement(view.id);
    else if (view.type === "location") renderLocation(view.id);
    else if (view.type === "person") renderPerson(view.id);
    else if (view.type === "empty") empty(view.title);
  }

  function openSearch() {
    show(searchView);
    searchInput.value = "";
    searchResults.innerHTML = "";
    setTimeout(() => searchInput.focus(), 50);
  }

  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";
    if (!query) return;

    const matches = [];
    D.settlements.forEach(item => {
      if ((item.name + " " + item.subtitle + " " + item.overview).toLowerCase().includes(query)) {
        matches.push({ type: "settlement", item });
      }
    });
    D.locations.forEach(item => {
      if ((item.name + " " + item.subtitle + " " + item.overview).toLowerCase().includes(query)) {
        matches.push({ type: "location", item });
      }
    });
    D.people.forEach(item => {
      if ((item.name + " " + item.subtitle + " " + item.overview).toLowerCase().includes(query)) {
        matches.push({ type: "person", item });
      }
    });

    matches.forEach(match => {
      const button = document.createElement("button");
      button.className = "directory-button";
      button.type = "button";
      button.innerHTML = "<strong>" + escapeHtml(match.item.name) + "</strong>" +
        "<span>" + escapeHtml(match.type + " · " + match.item.subtitle) + "</span>";
      button.addEventListener("click", () => {
        stack.length = 0;
        stack.push({ type: "places" });
        stack.push({ type: match.type, id: match.item.id });
        render(stack[stack.length - 1]);
      });
      searchResults.appendChild(button);
    });
  }

  function action(name) {
    if (name === "places") {
      stack.length = 0;
      stack.push({ type: "places" });
      renderPlaces();
    } else if (name === "factions") {
      stack.length = 0;
      stack.push({ type: "empty", title: "Factions" });
      empty("Factions");
    } else if (name === "history") {
      stack.length = 0;
      stack.push({ type: "empty", title: "History" });
      empty("History");
    } else if (name === "search") {
      openSearch();
    }
  }

  document.getElementById("homeButton").addEventListener("click", home);
  document.getElementById("placesButton").addEventListener("click", () => action("places"));
  document.getElementById("factionsButton").addEventListener("click", () => action("factions"));
  document.getElementById("historyButton").addEventListener("click", () => action("history"));
  document.getElementById("searchButton").addEventListener("click", () => action("search"));
  document.getElementById("backButton").addEventListener("click", back);
  document.getElementById("closeButton").addEventListener("click", home);
  document.getElementById("closeSearchButton").addEventListener("click", home);
  searchInput.addEventListener("input", performSearch);
  document.querySelectorAll("[data-mobile]").forEach(button => {
    button.addEventListener("click", () => action(button.dataset.mobile));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") home();
  });
})();