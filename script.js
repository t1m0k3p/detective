document.addEventListener("DOMContentLoaded", function() {
    console.log("Script geladen!");
    
    if (typeof jsPlumb === "undefined") {
        console.error("jsPlumb konnte nicht geladen werden.");
        return;
    }

    var instance = jsPlumb.getInstance({
        Connector: ["Straight"],
        Endpoint: ["Dot", { radius: 5 }],
        PaintStyle: { stroke: "white", strokeWidth: 2 },
        EndpointStyle: { fill: "white" }
    });

    let connectMode = false;
    let firstSelected = null;
    
    function makeDraggable(item) {
        console.log("makeDraggable aufgerufen für", item.id);
        instance.draggable(item, { containment: "parent" });
        instance.makeSource(item, {
            anchor: "Continuous",
            connector: ["Straight"],
        });
        instance.makeTarget(item, {
            anchor: "Continuous",
        });
        item.addEventListener("click", function() {
            if (connectMode) {
                handleConnection(item);
            }
        });
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

    function resetBoard() {
        console.log("Zurücksetzen...");
        localStorage.removeItem("boardData");
        instance.deleteEveryConnection(); // Entfernt alle Verbindungen
        document.getElementById("board").innerHTML = "";
        instance.reset(); // Setzt jsPlumb komplett zurück
    }

    function handleConnection(item) {
        if (!firstSelected) {
            firstSelected = item;
            console.log("Erstes Element gewählt:", item.id);
        } else {
            instance.connect({
                source: firstSelected,
                target: item
            });
            console.log("Verbindung erstellt zwischen", firstSelected.id, "und", item.id);
            firstSelected = null;
        }
    }

    document.getElementById("addItemButton").addEventListener("click", function() {
        console.log("Button 'Neues Element' geklickt");
        addItem();
    });
    document.getElementById("saveBoardButton").addEventListener("click", function() {
        console.log("Button 'Speichern' geklickt");
        saveBoard();
    });
    document.getElementById("loadBoardButton").addEventListener("click", function() {
        console.log("Button 'Laden' geklickt");
        loadBoard();
    });
    document.getElementById("connectModeButton").addEventListener("click", function() {
        connectMode = !connectMode;
        console.log("Verbindungsmodus:", connectMode);
        if (!connectMode) {
            firstSelected = null;
        }
    });
    document.getElementById("resetBoardButton").addEventListener("click", function() {
        console.log("Button 'Zurücksetzen' geklickt");
        resetBoard();
    });

    loadBoard();
});