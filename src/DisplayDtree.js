const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = React.PropTypes;
const d3 = require('d3');

const DisplayDtree = React.createClass({
  displayName: 'DisplayDtree',

  render: function() {
    return (
      <div>
        <div ref='stats'></div>
        <div ref='d3'></div>
      </div>
    );
  },

  componentDidMount: function() {
    this.refs.stats.innerHTML = `Syntax tree: { depth: ${this.props.depth}, branching-factor: ${this.props.leafs} }`;

    const svgWidth = this.props.leafs * this.props.atomWidth;
    const svgHeight = this.props.depth * this.props.edgeDepth;

    const el = this.refs.d3;

    let svg = d3.select(el)
        .insert("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight );

    const margin = { top: 5, right: 5, bottom: 5, left: 5 };
    const width = svgWidth - margin.right - margin.left;
    const height = svgHeight - margin.top - margin.bottom;

    // ************** Generate the tree diagram	 *****************
    var i = 0;
    var tree = d3.layout.tree().size([width, height]);

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.x, d.y]; });

    svg = d3.select("svg")
      .insert("g")
      .attr("width", width )
      .attr("height", height )
      .attr("transform",
        `translate(${margin.left},${margin.top + 15})`
      );

    const treeData = JSON.parse(this.props.jsonTree);

    const root = treeData[0];

    update(root);

    const edgeDepth = +this.props.edgeDepth;

    function update(source) {

      // Compute the new tree layout.
      const nodes = tree.nodes(root).reverse();
      const links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) {
        d.y = d.depth * 40;
        // d.y = d.depth * edgeDepth;
      });

      // Declare the nodes…
      const node = svg
        .selectAll("g.node")
        .data(nodes, function(d) {
          return d.id || (d.id = ++i);
        });

      // Enter the nodes.
      const nodeEnter = node.enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      nodeEnter
        .append("text")
        .attr("y", function(d) {
          // return d.children || d._children ? -18 : 18;
          return 0;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) {
          return d.content;
        })
        .style("fill-opacity", 1)
        .style("font", "12px sans-serif");


      nodeEnter
        .append("rect")
        .attr("width", function(d) {
          if (this.previousElementSibling.clientWidth) {
            return this.previousElementSibling.clientWidth + 10;
          } else { //firefox (gecko-based browsers) & edge (all ie-brosers) have clientWidth 0
            return this.previousElementSibling.childNodes[0].length * 5 + 10;
          }
        })
        .attr('height', function() {
          if (this.previousElementSibling.clientWidth) {
            return this.previousElementSibling.clientHeight + 8;
          } else {
            return 20;
          }
        })
        .attr('rx', 10).attr('ry', 10)
        .style("fill", function(d) {
          if (d.children) {
            return 'DarkSeaGreen';
          } else {
            return 'CadetBlue';
          }
        })
        .style('opacity', '0.5')
        .attr('transform', function(d){
            var xdev, ydev;
            if (this.previousElementSibling.clientWidth) {
              xdev = (this.previousElementSibling.clientWidth+10)/2;
              ydev = (this.previousElementSibling.clientHeight+8)/2;
            } else {
              xdev = (this.previousElementSibling.childNodes[0].length * 5 + 10)/2;
              ydev = 10;
            }
            return "translate("+ -xdev + ',' + -ydev + ')';
        });


      // Declare the links…
      const link = svg
        .selectAll("path.link")
        .data(links, function(d) {
          return d.target.id;
        });

      // node.transition().duration(1000).remove();
      node.exit().remove();

      // Enter the links.
      link.enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal)
        .style("fill", "none")
        .style("stroke", "#ccc")
        .style("stroke-width", "2px");

      // link.transition().duration(1000).remove();
      link.exit().remove();
    }

    /*
        // d3.select("svg").selectAll("*").remove();
        d3.select("svg").remove();
            // this.updateTree(this.props);
      // },

      // componentWillUpdate: function(nextProps) {
      //         var el = this.getDOMNode(); // This is de div we are rendering
      //         d3.select(el.svg).selectAll("*").remove();
      //         this.updateTree(nextProps);
      //     },

      // getDefaultProps: function() {
      //     return {
      //         width: 340,
      //         height: 280
      //     };
      // },

      // var d3StringPlus = JSON.stringify(treeData, null, 2);
      // d3Editor.setValue('');
      // d3Editor.insert(d3StringPlus);

    */
  },

});

module.exports = DisplayDtree;
