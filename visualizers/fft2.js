(function() {

var n = 64;
var mode = 0;
var avgLevels = [];
for (var i=0;i<n;i++)
  avgLevels[i] = 0;

var maxLevels = [];
for (var i=0;i<n;i++)
  maxLevels[i] = {h:0,t:0};

return function() {
    decay(0.2);

    var levels = [];
    for (var i=0;i<n;i++)
      levels[i] = 0;
    for (var i=0;i<128;i++)
      levels[(i/128*n)>>0] += soundData.eqDataL[i];
    for (var i=0;i<n;i++)
      avgLevels[i] = avgLevels[i]*0.5 + levels[i]*0.5;

    var n1 = 1 / n, n2 = 1 / (n * 2);
    for (var i=0;i<n;i++) {
      var level = 0;
      if (avgLevels[i] > 0)
        level = ((levels[i] - avgLevels[i]) + (levels[i] / avgLevels[i]) + (levels[i] * 0.4)) * 1.3; 
      var h = pow(max(0,level),0.85)*0.15;
      h = ((h / n2) >> 0) * n2;
      var x = 1/(n-1)*i;
      for (var j=h;j>0;j-=n2)
        drawRect(x, 1-h + j, n1, n2, "green");

      if (h > maxLevels[i].h)
        maxLevels[i] = {h:h, t:time};
    }
    for (var i=0;i<n;i++) {
      var h = maxLevels[i].h;
      drawRect(1/(n-1)*i, 1-h, 1/n, 1/n * 0.5, "rgb(255,32,32)");
      if (time - maxLevels[i].t > 1)
        maxLevels[i].h = 0;
    }
    commit();
};

})();
