// Setup Nav Elements

function open_close_drag_nav() {
  const nav = document.querySelector("nav");
  const toggleBtn = document.querySelector(".toggle-btn");
  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  function onDrag({ movementX, movementY }) {
    const navStyle = window.getComputedStyle(nav);
    const navTop = parseInt(navStyle.top);
    const navLeft = parseInt(navStyle.left);
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    let newTop = navTop + movementY;
    let newLeft = navLeft + movementX;
    if (newTop < 0) newTop = 0;
    else if (newTop > windowHeight - nav.offsetHeight)
      newTop = windowHeight - nav.offsetHeight;
    if (newLeft < 0) newLeft = 0;
    else if (newLeft > windowWidth - nav.offsetWidth)
      newLeft = windowWidth - nav.offsetWidth;
    nav.style.top = `${newTop}px`;
    nav.style.left = `${newLeft}px`;
  }
  nav.addEventListener("mousedown", () => {
    nav.addEventListener("mousemove", onDrag);
  });
  nav.addEventListener("mouseup", () => {
    nav.removeEventListener("mousemove", onDrag);
  });
  nav.addEventListener("mouseleave", () => {
    nav.removeEventListener("mousemove", onDrag);
  });
}

function open_close_span() {
  function closeAllSpans() {
    document.querySelectorAll(".nav-content .search-box, .nav-content .edit-box, .nav-content .rect-box")
      .forEach(function (box) {
        box.style.display = "none";
      });
  }

  function toggleSpan(span) {
    if (span.style.display === "flex") {
      span.style.display = "none";
    } else {
      closeAllSpans();
      span.style.display = "flex";
    }
  }

  document
    .querySelector(".fa-solid.fa-magnifying-glass")
    .parentNode.addEventListener("click", function () {
      toggleSpan(document.querySelector(".search-box"));
    });

  document
    .querySelector(".fa-regular.fa-pen-to-square")
    .parentNode.addEventListener("click", function () {
      toggleSpan(document.querySelector(".edit-box"));
    });

  document
    .querySelector(".fa-sharp.fa-solid.fa-b")
    .parentNode.addEventListener("click", function () {
      toggleSpan(document.querySelector(".rect-box"));
    });
}

// ace editor run button code
async function runCode() {
  const userCode = Powerboost.editor.getValue();
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  console.log = function (message) {
    outputDiv.innerHTML += message + "<br>";
  };

  try {
    eval(userCode);
  } catch (e) {
    console.log("Error: " + e.message);
  }
}

function boostlet_categories() {


  categories = Boostlet.categories;
  container_categories = document.querySelector(".categories"); // Create a container for all the rows

  // Function to create a button
  function createButton(text, className) {
    button = document.createElement('button');
    button.className = 'rect-btn ' + className;
    button.id = text;
    button.textContent = text;
    return button;
  }

  // Function to create a back arrow
  function createBackArrow(className) {
    const backArrow = document.createElement('div');
    backArrow.className = 'back-arrow ' + className;
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-arrow-left';
    backArrow.appendChild(icon);
    return backArrow;
  }


  // Loop through the categories array and create rows and buttons
  for (i = 0; i < categories.length; i += 2) {
    buttonRow = document.createElement('div');
    buttonRow.className = 'button-row';

    // Create the first button in the row
    button1 = createButton(categories[i], categories[i].replace(/\s+/g, ''));
    buttonRow.appendChild(button1);

    // Check if there is a second button in the row
    if (i + 1 < categories.length) {
      button2 = createButton(categories[i + 1], categories[i + 1].replace(/\s+/g, ''));
      buttonRow.appendChild(button2);
    }

    // Append the button row to the container
    container_categories.appendChild(buttonRow);
  }

  examples = Boostlet.examples;

  // Loop through the categories array and create rows and buttons
  categories.forEach(category => {
    container_examples = document.createElement('div');
    container_examples.className = 'rect-box ' + category.replace(/\s+/g, '');
    container_examples.style.display = 'none';

    // Create buttons for each example in the category
    exampleButtons = examples.get(category);
    if (exampleButtons) {
      for (i = 0; i < exampleButtons.length; i += 2) {
        exampleRow = document.createElement('div');
        exampleRow.className = 'button-row';

        exampleButton1 = createButton(exampleButtons[i], '');
        exampleRow.appendChild(exampleButton1);

        if (i + 1 < exampleButtons.length) {
          exampleButton2 = createButton(exampleButtons[i + 1], '');
          exampleRow.appendChild(exampleButton2);
        }

        container_examples.appendChild(exampleRow);
      }
    }

    // Create back arrow row
    backArrowRow = document.createElement('div');
    backArrowRow.className = 'button-row';
    backArrow = createBackArrow(category.replace(/\s+/g, ''));
    backArrowRow.appendChild(backArrow);
    container_examples.appendChild(backArrowRow);

    spanCategories = document.querySelector(".spanCategories");
    spanCategories.appendChild(container_examples);


  });
  // Function to handle button click
  function handleButtonClick(buttonClass, divToShowClass) {
    const categoriesDiv = document.querySelector('.rect-box.categories');
    const divToShow = document.querySelector(`.rect-box.${divToShowClass}`);
    const backArrow = divToShow.querySelector('.back-arrow');

    buttonClass.addEventListener('click', () => {
      toggleVisibility(categoriesDiv, false);
      toggleVisibility(divToShow, true);
    });

    backArrow.addEventListener('click', () => {
      toggleVisibility(categoriesDiv, true);
      toggleVisibility(divToShow, false);
    });
  }

  // Function to show or hide elements
  function toggleVisibility(element, show) {
    element.style.display = show ? 'block' : 'none'; // If show is true, the element will be displayed (visible). If show is false, the element will be hidden.
  }

  // Attach event listeners to buttons
  for (let i = 0; i < categories.length; i++) {
    const categoryClass = categories[i].replace(/\s+/g, '');
    handleButtonClick(document.querySelector(`.rect-btn.${categoryClass}`), categoryClass);
  }

}


open_close_drag_nav();
open_close_span();
boostlet_categories();



// **********SEARCH************

function showSuggestions(inputValue) {
  const suggestions = {
    s: [
      {
        name: "Sam",
        script: "https://boostlet.org/examples/segmentanything.js",
      },
      { name: "Sobel", script: "https://boostlet.org/examples/sobel.js" },
    ],
    i: [
      {
        name: "Image Captioning",
        script: "https://boostlet.org/examples/imageCaptioning.js",
      },
    ],
    t: [{ name: "Tracko", script: "https://boostlet.org/examples/trako.js" }],
    p: [{ name: "Plotly", script: "https://boostlet.org/examples/plotly.js" }],
  };

  const suggestionsContainer = document.getElementById("suggestionsContainer");
  suggestionsContainer.innerHTML = "";

  let matchedSuggestions = [];
  for (let key in suggestions) {
    if (key.startsWith(inputValue.toLowerCase())) {
      matchedSuggestions = matchedSuggestions.concat(suggestions[key]);
    }
  }

  matchedSuggestions.forEach(function (suggestion) {
    const suggestionElement = document.createElement("div");
    suggestionElement.classList.add("suggestion-item");
    suggestionElement.textContent = suggestion.name;
    suggestionElement.onclick = function () {
      document.getElementById("searchInput").value = suggestion.name;
      suggestionsContainer.innerHTML = "";
      loadScript(suggestion.script); // Load and execute the script
    };
    suggestionsContainer.appendChild(suggestionElement);
  });

  suggestionsContainer.style.display =
    matchedSuggestions.length > 0 ? "block" : "none";
}

document.getElementById("searchInput").addEventListener("input", function (e) {
  showSuggestions(e.target.value);
});

// boostlet functionality on examples -- for loop
var scriptsToLoad = [
  {
    id: "Sobel",
    src: "https://boostlet.org/examples/sobel.js",
  },
  {
    id: "SAM",
    src: "https://boostlet.org/examples/segmentanything.js",
  },
  {
    id: "Plotly",
    src: "https://boostlet.org/examples/plotly.js",
  },
  {
    id: "ImageCaptioning",
    src: "https://boostlet.org/examples/imageCaptioning.js",
  },
  {
    id: "Trako",
    src: "https://boostlet.org/examples/trako.js",
  },
];

scriptsToLoad.forEach(function (scriptInfo) {
  document.getElementById(scriptInfo.id).addEventListener("click", function () {
    var script = document.createElement("script");
    script.src = scriptInfo.src;
    document.head.appendChild(script);
  });
});

function loadScript(scriptSrc) {
  var script = document.createElement("script");
  script.src = scriptSrc;
  script.onload = function () {
    applySobelFilter(); // Function defined in sobel.js that applies the Sobel filter
  };
  document.head.appendChild(script);
}

function loadExternalScript(scriptSrc, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = scriptSrc;

  script.onload = function () {
    console.log(scriptSrc + " has been loaded successfully.");
    if (callback) callback();
  };

  script.onerror = function () {
    console.error("Failed to load script: " + scriptSrc);
  };

  document.head.appendChild(script);
}

const functionalityScripts = {
  Sobel: "https://boostlet.org/examples/sobel.js",
  Sam: "https://boostlet.org/examples/segmentanything.js",
  "Image Captioning": "https://boostlet.org/examples/imageCaptioning.js",
  Plotly: "https://boostlet.org/examples/plotly.js",
};

// search suggestion working
function applySelectedFunctionality() {
  const selector = document.getElementById("functionalitySelector");
  const selectedFunctionality = selector.value;
  const scriptUrl = functionalityScripts[selectedFunctionality];
  if (scriptUrl) {
    loadExternalScript(scriptUrl, function () {
      console.log(selectedFunctionality + " functionality has been applied.");
    });
  } else {
    console.error("No script URL found for selected functionality.");
  }
}

