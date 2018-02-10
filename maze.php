<?php

include './modules/header.php';

 ?>
 <title> Maze </title>
<body>
  <div id="maze_container">
    <svg id="svg_maze" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"/>



    </svg>



  </div>

  <div id="form_container">
    <div id="success" class="alert alert-success" style="visibility:hidden">
    </div>
    <div class="form-group">
      <label for="maze_size">Size of the maze :</label>
      <input class="form-control" id="maze_size" value="10">
    </div>
    <button class="btn btn-default" onclick="load_maze()">Submit !</button>

  </div>
<script src="./static/js/maze.js"></script>
<script>
    document.getElementById("svg_maze").setAttribute("width",35*$(document).width()/100);
    document.getElementById("svg_maze").setAttribute("height",35*$(document).width()/100);
    $(document).ready(function() {
      var maze = new Maze(10);
      draw_maze(maze);
    })
</script>
</body>
