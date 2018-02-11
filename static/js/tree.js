/**
* Constructor of an edge structure : creation of the edge depends on if the two vertices in parameter are of the same type
* @class Edge
* @param {} any type of variable
* @param {} any type of variable
*/
function Edge(start,end) {

  if (typeof start==typeof end) {
    this.start=start;
    this.end=end;
  } else {
    document.getElementById('success').style.visibility = "visible";
    document.getElementById('success').setAttribute("class","alert alert-danger");
    document.getElementById('success').innerHTML = "<strong>Failure !</strong> Graph not correctly initialized. Edge initialization Error : Parameters are not of the same type";
    throw "Edge initialization Error : Parameters are not of the same type";
    exit(-1);
  }

}

/**
* Constructor of a Graph : take a list of edges in parameter and intialize a graph as an Adjacency-list
* @class Graph
* @param {} any type of variable
* @param {} any type of variable
*/
function Graph(nbVertices,tab) {
  var count = 0;
  /*
    We, firstly, verify if what we are try to initialize as a Graph is an Object
  */
  this.vertices = [];//list of all vertices
  if (typeof this != "object") {
    document.getElementById('success').style.visibility = "visible";
    document.getElementById('success').setAttribute("class","alert alert-danger");
    document.getElementById('success').innerHTML = "<strong>Failure !</strong> Graph not correctly initialized. Graph initialization Error : Not an object";
    throw "Graph initialization Error : Not an object";
    exit(-1);
  }
  for (var i = 0; i < tab.length; i++) {
    /*
      For each element in tab, we verify if it is an edge
    */
    if (tab[i].start == undefined || tab[i].end == undefined){
      document.getElementById('success').style.visibility = "visible";
      document.getElementById('success').setAttribute("class","alert alert-danger");
      document.getElementById('success').innerHTML = "<strong>Failure !</strong> Graph not correctly initialized. Graph initialization Error : tab incorrectly initialized";
      throw "Graph initialization Error : tab incorrectly initialized";
      exit(-1);
    }
    if (this[tab[i].start] == undefined) {
      //Count the number of vertices linked with edges
      this[tab[i].start] = [];
      this.vertices.push(tab[i].start);
      count++;
    }
    if (this[tab[i].end] == undefined) {
      //Count the number of vertices linked with edges
      this[tab[i].end] = [];
      this.vertices.push(tab[i].end);
      count++;
    }
    if (this[tab[i].start].includes(tab[i].end)==false) {
      this[tab[i].start].push(tab[i].end);
    }
    if (this[tab[i].end].includes(tab[i].start)==false) {
      this[tab[i].end].push(tab[i].start);
    }
  }

  /*
    If some vertices do not have any edges (equivalent to "the amount of edges is lower than the amount of vertices"), the entry is considered to be incorrect
  */
  if (count!=nbVertices) {
    document.getElementById('success').style.visibility = "visible";
    document.getElementById('success').setAttribute("class","alert alert-danger");
    document.getElementById('success').innerHTML = "<strong>Failure !</strong> Graph not correctly initialized. Graph initialization Error : Missing edges";
    throw "Graph initialization Error : Missing edges";
    exit(-1);
  }

  this.toJson = function () {
    var json = Object();
    json["nodes"] = [];
    json["links"] = [];
    for (var element=0;element<this.vertices.length;element++) {
      /*
        initialize every vertices
      */
      json["nodes"].push(
        {
          "id": this.vertices[element],
          "group": element
        }
      );
      /*
        initialize all the edges between our element and its next vertices
      */
      for (var j = 0; j < this[this.vertices[element]].length; j++) {
        json["links"].push(
          {
            "source": this.vertices[element],
            "target": this[this.vertices[element]][j],
            "value": 1
          }
        )
      }
    }

    return JSON.stringify(json);
  }
}

/**
* Initialize the graph on the SVG html object, using D3.js
* @function initGraph
* @param {nvVertices} some integer
* @param {tab} some Array of Edges
*/
function initGraph(nbVertices,tab,id) {

  var g = new Graph(nbVertices,tab)
  var svg = d3.select("#"+id),
      width = +svg.attr("width"),
      height = +svg.attr("height");

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var simulation = d3.forceSimulation()
      .force("link", d3.forceLink()
        .id(function(d) { return d.id; })
        .distance(function() { return 1; })
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    graph = JSON.parse(g.toJson());
    var link = svg.append("g")
        .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    var node = svg.append("g")
        .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
        .attr("r", 5)
        .attr("fill", function(d) { return color(d.group); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
        .text(function(d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

function demo() {
  var tab = [];
  for (i=0;i<3;i++) {
    tab.push(new Edge(i+1,i));
  }
  for (i=0;i<3;i++) {
    tab.push(new Edge(2*i,3*i));
  }
  initGraph(6,tab,"svg_graph");
}


/**
* Initialize the Adjacent-Matrix on the HTML
* @function initAdjMatrix
* @param {nbVertices} some integer
* @param {tab} some Array of Edges
* @param {id} some string : the name of the div where the <table> is positioned
*/
function initAdjMatrix(nbVertices,tab,id) {
  var g = new Graph(nbVertices,tab);
  var table = document.getElementById('adj_m_table');
  table.innerHTML = " ";
  var parent = document.getElementById(id);
  if (document.getElementById('info_m')!=null) {
    parent.removeChild(document.getElementById('info_m'));
  }
  var head = document.createElement('thead');
  var tr = document.createElement('tr');
  var th_empty = document.createElement('th');
  tr.appendChild(th_empty);
  /*
    Head definition
  */
  for (var i = 0; i < g.vertices.length; i++ ) {
    th = document.createElement('th');
    th.innerHTML = g.vertices[i];
    tr.appendChild(th);
    head.appendChild(tr);
    table.appendChild(head);
  }
  /*
    Body definition
  */
  var body = document.createElement("tbody");
  for (var i = 0; i < g.vertices.length; i++ ) {
    var tr = document.createElement('tr');
    var td_empty = document.createElement('td');
    td_empty.innerHTML = '<b>'+g.vertices[i]+'</b>'
    tr.appendChild(td_empty);
    for (var j = 0; j < g.vertices.length; j++) {
      td = document.createElement('td');
        if (g[g.vertices[i]].includes(g.vertices[j])) {
          td.innerHTML = 1;
        } else {
          td.innerHTML = 0;
        }
        tr.appendChild(td);
    }
    body.appendChild(tr);
  }
  table.appendChild(body);
}

/** Gets the maximum length of a list of vertices
function getMaxLength(g) {
  var max = 0;
  for (var i = 0; i < g.vertices.length; i++) {
    if (max<g[g.vertices[i]].length) {
      max = g[g.vertices[i]].length;
    }
  }
  return max;
}


/**
* Initialize the Adjacent-List on the HTML
* @class initAdjList
* @param {nbVertices} some integer
* @param {tab} some Array of Edges
* @param {id} some string : the name of the div where the <table> is positioned
*/
function initAdjList(nbVertices,tab,id) {
  var g = new Graph(nbVertices,tab);
  var table = document.getElementById('adj_l_table');
  table.innerHTML = " ";
  var parent = document.getElementById(id);
  if (document.getElementById('info_l')!=null) {
    parent.removeChild(document.getElementById('info_l'));
  }
  var head = document.createElement('thead');
  var tr = document.createElement('tr');
  /*
    Head definition
  */
  for (var i = 0; i < g.vertices.length; i++ ) {
    th = document.createElement('th');
    th.innerHTML = g.vertices[i];
    tr.appendChild(th);
    head.appendChild(tr);
    table.appendChild(head);
  }
  var max = getMaxLength(g);
  /*
    Body definition
  */
  var body = document.createElement("tbody");
  for (var i = 0; i < max; i++ ) {
    var tr = document.createElement('tr');
    for (var j = 0; j < g.vertices.length; j++) {
      td = document.createElement('td');
        if (g[g.vertices[j]].length<=i) {
          td.innerHTML = " ";
        } else {
          td.innerHTML = g[g.vertices[j]][i];
        }
        tr.appendChild(td);
    }
    body.appendChild(tr);
  }
  table.appendChild(body);
}

/** Updates the graph with the entry of the user
  * @function changeData
*/
function changeData() {
  var data = document.getElementById("data").value;
  var nbVertices = document.getElementById("vertices").value;
  var sep = document.getElementById("select_edge_sep").value;
  var tab=[];
  switch (sep) {
    case "Line break":
        data=data.split('\n');
      break;
    case "Space":
        data=data.split(" ");
      break;
  }
  for (var i = 0; i < data.length; i++) {
    str = data[i].split('-');
    tab.push(new Edge(str[0],str[1]));
  }
  $("#svg_graph").empty();
  initGraph(nbVertices,tab,"svg_graph");
  initAdjMatrix(nbVertices,tab,"adj_m");
  initAdjList(nbVertices,tab,"adj_l");
  document.getElementById('success').style.visibility = "visible";
  document.getElementById('success').setAttribute("class","alert alert-success");
  document.getElementById('success').innerHTML= "<strong>Success !</strong> Graph correctly initialized.";

}

/** deliver a random integer number between min and max (both included)
  * @function random_min_max
  * @param {min} some integer : minimum
  * @param {max} some integer : maximum
*/
function random_min_max(min,max) {
  return Math.floor(Math.random() * max) + min;
}

/** Same as changeData but apply from random entry
  * @function changeDataRdm
*/
function changeDataRdm() {
  var nbVertices = parseInt(document.getElementById("vertices_rdm").value);
  var nbEdges = parseInt(document.getElementById("edges_rdm").value);
  var tab=[];
  var tab_x=[];
  for (var i = 0; i < nbVertices; i++) {
    do {
      x2=random_min_max(0,nbVertices);
      var edg = new Edge(i,x2);
    } while (i==x2);
    tab.push(edg);
    if (tab_x.includes(x2)==false) {
      tab_x.push(x2);
    }
  }
  for (var i = nbVertices; i < nbEdges; i++) {
    do {
      x1=random_min_max(0,nbVertices);
      x2=random_min_max(0,nbVertices);
    } while (x1==x2);
    tab.push(new Edge(x1,x2));
  }
  $("#svg_graph").empty();
  initGraph(nbVertices,tab,"svg_graph");
  initAdjMatrix(nbVertices,tab,"adj_m");
  initAdjList(nbVertices,tab,"adj_l");
  document.getElementById('success').style.visibility = "visible";
  document.getElementById('success').setAttribute("class","alert alert-success");
  document.getElementById('success').innerHTML= "<strong>Success !</strong> Graph correctly initialized.";

}
