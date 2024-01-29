var notes = [];

function loadNotesFromLocalStorage() {
  notes = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var noteJSON = localStorage.getItem(key);
    if (noteJSON) {
      // Check if noteJSON is not null or undefined
      var note = JSON.parse(noteJSON);
      if (note.title && note.content && note.lastEdited) {
        notes.push(note);
      } else {
        // Handle invalid note data (optional)
        console.error("Invalid note data found in local storage:", note);
      }
    }
  }
  displayNotes(notes);
}

loadNotesFromLocalStorage();

function handleicon() {
  document.getElementById("searchbar").focus();
  document.querySelector(".fa-magnifying-glass").style.display = "none";
}

function handlefocus() {
  document.querySelector(".fa-magnifying-glass").style.display = "none";
}

function handleblur() {
  if (document.getElementById("searchbar").value === "") {
    document.querySelector(".fa-magnifying-glass").style.display =
      "inline-block";
  }
}

function saveNote() {
  var title = document.getElementById("title").value;
  var content = document.getElementById("notetextarea").textContent;
  var currentTime = new Date().toLocaleString();

  // Check if a note with the same title already exists
  var existingNoteIndex = notes.findIndex(function (note) {
    return note.title === title;
  });

  // If a note with the same title exists, update its content and last edited time
  if (existingNoteIndex !== -1) {
    notes[existingNoteIndex].content = content;
    notes[existingNoteIndex].lastEdited = currentTime;
    // Update the note in local storage as well
    localStorage.setItem(title, JSON.stringify(notes[existingNoteIndex]));
  } else {
    // Create a new note object
    var newNote = {
      title: title,
      content: content,
      lastEdited: currentTime,
    };
    localStorage.setItem(title, JSON.stringify(newNote));
    notes.push(newNote);
  }
  displayNotes();
}

function deleteNote() {
  var titleToDelete = document.getElementById("title").value;

  localStorage.removeItem(titleToDelete);

  notes = notes.filter(function (note) {
    return note.title !== titleToDelete;
  });

  displayNotes();
}

function filterNotes() {
  var searchTerm = document
    .getElementById("searchbar")
    .value.trim()
    .toLowerCase();
  var filteredNotes = notes.filter(function (note) {
    return note.title.toLowerCase().includes(searchTerm);
  });
  displayNotes(filteredNotes);
}

function displayNotes(filteredNotes = notes) {
  var notesContainer = document.getElementById("notesContainer");
  notesContainer.innerHTML = ""; // Clear previous notes

  // Always display the first note by default
  if (filteredNotes.length > 0) {
    var firstNote = filteredNotes[0];
    updateNoteDisplay(firstNote);
  }
  filteredNotes.forEach(function (note) {
    var noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.innerHTML = '<div class="title">' + note.title + "</div>";
    var contentPreview = note.content
      ? note.content.length > 50
        ? note.content.substring(0, 50) + "..."
        : note.content
      : "";
    noteDiv.innerHTML +=
      '<div class="content-preview">' + contentPreview + "</div>";

    noteDiv.addEventListener("click", function () {
      updateNoteDisplay(note);
    });
    notesContainer.appendChild(noteDiv);
  });
}
function updateNoteDisplay(note) {
  document.getElementById("title").value = note.title;
  document.getElementById("notetextarea").textContent = note.content;
  document.getElementById("wordCount").textContent =
    note.content.split(/\s+/).length;
  document.getElementById("lastEdited").textContent = note.lastEdited;
  document.getElementById("fileName").textContent = note.title;
}
function getlength(note) {
  var text = note.content;
}
function addNote() {
  // Create a new note object with default placeholders
  var newNote = {
    title: "New Title",
    content: "New Content",
    lastEdited: new Date().toLocaleString(),
  };
  notes.push(newNote);
  displayNotes();
}

function updateLastEdited() {
  document.getElementById("lastEdited").textContent =
    new Date().toLocaleString();
}

function makeBold() {
  document.execCommand("bold", false, null);
}

function makeBold() {
  document.execCommand("bold", false, null);
}

// Function to apply italic formatting to selected text
function makeItalic() {
  document.execCommand("italic", false, null);
}

// Function to apply underline formatting to selected text
function makeUnderline() {
  document.execCommand("underline", false, null);
}
function makeStrike() {
  var textarea = document.getElementById("notetextarea");
  var selectedText = textarea.textContent.substring(
    textarea.selectionStart,
    textarea.selectionEnd
  );

  // Wrap the selected text with a <strike> element
  var newText =
    textarea.value.substring(0, textarea.selectionStart) +
    "<strike>" +
    selectedText +
    "</strike>" +
    textarea.value.substring(textarea.selectionEnd);

  // Update the text area with the new formatted text
  textarea.value = newText;
}
