A live demo of this project is available here : <http://www.dimartinot.com>

# Graphs

I have based this project on the "Lecture slides" from [Robert Sedgewick] and [Kevin Wayne]. You can find them at the following [link](https://algs4.cs.princeton.edu/lectures/). I want to draw your attention on some specific lectures that were very helpful in the realisation of this part of my website :   

  - Binary Search Trees (3.2)
  - Undirected Graph (4.1)

# Techs used
This part takes these technologies, in addition of all already used ones:

* [Object Oriented JavaScript] - Useful to work with dense amount of datas
* [Bootstrap] - Unavoidable in order to have a minimum well-designed website
* [d3.js] - Powerful JavaScript library for visualizing data with HTML, SVG, and CSS (used for the graph representation)

And of course this project itself is open source with a [public repository][dill] on GitHub.

# Programming Concept
### Undirected Graphs
In order to have working demos in my project, I needed to apply strong concepts. I learnt all of them from the lecture slides I quoted before and it granted me some Graph Analysis skills I did not even know before.  
Firstly, concerning the graph representation, I have developped a JavaScript object defined this way : 
```javascript
var o = new Graph(nbVertices,tab);
```
where *nbVertices* defines the number of vertices in the graph. This is more a safe way to verify the integrity of the data given through the *tab* variable. This one is a table of Edges, another object I created. Its definition is as followed :
```javascript
var edge = new Edge(start,end);
```
where *start* and *end* are variables of any kind of primitive type such as an integer, a float or even a string as long as both are of the same type. You might have noted that the denomination is not very senseful as there actually is neither start nor end in the edges as they are undirected. But, I have thought that, describing it this way, it would be more understandable.

In order to have some kind of interaction with the user and the available technologies I developped, I offer him two options :
* User Written Data (with selectable formats)
* Random Generated Data (with constraints)

##### User Written Data
For the first option, the user has to complete 3-input form (I call it a form for the explicating process, but if you check out the HTML code, none of the inputs are embed in any kind of form) :
* Number of Vertices : Has to be known by the user and has to be an integer, obviously.
* Edges separator : Can be a space or a line break, we will see both format being used in a further example
* Data : Last but certainly not least, the data input. It has to respect the two constraints the user gave the site before in order to have any kind of sense to the eyes of the functions that will be processing it.

Now, two examples of the same graph written in both possible ways. First, the space separator :
```
1-0 2-1 3-2 4-6
```
And, secondly, the line break separator :
```
1-0
2-1
3-2
4-6
```

Three things are also good to be noted : 
* The format used to describe an edge is very strict and does not vary : it is "start"-"end", always with a '-', so be careful if you want to include one in any string vertices.
* The order of declaration of the edges does not have any impact on the outputed result.
* "start"-"end" and "end"-"start" edges are similar

##### Random Generated Data
For the second option, the user has to complete a 2-input form (still not *really* a form) :
* Number of vertices : this time, it is not needed for safety purposes but, obviously, for creation purposes. The vertices will be numbered from 1 to the number of vertices entered. Then, the type of the vertex is not customizable.
* Number of edges : number of edges to be created. Please note that a single edge can be created multiple times as if it was developed otherwise, huge performance issues tended to appear.

### Other representations
As I explored the lecture slides about the Undirected Graphs, I encountered brand new ways to describe a graph. Then, I decided to implement two of them, as I thought they would be very helpful to visualize a graph in a more mathematical way than graphical.

##### Adjacency-matrix representation
For the further explantions, we will note "n" the number of vertices, "a" the matrix.
The whole concept behind the Adjacency-matrix representation is to have a matrix of n² 0 and 1 where the a(i,j) element would equal 0 if there was no edge between the vertex i and the vertex j. It would equal 1 if there was an edge.
The advantages of this method is that it uses a higly versatile mathematical format we can take advantage of. The unavoidable huge drawbacks of this method is that you will always deal with a n² sized structure wether you have 4 edges or ten times more. In most cases, the big majority of the data will be pointless. So instead of describing the presence or the absence of and edge bewteen two vertices, it might be more efficient to only "list" all existing vertices in an efficient way.

##### Adjacency-list representation
This representation follows the concept I talked about earlier : it consists in an array of lists. The array is sized "n" and the i-th element is a list of all vertices it has edges with. This method has, then, a very variable way of sizing data as it can go from 1 to n², depending on the number of vertices. When its a more algorithmic way to see a graph, it is pretty hard to manipulate in comparison to the adjacency-matrix.

### Random Maze
Plenty of examples of graph application were given in the lecture slides but the one that caught my eye was the Maze. A maze is a fascinating concept and the idea of representing it as a graph is even more fascinating.  
in order to implement the maze, I created again two new objects : one to describe a barrier and one to describe the maze in itself.
A barrier is implemented as followed :
```javascript
var o = new Barrier(start,end);
```
where *start* and *end* describe the points linked by a barrier. I will go back to the implementation concept after.
A maze is implemented as followed :
```javascript
var o = new Maze(size);
```
where *size* is the root of the number of points contained in the maze. For a 10-length maze, there will actually be 9 cell as you can only draw 9 segments between 10 aligned points. That is the whole conceptualization of my Maze.  
First of all, I do not see my maze as an array of cell but as an array of barriers between points. If you would have to make a parallel between these two ways of conceptualization, I would suggest to see the points as for the, n-1 first, top left corner of the cell and, for the n one, the top right corner. This is a more versatile way to implement a Maze, at least in my opinion.  

The user has two options to personnalize the maze :
* He can choose the size of the maze (the root of the global amount of points describin the maze)
* He can choose the speed at wich the cells are visited during the solving process

But in order to properly solve a maze, it has to be a "perfect" one.

##### Creation of a prefect Maze
During its initialisation, the Maze will be a list of all possible barriers. In order to create a "perfect" maze (perfect in the sense that you can go from one point to any other), I use the following technique : I start from the top left point and randomly chose one of its neighbour and move onto it by "knocking down" the existing barrier between the two. Then, I mark these points as "visited". Further processes will be to, recursively, visit all "cells" of the Maze and "knocking down" the appropriate barriers. This will create a "perfect" solvable maze.

##### Solving a maze
The process of solving a maze is simple : recursively run throught the maze until you encounter the end of it. This is a pretty basic solving algorithm, I would like to improve it and currently am searching for ways to do so. But, for an educational purpose, I have showed the whole solving process with dots appearing in the center of the encountered cells. All the dots are red except the one of the end of the maze.

##### Graph representation of the maze
One way to represent the maze as a graph is to consider as a vertex every point of the maze and as an edge every connected cell (represented by its top left corner point). I can, then, use all the other representations available for a simple graph. But as a perfect maze has a high number of connections between cells, the representations are not very readable. I have, then, decided to put a limit of creation of these representation with the following criterias :
* A graph is only drown for a maze with a size equal or lower than 50
* The adjacency-list and adjacency-list are only drawn for maze of size equal or lower than 5

# See you !
I hope the solution I implemented pleased you and until next time, I will leave you with this quote from the [Emily Oster], a famous american economist: 
> The greatest moments are
> those when you see the
> result pop up in a graph or in
> your statistics analysis - that
> moment you realise you
> know something no one else
> does and you get the
> pleasure of thinking about 
> how to tell them


   [robert sedgewick]: <https://en.wikipedia.org/wiki/Robert_Sedgewick_(computer_scientist)>
   [kevin wayne]: <https://www.cs.princeton.edu/people/profile/wayne>
   [Object Oriented JavaScript]: <https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS>
   [Bootstrap]: <https://getbootstrap.com/>
   [d3.js]: <https://d3js.org/>
   [dill]: <https://github.com/dimartinot/tree>
   [Emily Oster]: <https://www.brown.edu/research/projects/oster/>
