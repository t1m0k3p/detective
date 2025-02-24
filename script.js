document.addEventListener("DOMContentLoaded", function() {
    var instance = jsPlumb.getInstance({
        Connector: ["Straight"],
        Endpoint: ["Dot", { radius: 5 }],
        PaintStyle: { stroke: "white", strokeWidth: 2 },
        EndpointStyle: { fill: "white" }
    });

    function makeDraggable(item) {
        instance.draggable(item, { containment: "parent" });
    }

    function addItem() {
        console.log("Neues Element wird hinzugefügt...");
        let board = document.getElementById("board");
        let newItem = document.createElement("div");
        newItem.className = "item";
        newItem.id = "item" + document.querySelectorAll(".item").length;
        newItem.style.top = Math.random() * (board.clientHeight - 50) + "px";
        newItem.style.left = Math.random() * (board.clientWidth - 150) + "px";
        newItem.textContent = "📌 Neues Element";
        board.appendChild(newItem);
        makeDraggable(newItem);
    }

    function saveBoard() {
        console.log("Speichern... ");
        let items = document.querySelectorAll(".item");
        let data = [];
        items.forEach(item => {
            data.push({ id: item.id, top: item.style.top, left: item.style.left, text: item.textContent });
        });
        localStorage.setItem("boardData", JSON.stringify(data));
    }

    function loadBoard() {
        console.log("Laden...");
        let board = document.getElementById("board");
        board.innerHTML = "";
        let data = JSON.parse(localStorage.getItem("boardData"));
        if (data) {
            data.forEach(itemData => {
                let item = document.createElement("div");
                item.className = "item";
                item.id = itemData.id;
                item.style.top = itemData.top;
                item.style.left = itemData.left;
                item.textContent = itemData.text;
                board.appendChild(item);
                makeDraggable(item);
            });
        }
        instance.repaintEverything();
    }

    document.getElementById("addItemButton").addEventListener("click", addItem);
    document.getElementById("saveBoardButton").addEventListener("click", saveBoard);
    document.getElementById("loadBoardButton").addEventListener("click", loadBoard);

    loadBoard();
});