jsPlumb.ready(function () {
    var instance = jsPlumb.getInstance({
        Connector: ["Straight"],
        Endpoint: ["Dot", { radius: 5 }],
        PaintStyle: { stroke: "white", strokeWidth: 2 },
        EndpointStyle: { fill: "white" }
    });

    function makeDraggable(item) {
        instance.draggable(item);
    }

    function addItem() {
        let newItem = document.createElement("div");
        newItem.className = "item";
        newItem.id = "item" + document.querySelectorAll(".item").length;
        newItem.style.top = Math.random() * 400 + "px";
        newItem.style.left = Math.random() * 400 + "px";
        newItem.textContent = "📌 Neues Element";
        document.getElementById("board").appendChild(newItem);
        makeDraggable(newItem);
    }

    function saveBoard() {
        let items = document.querySelectorAll(".item");
        let data = [];
        items.forEach(item => {
            data.push({ id: item.id, top: item.style.top, left: item.style.left, text: item.textContent });
        });
        localStorage.setItem("boardData", JSON.stringify(data));
    }

    function loadBoard() {
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
        instance.repaintEverything(); // Aktualisiert jsPlumb nach dem Laden
    }

    document.addEventListener("DOMContentLoaded", function() {
        loadBoard();
    });
});