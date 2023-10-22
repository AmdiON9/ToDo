window.addEventListener("load", () => {
    const formInputValue = document.querySelector("#formInput");
    const formForm = document.querySelector("form");
    const tasksDiv = document.querySelector("#tasks");

    checkStorage();

    formForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        try {
            if(formInputValue.value == "" || formInputValue.value == "undefined") {
                throw "fill input field";
            } else if(formInputValue.value.length < 2) {
                throw "write a normal clause";
            }
        } catch(err) {
            alert(err);
            return;
        }

        createDiv(tasksDiv,formInputValue,1);

    })

})

function createDiv(tasksDiv,formInputValue,accessKey) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    tasksDiv.appendChild(taskDiv);

    const taskDivContent =  document.createElement("div");
    taskDivContent.classList.add("content");

    const taskDivContentInput = document.createElement("input");
    taskDivContentInput.type = "text";
    taskDivContentInput.value = formInputValue.value;
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

    if(accessKey == 1) {
        saveElement(formInputValue);
    }

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
        removeElement(formInputValue);
    })


}

  
function removeElement(accessKey) {
    const localLength = localStorage.length;
    
    if(localLength>0) {
        
        for(let i = 0; i < localLength; i++) {
            if(localStorage.getItem(i) == accessKey.value) {
                localStorage.removeItem(i);
            }
            console.log(accessKey.value)
        }

    } else {
       return;
    }

}


function saveElement(elem) {

    const localLength = localStorage.length;
    localStorage.setItem("", elem.value);
}

function checkStorage() {

    const localLength = localStorage.length;
    const tasksDiv = document.querySelector("#tasks");

    if(localLength>0) {
        
        for(let i = 0; i < localLength; i++) {
            let name = localStorage.key(i);
            let obj = { value: localStorage.getItem(name)};
            createDiv(tasksDiv,obj,0);
        }

    } else {
       return;
    }


}