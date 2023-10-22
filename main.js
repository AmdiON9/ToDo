window.addEventListener("load", () => {
    const formSubmit = document.querySelector("#formSubmit");
    const formInput = document.querySelector("#formInput");
    const form = document.querySelector("form");
    const tasksDiv = document.querySelector("#tasks");

    checkStorage();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        try {
            if(formInput.value == "" || formInput.value == "undefined") {
                throw "fill input field";
            } else if(formInput.value.length < 2) {
                throw "write a normal clause";
            }
        } catch(err) {
            alert(err);
            return;
        }

        saveElement(formInput);

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        tasksDiv.appendChild(taskDiv);

        const taskDivContent =  document.createElement("div");
        taskDivContent.classList.add("content");

        const taskDivContentInput = document.createElement("input");
        taskDivContentInput.type = "text";
        taskDivContentInput.value = formInput.value;
        taskDivContentInput.setAttribute("readonly", "readonly");
        taskDivContent.appendChild(taskDivContentInput);
        taskDiv.appendChild(taskDivContent);
    
        const taskDivButtons = document.createElement("div");
        taskDivButtons.classList.add("buttons");

        const taskDivButtonsSave = document.createElement("button");
        taskDivButtonsSave.classList.add("save");
        taskDivButtonsSave.innerHTML = "EDIT";
        taskDivButtons.appendChild(taskDivButtonsSave);

        const taskDivButtonsDelete = document.createElement("button");
        taskDivButtonsDelete.classList.add("delete");
        taskDivButtonsDelete.innerHTML = "DELETE";
        taskDivButtons.appendChild(taskDivButtonsDelete);
        taskDiv.appendChild(taskDivButtons);

        formInput.value = "";

        taskDivButtonsSave.addEventListener("click", () => {
           if(taskDivButtonsSave.innerText == "EDIT") {
            taskDivContentInput.removeAttribute("readonly");
            taskDivContentInput.focus();
            taskDivButtonsSave.innerHTML = "SAVE";
           } else {
            taskDivContentInput.setAttribute("readonly", "readonly");
            taskDivButtonsSave.innerHTML = "EDIT";
           }
        })

        taskDivButtonsDelete.addEventListener("click", () => {
            tasksDiv.removeChild(taskDiv);
        })

    })

})

function createDiv() {
    
}

function saveElement(elem) {

    sessionStorage.setItem("")
}

function checkStorage() {

    const sessionCount = sessionStorage.length;

    if(sessionCount>0) {
        
        for(let i = 0; i < sessionCount; i++) {
            let name = sessionStorage.key(i);
            console.log(sessionStorage.getItem(name))
        }



    } else {
        console.log("empty")
    }


}