jsPlumb.ready(function () {
    var instance = jsPlumb.getInstance({
        Connector: ["Straight"],
        Endpoint: ["Dot", { radius: 5 }],
        PaintStyle: { stroke: "white", strokeWidth: 2 },
        EndpointStyle: { fill: "white" }
    });
    
    instance.draggable("person1");
    instance.draggable("clue1");
    instance.connect({ source: "person1", target: "clue1" });
});