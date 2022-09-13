const ui = {
    exec: document.querySelector("#query-exec"),
    result: document.querySelector("#query-result"),
};

function onExec() {
    fetch("assets/latest.json")
        .then((response) => response.json())
        .then((issue) => showResult(issue));
}

function showResult(issue) {
    ui.result.classList.remove("hidden");
    ui.result.innerHTML = "";
    addListItem(ui.result, `<strong>Issue #${issue.number}`);
    for (let item of issue.items) {
        let html = `<a href=${item.url}>${item.title}</a>`;
        if (item.author) {
            html += ` by ${item.author}`;
        }
        addListItem(ui.result, html);
    }
    addListItem(ui.result, `[ <a href="${issue.url}">read more</a> ]`);
}

function addListItem(ul, html) {
    const li = document.createElement("li");
    li.innerHTML = html;
    ul.appendChild(li);
}

ui.exec.addEventListener("click", onExec);
