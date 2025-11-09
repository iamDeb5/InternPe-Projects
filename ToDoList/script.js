const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveData() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadData() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";
}
loadData();

addBtn.addEventListener("click", () => {
    if (input.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `${input.value} <span>🗑️</span>`;
    taskList.appendChild(li);
    input.value = "";
    saveData();
});

taskList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});
