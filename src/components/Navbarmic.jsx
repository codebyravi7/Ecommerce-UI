import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbarmic() {
  const [loading, setLoading] = useState(false);
  const [hearing, setHearing] = useState(false);
  const navigate = useNavigate();

  const handleMic = (e) => {
    e.preventDefault();
    console.log("mic activated: ", hearing);
    setHearing(true);

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = true; // Changed to true to get partial results
    recognition.continuous = true; // Enable continuous recognition
    recognition.maxAlternatives = 1;

    let inactivityTimeoutId;
    let finalTranscript = "";

    const startInactivityTimeout = () => {
      clearTimeout(inactivityTimeoutId);
      inactivityTimeoutId = setTimeout(() => {
        recognition.stop();
        setHearing(false);
        setLoading(false);
        console.log("No speech detected for 3 seconds. Recognition stopped.");
        processFinalTranscript();
      }, 3000);
    };

    const processFinalTranscript = async () => {
      if (finalTranscript.trim() !== "") {
        console.log("Final transcript:", finalTranscript);
        const keywords = await fallbackKeywords(finalTranscript);
        console.log("Extracted Keywords:", keywords);
        navigate(`/product/search`, {
          state: { data: keywords },
        });
      }
      finalTranscript = ""; // Reset for next use
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      console.log("Interim transcript:", interimTranscript);
      startInactivityTimeout(); // Restart timeout on new speech
    };

    recognition.onerror = (event) => {
      clearTimeout(inactivityTimeoutId);
      console.error("Error occurred in recognition:", event.error);
      setHearing(false);
      setLoading(false);
    };

    recognition.onend = () => {
      clearTimeout(inactivityTimeoutId);
      setHearing(false);
      setLoading(false);
      console.log("Recognition ended.");
    };

    startInactivityTimeout();
    recognition.start();
  };

  // const handleMic = (e) => {
  //   e.preventDefault();
  //   console.log("mic hehe: ", hearing);

  //   // If you want the button to be disabled while listening
  //   setHearing(true);

  //   const recognition = new (window.SpeechRecognition ||
  //     window.webkitSpeechRecognition)();
  //   recognition.lang = "en-US";
  //   recognition.interimResults = false;
  //   recognition.maxAlternatives = 1;

  //   let timeoutId;

  //   const startTimeout = () => {
  //     timeoutId = setTimeout(() => {
  //       recognition.stop(); // Stop recognition if no speech is detected within the timeout period
  //       setHearing(false); // Enable the button
  //       setLoading(false);
  //       console.log("No speech detected. Recognition stopped.");
  //     }, 10000); // Set timeout period (e.g., 10 seconds)
  //   };

  //   recognition.onresult = async (event) => {
  //     clearTimeout(timeoutId); // Clear the timeout if speech is detected
  //     const voiceCommand = event.results[0][0].transcript;
  //     setHearing(false); // Enable the button
  //     setLoading(true);
  //     console.log("Voice command:", voiceCommand);
  //     const keywords = await fallbackKeywords(voiceCommand);
  //     console.log("Extracted Keywords:", keywords);
  //     navigate(`/product/search`, {
  //       state: { data: keywords },
  //     });

  //     setLoading(false);
  //     // Handle the keywords as needed
  //   };

  //  recognition.onerror = (event) => {
  //    clearTimeout(timeoutId); // Clear the timeout on error
  //    setHearing(false); // Ensure the button is enabled
  //    setLoading(false); // Stop loading indicator

  //    // Handle specific errors if needed
  //    if (event.error === "aborted") {
  //      console.warn(
  //        "Speech recognition was aborted by the user or programmatically."
  //      );
  //    } else {
  //      console.error("Error occurred in recognition:", event.error);
  //    }
  //  };

  //   recognition.onend = () => {
  //     clearTimeout(timeoutId); // Clear the timeout when recognition ends
  //     setHearing(false); // Enable the button
  //     setLoading(false);
  //     console.log("Recognition ended.");
  //   };

  //   startTimeout(); // Start the timeout when recognition starts
  //   recognition.start();
  // };

  function fallbackKeywords(query) {
    const words = query.split(/\s+/);
    const nouns = words.filter((word) => isNoun(word)); // Apply simple noun filter
    return nouns.slice(0, 5); // Return the first 5 nouns
  }
  function isNoun(word) {
    // Simple heuristic: check if the word starts with a capital letter or is a common noun
    // This is a very basic check and might not be accurate for all cases
    const commonNouns = [
      "apple",
      "banana",
      "car",
      "dog",
      "cat",
      "book",
      "pen",
      "phone",
      "computer",
      "table",
      "chair",
      "shoe",
      "shirt",
      "hat",
      "bag",
      "desk",
      "window",
      "door",
      "bottle",
      "cup",
      "plate",
      "fork",
      "spoon",
      "knife",
      "watch",
      "camera",
      "mouse",
      "keyboard",
      "screen",
      "lamp",
      "fan",
      "television",
      "radio",
      "speaker",
      "couch",
      "bed",
      "pillow",
      "blanket",
      "lipstick",
      "foundation",
      "concealer",
      "mascara",
      "eyeshadow",
      "blush",
      "bronzer",
      "highlighter",
      "powder",
      "primer",
      "serum",
      "moisturizer",
      "cleanser",
      "toner",
      "scrub",
      "mask",
      "lip gloss",
      "nail polish",
      "eyeliner",
      "eye cream",
      "makeup remover",
      "sunscreen",
      "cleanser",
      "exfoliator",
      "shampoo",
      "conditioner",
      "hair spray",
      "hair gel",
      "body lotion",
      "perfume",
      "deodorant",
      "body wash",
      "shaving cream",
      "aftershave",
      "lip balm",
      "cream",
      "hand cream",
      "foot cream",
      "bath salts",
      "body scrub",
      "eye shadow palette",
      "makeup brush",
      "makeup sponge",
      "tweezers",
      "eyebrow pencil",
      "eyebrow gel",
      "lip liner",
      "book",
      "novel",
      "magazine",
      "journal",
      "textbook",
      "dictionary",
      "encyclopedia",
      "manual",
      "guide",
      "biography",
      "autobiography",
      "memoir",
      "e-book",
      "chapter",
      "paragraph",
      "sentence",
      "page",
      "cover",
      "binding",
      "dust jacket",
      "index",
      "table of contents",
      "reference",
      "catalog",
      "edition",
      "publisher",
      "author",
      "editor",
      "illustrator",
      "preface",
      "appendix",
      "prologue",
      "epilogue",
      "library",
      "bookshelf",
      "bookmark",
      "reading light",
      "bookstore",
      "book club",
      "review",
      "summary",
      "critique",
      "foreword",
      "volume",
      "series",
      "anthology",
      "novella",
      "manuscript",
      "text",
      "paperback",
      "hardcover",
      "novel",
      "textbook",
      "e-reader",
      "bookstand",
      "book light",
      "bookmark",
      "book cover",
      "bookcase",
      "reading chair",
      "bookend",
      "journal",
      "planner",
      "notebook",
      "writing pad",
      "magazine rack",
      "bookbinding kit",
      "book repair kit",
      "library card",
      "book safe",
      "book lamp",
      "book tote",
      "book sleeve",
      "book weight",
      "book holder",
      "reading glasses",
      "desk organizer",
      "shirt",
      "pants",
      "dress",
      "skirt",
      "jacket",
      "coat",
      "suit",
      "shorts",
      "socks",
      "shoes",
      "hat",
      "scarf",
      "gloves",
      "tie",
      "belt",
      "sweater",
      "hoodie",
      "t-shirt",
      "blouse",
      "vest",
      "cardigan",
      "jeans",
      "tunic",
      "gown",
      "robe",
      "pajamas",
      "stockings",
      "underwear",
      "bathrobe",
      "study lamp",
      "book subscription",
      "book storage box",
      "literary gift set",
      "book bundle",
      "author signed edition",
      "limited edition book",
      "book of the month club",
      "literary journal",
      "audiobook",

      "smartphone",
      "laptop",
      "tablet",
      "headphones",
      "camera",
      "smartwatch",
      "tv",
      "printer",
      "speakers",
      "refrigerator",
      "microwave",
      "washing machine",
      "dryer",
      "blender",
      "toaster",
      "coffee maker",
      "air conditioner",
      "heater",
      "fan",
      "oven",
      "vacuum cleaner",
      "dishwasher",
      "cookware set",
      "knife set",
      "cutlery set",
      "bed frame",
      "mattress",
      "sofa",
      "dining table",
      "chair",
      "apple",
      "samsung",
      "sony",
      "dell",
      "hp",
      "canon",
      "nikon",
      "lg",
      "bosch",
      "philips",
      "bose",
      "microsoft",
      "google",
      "intel",
      "lenovo",
      "acer",
      "asus",
      "panasonic",
      "jbl",
      "oster",
      "dyson",
      "kitchenaid",
      "razer",
      "gopro",
      "logitech",
      "sennheiser",
      "harman",
      "xiaomi",
      "huawei",
      "tcl",
    ];
    return /^[A-Z]/.test(word) || commonNouns.includes(word.toLowerCase());
  }

  return (
    <div className="mr-2 text-xl">
      {!hearing && !loading && (
        <i
          className="fas fa-microphone cursor-pointer"
          id="microphone-icon"
          onClick={handleMic}
        ></i>
      )}
      {hearing && (
        <i className="fa-solid fa-ear-listen" onClick={handleMic}></i>
      )}
      {loading && (
        <i
          className="fa-solid fa-microphone-lines-slash"
          id="microphone-icon"
        ></i>
      )}
    </div>
  );
}

export default Navbarmic;
