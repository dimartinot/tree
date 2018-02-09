<?php

  include 'modules/header.php'

 ?>
 <title> Graph </title>
<body>
  <div id="svg_container" >
    <svg id="svg_graph"></svg>
  </div>
    <div id="form_container">
      <div class="form-group">
        <label for="vertices">Number of vertices:</label>
        <input class="form-control" id="vertices">
      </div>
      <div class="form-group">
        <label for="select_edge_sep">Edges separator:</label>
        <select class="form-control" id="select_edge_sep">
         <option>Line break</option>
         <option>Space</option>
       </select>
     </div>
      <div class="form-group">
        <label for="data">Data:</label>
        <textarea class="form-control" rows="5" id="data"></textarea>
      </div>
      <button class="btn btn-default" onclick="changeData()">Submit</button>
    </div>
<script>
    document.getElementById("svg_graph").setAttribute("width",$(document).width()/2);
    document.getElementById("svg_graph").setAttribute("height",$(document).height()/2);

    demo();
</script>
</body>
