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
    
    function toggleConnectMode() {
        connectMode = !connectMode;
        document.getElementById("connectModeButton").classList.toggle("connect-mode", connectMode);
        let items = document.querySelectorAll(".item");
        items.forEach(item => {
            if (connectMode) {
                instance.setDraggable(item, false); // Deaktiviere das Bewegen
            } else {
                instance.setDraggable(item, true); // Aktiviere das Bewegen wieder
            }
        });
        console.log("Verbindungsmodus:", connectMode);
        if (!connectMode) {
            firstSelected = null;
        }
    }
    
    function resetBoard() {
        console.log("Zurücksetzen...");
        localStorage.removeItem("boardData");
        instance.deleteEveryConnection(); // Alle Verbindungen löschen
        document.getElementById("board").innerHTML = "";
    }

    document.getElementById("resetBoardButton").addEventListener("click", function() {
        console.log("Button 'Zurücksetzen' geklickt");
        resetBoard();
    });
    
    document.getElementById("connectModeButton").addEventListener("click", function() {
        console.log("Button 'Verbindungsmodus' geklickt");
        toggleConnectMode();
    });
});