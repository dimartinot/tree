<?php

  include 'modules/header.php'

 ?>
 <title> Graph </title>
<body>
  <div class="container">
    <h2>Undirected Graph</h2>
    <p> To create graph from raw data, please complete the text area of the "Graphic" Tab. Or feel free to generate a random one.</p>
   <ul class="nav nav-tabs">
     <li id="fst_li" class="active"><a data-toggle="tab" href="#main">Graphic & Creation Tab</a></li>
     <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Other representations
        <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a data-toggle="tab" href="#adj_m">Adjacency-matrix graph representation</a></li>
          <li><a data-toggle="tab" href="#adj_l">Adjacency-list graph representation</a></li>
        </ul>
      </li>
   </ul>
   <div class="tab-content">
     <div id="main" class="tab-pane fade in active">
      <div id="svg_container" >
        <svg id="svg_graph"></svg>
      </div>
        <div id="form_container">
          <div id="success" class="alert alert-success" style="visibility:hidden">
          </div>
          <div class="form-group">
            <label for="vertices">Number of vertices:</label>
            <input class="form-control" id="vertices" value="6">
          </div>
          <div class="form-group">
            <label for="select_edge_sep">Edges separator:</label>
            <select class="form-control" id="select_edge_sep">
              <option>Space</option>
              <option>Line break</option>
           </select>
         </div>
          <div class="form-group">
            <label for="data">Data:</label>
            <textarea class="form-control" rows="5" id="data">1-0 2-1 3-2 4-6</textarea>
          </div>
          <button class="btn btn-default" onclick="changeData()">Submit !</button>

          <h1>OR</h1>

          <div class="form-group">
            <label for="vertices">Number of vertices:</label>
            <input class="form-control" id="vertices_rdm" value="6">
          </div>
          <div class="form-group">
            <label for="Edges">Number of edges:</label>
            <input class="form-control" id="edges_rdm" value="12">
          </div>
          <button class="btn btn-default" onclick="changeDataRdm()">Random !</button>

        </div>
      </div>

      <div id="adj_m" class="tab-pane fade container">
        <h3>Adjacency-matrix graph representation</h3>
        <p> Display 1 if a vertex is connected to another by a direct edge between the one. If not, display 0</p>
        <table id="adj_m_table" class="table">
          <div id="info_m" class="alert alert-info">
            <strong>Please : </strong> complete the creation of, at least, one graph in order to fill this section
          </div>
        </table>
      </div>


      <div id="adj_l" class="tab-pane fade">
        <h3>Adjacency-list graph representation</h3>
        <p> Display a list of all the edge-connected vertices of a given vertex </p>
        <table id="adj_l_table" class="table">
          <div id="info_l" class="alert alert-info">
            <strong>Please : </strong> complete the creation of, at least, one graph in order to fill this section
          </div>
        </table>
      </div>

  </div>
<script>
    document.getElementById("svg_graph").setAttribute("width",6*$(document).width()/20);
    document.getElementById("svg_graph").setAttribute("height",4*$(document).height()/10);
    $(document).ready(function() {
      document.getElementById("fst_li").setAttribute("class","active");
      demo();
    })
</script>
</body>
