console.log("Hello Welcome Again");
showNotes();
// If user adds a node, add it to a localStorage



let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    if (addTitle.value.length > 0 || addTxt.value.length >0) {
        let notes = localStorage.getItem("notes");
        let notesObj = []
        if (notes != null) {
            notesObj = JSON.parse(notes)
        }

        let myObj = {
            title: addTitle.value,
            text: addTxt.value,
            isImp:false,
        }
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
    }
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notes);
    showNotes();
})

// Function to show from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes != null) {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard  my-2 mx-2 card" style="width: 20rem;">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex>
                        <h5>class="card-title ">${element.title}</h5>
                        
                    </div>
                    <p class="card-text d-block">${element.text}</p>
                    <div class="float-right">
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Del. Note</button>
                        <button id="${index}" onclick="editNote(this.id)" class="btn btn-info">Edi. Note</button>
                    </div> 
                </div>
            </div>`;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! "Use Add a Note" section to add a note`;
    }
}

// mark as Important
function markImportant(index){

   console.log(index)
   const notes =  JSON.parse(localStorage.getItem('notes'))
   console.log(notes[index])
//    notes.forEach((ele,ind)=>{
//     // console.log(ind)
//     if(ind===index){
//         console.log(ele)
//         ele.isImp=true;

//     }
//    })

   notes[index].isImp=true;
   console.log(notes)

   localStorage.setItem("notes", JSON.stringify(notes));
   showNotes();
   console.log(notes[index])

    // isImpBtn=document.getElementById(`isImp-${index}`)
    // console.log(isImpBtn)
    // isImpBtn.innerHTML.backgroundColor="red";
    // if(isImpBtn.classList.contains("text-warning"))
    // {
    //     isImpBtn.classList.remove("text-warning");
    //     isImpBtn.classList.add("text-muted");
    // }
    // else
    // {
    //     isImpBtn.classList.remove("text-warning");
    //     isImpBtn.classList.add("text-muted");
        
    // }
}

// function to delete a Note
function deleteNote(index) {
    // console.log("I am deleting",index);
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes != null) {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let inputVal = search.value;
    // console.log("Input event fired!",inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


// edit node
function editNote(index) {
    console.log("Edit");
    let notes = localStorage.getItem("notes");
    let notesObj = JSON.parse(notes);
    console.log(notesObj[index].text,notesObj[index].title);
    let txt = prompt("Edit Note ", notesObj[index].text);
    if (txt != null) {
        notesObj[index].text = txt;
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

/*
// 1. Add title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
// 5. Edit Note
*/