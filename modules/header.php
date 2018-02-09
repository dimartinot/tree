
<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="./static/css/tree.css">
  <script src="./static/js/tree.js"></script>
  <script src="./static/d3/d3.min.js"></script>
  <script src="./static/js/index.js"></script>
</head>
<header>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="./">Graph/Tree Visualization</a>
      </div>
      <ul class="nav navbar-nav">
        <li id="Home"><a href="./" class="list-item">Home</a></li>
        <li id="Graph"><a href="graph.php" class="list-item">Graph</a></li>
        <li id="BinTree"><a href="bin.php" class="list-item">Binary Tree</a></li>
      </ul>
    </div>
  </nav>

</header>
<script>
window.onload = function() {
  $('.nav').find('.active').removeClass("active");
  $("#"+document.title).addClass("active");
}
</script>
