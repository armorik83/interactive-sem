angular.module('egrid-sem', [])
  .controller('SemController', ['$scope', function($scope) {
    var dag = egrid.sem();
    var SDict;

    function calcPath() {
      var nodes = dag.activeNodes();
      var links = dag.activeLinks();
      var nodesDict = {};
      nodes.forEach(function (node, i) {
          nodesDict[node.text] = i;
      });
      var n = nodes.length;
      var alpha = links.map(function (link) {
          return [nodesDict[link.source.text], nodesDict[link.target.text]];
      });
      var sigma = nodes.map(function (_, i) {
          return [i, i];
      });
      var S = nodes.map(function (node1) {
          return nodes.map(function (node2) {
              return SDict[node1.text][node2.text];
          });
      });
      sem(n, alpha, sigma, S, (function (result) {
          var A = nodes.map(function (_) {
              return nodes.map(function (_) {
                  return 0;
              });
          });
          result.alpha.forEach(function (r) {
              A[r[0]][r[1]] = r[2];
          });
          $scope.gfiValue = result.GFI;
          $scope.linkText = "結果,原因,係数\n";
          links.forEach(function (link) {
              link.coef = A[nodesDict[link.source.text]][nodesDict[link.target.text]];
              $scope.linkText += link.source.text + "," + link.target.text + "," + link.coef + "\n";
          });
          dag.draw().focusCenter();
          $scope.$apply();
      }));
    }

    function loadData(nodes, links, S) {
      SDict = {};
      nodes.forEach(function (node) {
          SDict[node] = {};
      });
      nodes.forEach(function (node1, i) {
          nodes.forEach(function (node2, j) {
              SDict[node1][node2] = S[i][j];
          });
      });

      var egmNodes = nodes.map(function (d) {
          return new egrid.Node(d);
      });
      var egmLinks = links.map(function (d) {
          return new egrid.Link(egmNodes[d.target], egmNodes[d.source]);
      });

      dag.nodes(egmNodes).links(egmLinks);
      $scope.items = dag.nodes();

      var n = nodes.length;
      var alpha = links.map(function (d) {
          return [d.target, d.source];
      });
      var sigma = nodes.map(function (_, i) {
          return [i, i];
      });
      sem(n, alpha, sigma, S, (function (result) {
          var A = dag.nodes().map(function (_) {
              return dag.nodes().map(function (_) {
                  return 0;
              });
          });
          result.alpha.forEach(function (r) {
              A[r[0]][r[1]] = r[2];
          });
          $scope.gfiValue = result.GFI;
          $scope.linkText = "結果,原因,係数\n";
          dag.links().forEach(function (link) {
              link.coef = A[link.source.index][link.target.index];
              $scope.linkText += link.source.text + "," + link.target.text + "," + link.coef + "\n";
          });
          dag.draw().focusCenter();
          $scope.$apply();
      }));
    }

    var nodes = [
        '総合評価',
        '使いたさ',
        '書きやすさ',
        '便利さ',
        '快適さ',
        '安心さ',
        '芯の太さ',
        '持ち運びやすさ',
        '持ちやすさ',
        '太さ',
        '重さ'
    ];
    var links = [
        { source: 1, target: 0 },
        { source: 2, target: 0 },
        { source: 3, target: 0 },
        { source: 4, target: 0 },
        { source: 5, target: 0 },
        { source: 6, target: 2 },
        { source: 8, target: 2 },
        { source: 10, target: 2 },
        { source: 7, target: 3 },
        { source: 8, target: 3 },
        { source: 8, target: 4 },
        { source: 8, target: 5 },
        { source: 10, target: 5 },
        { source: 9, target: 7 },
        { source: 10, target: 7 },
        { source: 9, target: 8 }
    ];
    var S = [
        [1.180487805, 0.939634146, 1.021341463, 0.646341463, 0.96402439, 0.322560976, 0.058536585, 0.117682927, 1.021341463, -0.231097561, -0.170731707],
        [0.939634146, 1.18902439, 0.915243902, 0.565243902, 0.895731707, 0.176829268, 0.106097561, 0.055487805, 0.915243902, -0.132926829, -0.02195122],
        [1.021341463, 0.915243902, 1.552439024, 0.427439024, 1.007317073, 0.018292683, 0.06097561, 0.154878049, 1.552439024, -0.179268293, -0.369512195],
        [0.646341463, 0.565243902, 0.427439024, 1.102439024, 0.482317073, -0.031707317, -0.13902439, 0.179878049, 0.427439024, -0.104268293, -0.219512195],
        [0.96402439, 0.895731707, 1.007317073, 0.482317073, 1.07195122, 0.179878049, 0.057926829, 0.114634146, 1.007317073, -0.237804878, -0.133536585],
        [0.322560976, 0.176829268, 0.018292683, -0.031707317, 0.179878049, 0.962195122, 0.157317073, -0.038414634, 0.018292683, 0.030487805, 0.128658537],
        [0.058536585, 0.106097561, 0.06097561, -0.13902439, 0.057926829, 0.157317073, 0.474390244, -0.15304878, 0.06097561, 0.093292683, -0.087804878],
        [0.117682927, 0.055487805, 0.154878049, 0.179878049, 0.114634146, -0.038414634, -0.15304878, 0.809756098, 0.154878049, -0.308536585, -0.58902439],
        [1.021341463, 0.915243902, 1.552439024, 0.427439024, 1.007317073, 0.018292683, 0.06097561, 0.154878049, 1.552439024, -0.179268293, -0.369512195],
        [-0.231097561, -0.132926829, -0.179268293, -0.104268293, -0.237804878, 0.030487805, 0.093292683, -0.308536585, -0.179268293, 1.051219512, 0.509146341],
        [-0.170731707, -0.02195122, -0.369512195, -0.219512195, -0.133536585, 0.128658537, -0.087804878, -0.58902439, -0.369512195, 0.509146341, 1.256097561]
    ];

    dag.registerUiCallback(function () {
      $scope.$apply();
      calcPath();
    })
    loadData(nodes, links, S);

    var width = $("#sem-analysis-display").width();
    var height = $("#sem-analysis-display").height();
    d3.select("#sem-analysis-display svg").call(dag.display(width, height));

    $scope.gfiValue = 0;

    $scope.removeNode = function() {
      dag.draw().focusCenter();
      calcPath();
    };

    $scope.loadFile = function() {
      var file = d3.select("#fileInput").node().files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = d3.csv.parse(e.target.result);
        attributes = [];
        for (attr in data[0]) {
          attributes.push(attr);
        }
        var x = attributes.map(function(key) {
          return data.map(function(d) {
            return d[key];
          });
        });
        cov(x, function(cov) {
          var S = cov.data;
          loadData(attributes, [], S);
          $scope.$apply();
        });
      };
      reader.readAsText(file, d3.select(".encoding:checked").node().value);
    }
  }])
  ;
