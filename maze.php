<?php

include './modules/header.php';

 ?>
 <title> Maze </title>
<body>
  <div class="container">
    <h2> Random Maze </h2>
    <p> A Maze can be seen as a specific Graph. All of the random generated ones are "perfect" mazes : this means that you can take any point on the inside of it, you will always find a way to any other. </p>
  <ul class="nav nav-tabs">
    <li id="fst_li" class="active"><a data-toggle="tab" href="#main">Graphic & Creation Tab</a></li>
    <li class="dropdown">
       <a class="dropdown-toggle" data-toggle="dropdown" href="#">Other representations
       <span class="caret"></span></a>
       <ul class="dropdown-menu">
         <li><a data-toggle="tab" href="#simple_graph">Simple Graph representation</a></li>
         <li><a data-toggle="tab" href="#adj_m">Adjacency-matrix graph representation</a></li>
         <li><a data-toggle="tab" href="#adj_l">Adjacency-list graph representation</a></li>
       </ul>
     </li>
  </ul>
  <div class="tab-content">
    <div id="main" class="tab-pane fade in active">
      <div id="maze_container">
        <svg id="svg_maze" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"/></svg>
      </div>
      <div id="form_container">
        <div id="success" class="alert alert-success" style="visibility:hidden">
        </div>
        <div class="form-group">
          <label for="maze_size">Size of the maze (max 143) :</label>
          <input class="form-control" id="maze_size" value="10">

          <label for="solve_speed">Solving speed (in ms) :</label>
          <input class="form-control" id="solve_speed" value="200">
        </div>
        <button class="btn btn-default" onclick="load_maze()">Submit !</button>
      </div>
    </div>

    <div id="simple_graph" class="tab-pane fade">
      <div id="info" class="alert alert-info" style="visibility:visible;margin-top:1vh;">
        <strong>Info :</strong> Graph option only available for Maze of size equal or lower than 50.
      </div>
      <div id="maze_graph_container" >
        <svg id="maze_graph"></svg>
      </div>
    </div>

    <div id="adj_m" class="tab-pane fade container">
      <h3>Adjacency-matrix graph representation of the Maze</h3>
      <p> Display 1 if a vertex is connected to another by a direct edge between the one. If not, display 0</p>
      <div id="info_maze_m" class="alert alert-info" style="visibility:visible;margin-top:1vh;">
        <strong>Info :</strong> Adjacency-matrix option only available for Maze of size equal or lower than 5.
      </div>
      <table id="adj_m_table" class="table">
        <div id="info_m" class="alert alert-info" style="visibility:visible;">
          <strong>Please : </strong> complete the creation of, at least, one maze in order to fill this section
        </div>
      </table>
    </div>

    <div id="adj_l" class="tab-pane fade container">
      <h3>Adjacency-list graph representation of the Maze</h3>
      <p> Display a list of all the edge-connected vertices of a given vertex </p>
      <div id="info_maze_l" class="alert alert-info" style="visibility:visible;margin-top:1vh;">
        <strong>Info :</strong> Adjacency-list option only available for Maze of size equal or lower than 5.
      </div>
      <table id="adj_l_table" class="table">
        <div id="info_l" class="alert alert-info" style="visibility:visible;">
          <strong>Please : </strong> complete the creation of, at least, one maze in order to fill this section
        </div>
      </table>
    </div>

  </div>
</div>

<script src="./static/js/maze.js"></script>
<script>
    document.getElementById("svg_maze").setAttribute("width",30*$(document).width()/100);
    document.getElementById("svg_maze").setAttribute("height",30*$(document).width()/100);
    document.getElementById("maze_graph").setAttribute("width",$("#maze_graph_container").width());
    document.getElementById("maze_graph").setAttribute("height",$("#maze_graph_container").height());
    $(document).ready(function() {
      var maze = new Maze(10);
      document.getElementById("fst_li").className="active";
      draw_maze(maze,"svg_maze");
      solve(maze,"svg_maze",200);
    })
</script>
</body>
