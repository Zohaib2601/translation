const dropdowns = document.querySelectorAll(".dropdown-container"),
  inputLanguageDropdown = document.querySelector("#input-language"),
  outputLanguageDropdown = document.querySelector("#output-language");

function populateDropdown(dropdown, options) {
  dropdown.querySelector("ul").innerHTML = "";
  options.forEach((option) => {
    const li = document.createElement("li");
    const title = option.n1;
    li.innerHTML = title;
    li.dataset.value = option.c1;
    li.classList.add("option");
    dropdown.querySelector("ul").appendChild(li);
  });
}

populateDropdown(inputLanguageDropdown, countries);
populateDropdown(outputLanguageDropdown, countries);

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("active");
  });

  dropdown.querySelectorAll(".option").forEach((item) => {
    item.addEventListener("click", (e) => {
      //remove active class from current dropdowns
      dropdown.querySelectorAll(".option").forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
      const selected = dropdown.querySelector(".selected");
      selected.innerHTML = item.innerHTML;
      selected.dataset.value = item.dataset.value;
      // translate(); //CHECK : REMOVE AND ADD BUTTON
    });
  });
});
document.addEventListener("click", (e) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

const swapBtn = document.querySelector(".swap-position"),
  inputLanguage = inputLanguageDropdown.querySelector(".selected"),
  outputLanguage = outputLanguageDropdown.querySelector(".selected"),
  inputTextElem = document.querySelector("#input-text"),
  outputTextElem = document.querySelector("#output-text");

swapBtn.addEventListener("click", (e) => {
  const temp = inputLanguage.innerHTML;
  inputLanguage.innerHTML = outputLanguage.innerHTML;
  outputLanguage.innerHTML = temp;

  const tempValue = inputLanguage.dataset.value;
  inputLanguage.dataset.value = outputLanguage.dataset.value;
  outputLanguage.dataset.value = tempValue;

  //swap text
  const tempInputText = inputTextElem.value;
  inputTextElem.value = outputTextElem.value;
  outputTextElem.value = tempInputText;

  // translate(); //REMOVE AND ADD BUTTON
});

function translate() {
  const inputText = inputTextElem.value;
  const inputLanguage =
    inputLanguageDropdown.querySelector(".selected").dataset.value;
  const outputLanguage =
    outputLanguageDropdown.querySelector(".selected").dataset.value;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
    inputText
  )}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      outputTextElem.value = json[0].map((item) => item[0]).join("");
    })
    .catch((error) => {
      console.log(error);
    });
}
inputTextElem.addEventListener("input", (e) => {
  //limit input to 5000 characters
  if (inputTextElem.value.length > 5000) {
    inputTextElem.value = inputTextElem.value.slice(0, 5000);
  }
  // translate(); //REMOVE AND ADD BUTTON
});

const uploadDocument = document.querySelector("#upload-document"),
  uploadTitle = document.querySelector("#upload-title");

uploadDocument.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (
    file.type === "application/pdf" ||
    file.type === "text/plain" ||
    file.type === "application/msword" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    uploadTitle.innerHTML = file.name;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      inputTextElem.value = e.target.result;
      // translate(); //REMOVE AND ADD BUTTON
    };
  } else {
    alert("Please upload a valid file");
  }
});

const downloadBtn = document.querySelector("#download-btn");

downloadBtn.addEventListener("click", (e) => {
  const outputText = outputTextElem.value;
  const outputLanguage =
    outputLanguageDropdown.querySelector(".selected").dataset.value;
  if (outputText) {
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `translated-to-${outputLanguage}.txt`;
    a.href = url;
    a.click();
  }
});

const inputChars = document.querySelector("#input-chars");

inputTextElem.addEventListener("input", (e) => {
  inputChars.innerHTML = inputTextElem.value.length;
});

// let items = document.querySelectorAll("#output-language li");

// for(var i=0; i<items.length; i++){
//   items[i].onclick = function(){
//     document.getElementById("")
//   }
// }

const toText = document.querySelector(".to-text"),
      selected = document.querySelectorAll(".selected"),
      speech = document.querySelector(".speech-output");
let code = "";
      function speak(){
        
        for(var i=0; i<countries.length; i++){
          if(selected[1].innerHTML === countries[i].n1){
            code = countries[i].c1;
          }
        }
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = code;
        speechSynthesis.speak(utterance)
        
        console.log(selected[1].innerHTML);
      }

      // selected[1].innerHTML

//SPEECH TO TEXT

// runSpeechRecog = () => {
//             document.getElementById("output").innerHTML = "Loading text...";
//             var action = document.getElementById('input-text');

// let recognization = new webkitSpeechRecognition();
// recognization.onstart = () => {
//    action.innerHTML = "Listening...";
//    }
// }
// recognization.onresult = (e) => {
//    var transcript = e.results[0][0].transcript;
//    var confidence = e.results[0][0].confidence;
//    action.innerHTML = transcript;
//    action.classList.remove("hide")
//    action.innerHTML = "";

// recognization.start();
// }

const output = document.getElementById("output-text");
runSpeechRecog = () => {
            document.getElementById("output-text").innerHTML = "Loading text...";
            let output = document.getElementById("output-text");
            let action = document.getElementById("input-text");
            let recognization = new webkitSpeechRecognition();
            
            // Get currently selected language code

    // let code = "";
    for (let i = 0; i < countries.length; i++) {
      if (selected[0].innerHTML === countries[i].n1) {
        code = countries[i].c1;
        break; // Once found, exit the loop
      }
    }
    recognization.lang = code;
    
recognization.onstart = () => {
   action.innerHTML = "Listening...";
   }

recognization.onresult = (e) => {

   var transcript = e.results[0][0].transcript;
   action.innerHTML = transcript;
   action.classList.remove("hide")
   output.innerHTML = transcript;

  }
  recognization.onerror = (e) => {
    console.log("Error occurred in recognition: " + e.error);
  };
  recognization.onend = () => {
    console.log("Speech recognition service disconnected");
  };

  recognization.start();
}


// Click on start to call translate
const startBtn = document.querySelector('.startBtn');
startBtn.addEventListener("click", ()=> {
   console.log("Started");
    translate();
 });

//RESETTING THE PAGE ON CLICKING THE RELOAD BUTTON

const reload = document.querySelector('.fa-rotate-right');
reload.addEventListener("click", () => {
  location.reload(true);

});
