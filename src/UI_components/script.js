
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

