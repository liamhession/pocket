(function() {

var n, lastPoints;
n = 90;
lastPoints = [];
for (var i=0;i<n;i++) {
	lastPoints[i] = [0.5,0.5];
}

return function() {
    var p = [];

    var r = 0.45 + 0.005 * soundData.bass;
    var stretchFactor = 0.95;

    var lastWave = 0;
    for (var i=0;i<n;i++) {
      var wave = soundData.waveDataL[(i/n*256)>>0] * 2;
      wave = (wave * 0.1 + lastWave * 0.9);
      lastWave = wave;

      var d = i/(n-1) * PI + PI;
      var d2 = d + PI2 * 1/n;
      var r2 = r + wave * 0.05;

      var x = .5 + cos(d) * r2;
      var y = .5 + sin(d) * r2;

      p[i] = [x,y+0.15];
      var lp = lastPoints[i];
      lp = [
        (lp[0] - 0.5) * stretchFactor + 0.5,
        (lp[1] - 0.5) * stretchFactor + 0.5,
      ];

      drawPath([p[i], lp], false, null, "hsl(200,80%,60%)", 1.5 + 0.4 * soundData.mid);

      lastPoints[i] = p[i];
    }

    drawPath(p, soundData.bass > 1.2, "rgba(0,0,0,0.1)", "white", 0.5);

    drawRect(0,0.655,1,0.25, "black"); // clear the spectrum bars before stretching

    stretch(stretchFactor, stretchFactor, 0.5, 0.5);

    var m = 32;
    var seg = 0.85 / m;
    var h, spec;
    for (var i=0;i<m;i++) {
      spec = pow(soundData.eqDataL[(i/m*256)>>0], 0.4);
      h = spec * 0.1;
      drawRect(0.08 + seg * i, 0.655, seg * 0.5, h, "rgba(150,200,250,1.0)");
    }

    commit();

};

})();
