function get_index(tab,obj) {
  for (i=0;i<tab.length;i++) {
    if ((tab[i].start==obj.start && tab[i].end==obj.end) || (tab[i].start==obj.end && tab[i].end==obj.start)) {
      return i;
    }
  }
  return -1;
}

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
* Constructor of a barrier : having a strating and an end point. Both are integers
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
}



function draw_maze(maze) {
  var svg = d3.select("svg"),
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

function load_maze() {
  var size=parseInt(document.getElementById('maze_size').value);
  if (!isNaN(size)) {
    $("#svg_maze").empty();
    console.log("ah");
    var maze = new Maze(Math.floor(Math.abs(size)));
    draw_maze(maze);
    document.getElementById('success').style.visibility = "visible";
    document.getElementById('success').setAttribute("class","alert alert-success");
    document.getElementById('success').innerHTML= "<strong>Success !</strong> Maze correctly initialized.";
  } else {
    document.getElementById('success').style.visibility = "visible";
    document.getElementById('success').setAttribute("class","alert alert-failure");
    document.getElementById('success').innerHTML= "<strong>Failure ! </strong> Maze incorrectly initialized : TypeError (NaN)";
  }
}
