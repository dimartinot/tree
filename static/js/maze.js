//Timer variable, used in solving the maze
var timer1,timer2,timer3,timer4;

/**
* Return the index of a given Barrier in an array of Barrier. Return -1 if not found
* @function Barrier
* @param {tab} some array of Barrier
* @param {obj} some Barrier
*/
function get_index(tab,obj) {
  for (i=0;i<tab.length;i++) {
    if ((tab[i].start==obj.start && tab[i].end==obj.end) || (tab[i].start==obj.end && tab[i].end==obj.start)) {
      return i;
    }
  }
  return -1;
}


/**
* Return true if a given potential point is out of the grid designed for the maze, false if not.
* @function is_out
* @param {i} some integer : describes current position
* @param {r} some integer : describes the direction where to go
* @param {size} some integer : describes the size of the grid
*/
function is_out(i,r,size) {
  switch (r) {
    case 1://top
      if (Math.floor(i/size)!=0) {
        return false;
      }
      break;
      break;
    case 2://left
      if (i%size!=0) {
        return false;
      }
      break;
    case 3://bottom
      if (Math.floor(i/size)!=size-2) {
        return false;
      }
      break;
    case 4://right
      if (i%size!=size-2) {
        return false;
      }
      break;
  }
  return true;
}


/**
* Apply moves from the current i position to its next, in function of the direction r given
* @function apply
* @param {i} some integer : describes current position
* @param {r} some integer : describes the direction where to go
* @param {size} some integer : describes the size of the grid
*/
function apply(i,r,size) {
  switch (r) {
    case 1://top
      if (Math.floor(i/size)!=0) {
        return i-size;
      }
      break;
    case 2://left
      if (i%size!=0) {
        return i-1;
      }
      break;
    case 3://bottom
      if (Math.floor(i/size)!=size-2) {
        return i+size;
      }
      break;
    case 4://right
      if (i%size!=size-2) {
        return i+1;
      }
      break;
  }
  return i;
}

/**
* Verify if around a given position, there is an unvisited neighbour visitable. If so, return true. If not, return false
* @function next_unvisited
* @param {visited_tab} some array of boolean : describes all position visited (ex: tab[i]==true means that the position n°i has been visited yet)
* @param {i} some integer : describes the position to look around of
* @param {size} some integer : describes the size of the grid
*/
function next_unvisited(visited_tab,i,size) {
  next=false;
  for (var r = 1; r < 5; r++) {
    if (is_out(i,r,size)==false) {/*
      console.log(visited_tab[apply(i,r,size)-Math.floor(apply(i,r,size)/size)]);
      console.log(apply(i,r,size));
      console.log(is_out(i,r,size));
      console.log('******************************************');*/
      if (visited_tab[apply(i,r,size)-Math.floor(apply(i,r,size)/size)]==false) {
        return true;
      }
    }
  }
  return next;
}

/**
* Return the index of the barrier to take down from tab, considering the direction taken by i, based on r.
* @function get_next_barrier
* @param {i} some integer : describes current position
* @param {r} some integer : describes the direction where to go
* @param {size} some integer : describes the size of the grid
* @param {tab} some array of Barrier : list all existing barriers
*/
function get_next_barrier(i,r,size,tab) {
  switch (r) {
    case 1://top
      index = get_index(tab,new Barrier(i,i+1));
      if (index == -1) {
        index = get_index(tab,new Barrier(i+1,i));
      }
      break;
    case 2://left
      index = get_index(tab,new Barrier(i,i+size));
      if (index == -1) {
        index = get_index(tab,new Barrier(i+size,i));
      }
      break;
    case 3://bottom
      index = get_index(tab,new Barrier(i+size,i+1+size));
      if (index == -1) {
        index = get_index(tab,new Barrier(i+1+size,i+size));
      }
      break;
    case 4://right
      index = get_index(tab,new Barrier(i+1+size,i+1));
      if (index == -1) {
        index = get_index(tab,new Barrier(i+1,i+1+size));
      }
      break;
  }
  return index;
}


/**
* The recursive function visiting every single cell of the maze and taking down the appropriates barriers in order to create a "perfect" maze
* @function visiting
* @param {visited_tab} some array of boolean : describes all position visited (ex: tab[i]==true means that the position n°i has been visited yet)
* @param {i} some integer : describes the position to look around of
* @param {size} some integer : describes the size of the grid
* @param {tab} some array of barriers : list all existing barriers
*/
function visiting(visited_tab,i,size,tab) {
  visited_tab[i-Math.floor(i/size)]=true;
  next=next_unvisited(visited_tab,i,size);
  if (next && visited_tab.includes(false)==true) {
      bool=false;
        do {
          r=random_min_max(1,4);
          if (is_out(i,r,size)==false) {
            if (visited_tab[apply(i,r,size)-Math.floor(apply(i,r,size)/size)]==false) {
              bool=true;
            }
          }
        } while (bool==false);
        index=get_next_barrier(i,r,size,tab);
        if (index!=-1) {
          tab.splice(index,1);
        }
        visiting(visited_tab,apply(i,r,size),size,tab);
        if (next_unvisited(visited_tab,i,size)==true) {
          bool=false;
          do {
            r=random_min_max(1,4);
            if (is_out(i,r,size)==false) {
              if (visited_tab[apply(i,r,size)-Math.floor(apply(i,r,size)/size)]==false) {
                bool=true;
              }
            }
          } while (bool==false);
          index=get_next_barrier(i,r,size,tab);
          if (index!=-1) {
            tab.splice(index,1);
          }
          visiting(visited_tab,apply(i,r,size),size,tab);
        }
    }
}

/**
* Constructor of a barrier : having a starting and an end point. Both are integers
* @class Barrier
* @param {start} some integer
* @param {end} some integer
*/
function Barrier(start,end) {
  if (typeof start==typeof end && typeof start == "number") {
    this.start = start;
    this.end = end;
  } else {
    throw "Barrier initialization Error : Parameters are not numbers";
  }
}

/**
* Constructor of a maze : it consists in an array of barriers
* @class Maze
* @param {size} some integer
*/
function Maze(size) {
  this.size=size;
  this.tab = [];
  /*
    Initialize the borders
  */
  for (i=1;i<size;i++) {
    //Left borders
    this.tab.push(new Barrier (size*i,size*(i-1)));
    //Top borders
    this.tab.push(new Barrier (i,(i-1)));
  }
  for (i=1;i<size;i++) {
    for (j=1;j<size;j++) {
      /*
        Determination of the barriers (from 1 up to 3) of each "node"
      */
      for (k=1;k<=2;k++) {
        switch (k) {
          case 1://top
            var tmp_barr = new Barrier(size*i+j,size*(i-1)+j);//Create a barrier between a given point and its top neighbour
            if (this.tab.includes(tmp_barr) == false) {//Verify if it does exist, or not
              this.tab.push(tmp_barr);
            }
            break;
          case 2://left
            var tmp_barr = new Barrier(size*i+j,size*i+j-1);//Create a barrier between a given point and its left neighbour
            if (this.tab.includes(tmp_barr) == false) {//Verify if it does exist, or not
              this.tab.push(tmp_barr);
            }
            break;
        }
      }
    }
  }

  /*
    Creation of paths
    */
  visited_tab = [];
  for (var i = 1; i <= (size-1)*(size-1); i++) {
    visited_tab.push(false);
  }
  i=0;
  visited_tab[i]=true;
  visiting(visited_tab,i,size,this.tab);


  var edge_tab = [];
  var marked = [];

  for (var i = 0;i<=(this.size-1)*(this.size-1)+(this.size-3);i++) {
    marked.push(false);
  }
  draw_maze_graph(this,0,marked,edge_tab);
  this.graph = new Graph(marked.length,edge_tab);
}

/**
  * Draw the given maze object inside of a svg id-ed with the id variable
  * @function draw_maze
  * @param {maze} some Maze object
  * @param {id} some string : the id of the svg where the maze is inserted
*/
function draw_maze(maze,id) {
  var svg = d3.select("#"+id),
      width = +svg.attr("width"),
      height = +svg.attr("height");
  var size = maze.size;
  var svgNS = "http://www.w3.org/2000/svg";
  for (i=0;i<maze.tab.length;i++) {
    var line = document.createElementNS(svgNS,"line");
    line.className = "barrier";
    line.setAttributeNS(null,"x1",((maze.tab[i].start % size)/(size-1))*width);
    line.setAttributeNS(null,"y1",(Math.floor(maze.tab[i].start / size)/(size-1))*height);
    line.setAttributeNS(null,"x2",((maze.tab[i].end % size)/(size-1))*width);
    line.setAttributeNS(null,"y2",(Math.floor(maze.tab[i].end / size)/(size-1))*height);
    line.setAttributeNS(null,"stroke-width",1);
    line.setAttributeNS(null,"stroke","black");
    document.getElementById("svg_maze").appendChild(line);
  }
}

/**
  * Draw the given maze object inside of a graph id-ed with the id variable
  * @function draw_maze_graph
  * @param {maze} some Maze object
  * @param {current} some integer : describes the current position
  * @param {marked} some array of boolean : describes every visited positions
  * @param {edge_tab} some array of Edges : list all Edges to be displayed on the graph of the maze
*/
function draw_maze_graph(maze,current,marked,edge_tab) {
  marked[current]=true;
  size=maze.size;
  size=size-1;
  if (marked.includes(false)==false) {
    return true;
  }
  for (var i = 1; i<=4; i++) {
    switch (i) {
      case 1://top
        if (get_index(maze.tab,new Barrier(current,current+1))==-1 && marked[current-size]==false) {
          edge_tab.push(new Edge(current,current-size));
          draw_maze_graph(maze,current-size,marked,edge_tab);
        }
        break;
      case 2://left
        if (get_index(maze.tab,new Barrier(current,current+size))==-1  && marked[current-1]==false) {
          edge_tab.push(new Edge(current,current-1));
          draw_maze_graph(maze,current-1,marked,edge_tab);
        }
        break;
      case 3://bottom
        if (get_index(maze.tab,new Barrier(current+size,current+size+1))==-1  && marked[current+size]==false) {
          edge_tab.push(new Edge(current,current+size));
          draw_maze_graph(maze,current+size,marked,edge_tab);
        }
        break;
    case 4://right
      if (get_index(maze.tab,new Barrier(current+1,current+1+size))==-1  && marked[current+1]==false) {
        edge_tab.push(new Edge(current,current+1));
        draw_maze_graph(maze,current+1,marked,edge_tab);
      }
      break;
    }
  }
}

/** load_maze is the execution function : creating the maze, the graph AND the tables
  * @function load_maze
*/
function load_maze() {
  clearTimeout(timer1);
  clearTimeout(timer2);
  clearTimeout(timer3);
  clearTimeout(timer4);  var size=parseInt(document.getElementById('maze_size').value);
  var speed=parseInt(document.getElementById('solve_speed').value);
  if (!isNaN(size) && !isNaN(speed) && size<=143) {
    $("#svg_maze").empty();
    var maze = new Maze(Math.floor(Math.abs(size)));
    draw_maze(maze,"svg_maze");
    solve(maze,"svg_maze",speed);

    if (maze.size<=50) {
      $("#maze_graph").empty();
      document.getElementById('info').style.visibility = "hidden";
      initGraph((maze.size)*(maze.size),maze.tab,"maze_graph");
      if (maze.size<=5) {
        document.getElementById('info_maze_l').style.visibility = "hidden";
        document.getElementById('info_maze_m').style.visibility = "hidden";
        initAdjMatrix((maze.size)*(maze.size),maze.tab,"adj_m");
        initAdjList((maze.size)*(maze.size),maze.tab,"adj_l");
      } else {
        document.getElementById('info_maze_m').style.visibility = "visible";
        document.getElementById('info_maze_l').style.visibility = "visible";
        document.getElementById("adj_m_table").innerHTML="";
        document.getElementById("adj_l_table").innerHTML="";
      }
    } else {
      document.getElementById('info').style.visibility = "visible";
    }
    document.getElementById('success').style.visibility = "visible";
    document.getElementById('success').setAttribute("class","alert alert-success");
    document.getElementById('success').innerHTML= "<strong>Success !</strong> Maze correctly initialized.";
  } else {
    document.getElementById('success').style.visibility = "visible";
    document.getElementById('success').setAttribute("class","alert alert-failure");
    document.getElementById('success').innerHTML= "<strong>Failure ! </strong> Maze incorrectly initialized : TypeError (NaN)";
  }
}
/** Draws a red dot at the given position : development tool
  * @function draw_dot
  * @param {maze} some Maze object
  * @param {current} some integer : position of the red dot
  * @param {svg} some DOM element : the svg where to insert the dot
  * @param {color} some STRING element : describes the color of the dot
*/
function draw_dot(maze,current,svg,color) {
  var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
  size=maze.size;
  width=svg.attr("width");
  height=svg.attr("height");
  var r=(4-2)/(10-100);
  circle.setAttributeNS(null,"cx",((current % size)/(size-1))*width+width/(2*size-2));
  circle.setAttributeNS(null,"cy",(Math.floor(current / size)/(size-1))*height+height/(2*size-2));
  circle.setAttributeNS(null,"r",r*size+4);
  circle.setAttributeNS(null,"fill",color);
  document.getElementById("svg_maze").appendChild(circle);
}

/** Recursive funtion thats moves throught the mae in order to get from current right to objective
  * @function move
  * @param {maze} some Maze object : describes a Maze
  * @param {current} some integer : defines the current position
  * @param {objective} some integer : defines the objective to reach
  * @param {marked} some array of boolean : describes all cells that have been visited
  * @param {svg} some DOM object : used to draw dots at the end of the algorithm
*/
function move(maze,current,objective,marked,svg,speed) {
  marked[current]=true;
  size=maze.size;
  size=size-1;
  if (current==objective) {
    draw_dot(maze,current,svg,"blue");
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
    clearTimeout(timer4);
    return true;
  }
  draw_dot(maze,current,svg,"red");
  for (var i = 1; i<=4; i++) {
    switch (i) {
      case 1://top
        if (get_index(maze.tab,new Barrier(current,current+1))==-1 && marked[current-size]==false) {
          timer1 = setTimeout(function () {
            move(maze,current-size,objective,marked,svg,speed);
        },speed);
      }
        break;
      case 2://left
        if (get_index(maze.tab,new Barrier(current,current+size))==-1  && marked[current-1]==false) {
          timer2 = setTimeout(function () {
            move(maze,current-1,objective,marked,svg,speed);
        },speed);
      }
        break;
      case 3://bottom
        if (get_index(maze.tab,new Barrier(current+size,current+size+1))==-1  && marked[current+size]==false) {
          timer3 = setTimeout(function () {
            move(maze,current+size,objective,marked,svg,speed);
        },speed);
      }
        break;
    case 4://right
      if (get_index(maze.tab,new Barrier(current+1,current+1+size))==-1  && marked[current+1]==false) {
        timer4 = setTimeout(function () {
          move(maze,current+1,objective,marked,svg,speed);
      },speed);
    }
      break;
    }
  }
}

/** Executes the move algorithm onto the maze
  * @function solve
  * @param {maze} some Maze object
  * @param {id} some int :  the id of the svg to draw the dots
  * @param {speed} some int : specify the speed of solving the maze
*/
function solve(maze,id,speed) {
  var cell = 0;
  var objectif = (maze.size-1)*(maze.size-1)+(maze.size-3);
  var marked = [];
  for (i=0;i<=objectif;i++) {
    marked.push(false);
  }
  var svg = d3.select("#"+id),
      width = +svg.attr("width"),
      height = +svg.attr("height");
  move(maze,cell,objectif,marked,svg,speed);
}
