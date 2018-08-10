var navigate = (function() {
  $('.dd').toggle();
  $('.dd_btn').click(function() {
    var dataName = $(this).attr('data-name');
    $('.dd').hide();
    $('.' + dataName).toggle();
  });
})();

(function() {

    'use strict';

    var cvs, //canvas
      ctx, //canvas context
      gridWidth, //draw width (2 cells wider than the actual canvas)
      gridHeight, //draw height (2 cells taller than the actual canvas)
      vRange,
      cRange,
      maxCols,
      maxRows,
      oAmount,
      imgd, imge,
      base_image,
      saveBtn,
      cvs2,
      ctx2,
      loader,
      numColours,
      preset;
    var points = [];
    var cellSize = 50; //size of a single grid square
    var variance = 0.2;
    var ovA = 0.5;
    var colours = ["#22bbee", "#8855cc", "#ee2266", "#ee7722"];

    function init() {
      //Add on load scripts
      cvs = document.getElementById("canvas");
      cRange = document.getElementById("cell-size");
      vRange = document.getElementById("variance");
      oAmount = document.getElementById("oamount");
      saveBtn = document.getElementById('save');
      ctx = cvs.getContext("2d");
      cvs2 = document.getElementById("canvas2");
      ctx2 = cvs2.getContext("2d");
      numColours = document.getElementById("numColours");

      preset = document.getElementById("preset-size");

      preset.addEventListener("change", function() {
        var temp5 = preset.value.split("-");
        console.log(temp5);

        document.getElementById('width').value = parseInt(temp5[0]);
        document.getElementById('height').value = parseInt(temp5[1]);
      }, false);


      var setSize = function(w, h) {
        cvs.width = w;
        cvs.height = h;

        gridWidth = cvs.width + cellSize * 2;
        gridHeight = cvs.height + cellSize * 2;

        /*    cvs2.width = cvs.width;
            cvs2.height = cvs.height;
            //Repopulate inputs
            document.getElementById('width').value = w;
            document.getElementById('height').value = h;
          }

          var setCols = function() {
            for (var i = 0; i < numColours.value; i++) {
              var temp = document.createElement("input");
              temp.type = "color";
              temp.id = "colour" + (i + 1);

              document.getElementById("colour-div").appendChild(temp);
              document.getElementById("num-colours").innerHTML = numColours.value;
              temp.value = colours[i];
              temp.addEventListener("change", function() {
                //document.getElementById("colour-div").innerHTML = "";
                //setCols();
                drawBG(ctx2, cvs2);
                loader.style.display = "";
                var blob = window.setTimeout(function() {
                  pointFun();
                }, 2);
              }, false);
            }
          }

          setCols();

          setSize(1280, 720);
          //base_image = new Image();
          //base_image.crossOrigin = "Anonymous";
          //base_image.src = 'download.png';
          //base_image.onload = function () {
          drawBG(ctx2, cvs2);
          loader = document.getElementById("loader");
          pointFun();
          //}
          var tout = 0;
          numColours.addEventListener("change", function() {
            document.getElementById("colour-div").innerHTML = "";
            setCols();
            drawBG(ctx2, cvs2);
            loader.style.display = "";
            var blob = window.setTimeout(function() {
              pointFun();
            }, tout);
          }, false);
          cRange.addEventListener("change", function() {
            loader.style.display = "";
            var blob = window.setTimeout(function() {
              pointFun();
            }, tout);
          }, false);
          vRange.addEventListener("change", function() {
            loader.style.display = "";
            var blob = window.setTimeout(function() {
              pointFun();
            }, tout);
          }, false);
          oAmount.addEventListener("change", function() {
            loader.style.display = "";
            var blob = window.setTimeout(function() {
              pointFun(true);
            }, tout);
          }, false);

          var sizeBtn = document.getElementById('size-btn');
          sizeBtn.addEventListener("click", function() {
            var tempw = document.getElementById('width').value;
            var temph = document.getElementById('height').value;
            setSize(tempw, temph);
            drawBG(ctx2, cvs2);
            console.log(tempw + " : " + temph)
            pointFun();
          })

          //saveBtn.addEventListener("click",saveImage,false);
        }
        //Particle constructor
        function point() {
          /*this.x = Math.random()*cvs.width;;
          this.y = Math.random()*cvs.height;
          this.vx = (Math.random()*2)-1;
          this.vy = (Math.random()*2)-1;*/
        //points.push(this);
      }

      function drawBG(context, canvas) {
        context.clearRect(0, 0, cvs.width, cvs.height);
        context.globalCompositeOperation = "multiply";
        var bg = context.createLinearGradient(0, 0, canvas.width, 0);

        //Duskish gradient
        /*bg.addColorStop(0,"#0e1b32");
        bg.addColorStop(0.8,"#c28993");
        bg.addColorStop(1,"#ffc7af");*/

        //Pink/Purple Gradient
        /*bg.addColorStop(0,"#85c");
        bg.addColorStop(1,"#d14");*/

        //Whitish
        /*bg.addColorStop(0,"#f8f8f8");
        bg.addColorStop(1,"#ddd");*/
        var inputs = document.getElementById("colour-div").getElementsByTagName('input');
        //console.log(inputs.length);
        for (var i = 0; i < inputs.length; i++) {
          if (inputs.length > 1) {
            bg.addColorStop(i / (inputs.length - 1), inputs[i].value);
            console.log(inputs[i].value);
          } else {
            bg = inputs[i].value;
          }
          colours[i] = inputs[i].value;
        }

        context.fillStyle = bg;
        context.beginPath();
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.closePath();
        context.fill();

        context.beginPath();
        var bg2 = context.createLinearGradient(0, 0, 0, cvs.height);
        bg2.addColorStop(0, "#fff");
        bg2.addColorStop(1, "#ccc");
        context.fillStyle = bg2;
        context.fillRect(0, 0, cvs.width, cvs.height);
        context.closePath();
        context.fill();
        context.globalCompositeOperation = "source-over";
        //ctx.drawImage(base_image, 0, 0);
        if (context == ctx2) {
          imgd = context;
        } else if (imgd.getImageData(0, 0, 1, 1).data[3] < 255 || imgd.getImageData(canvas.width - 1, canvas.height - 1, 1, 1).data[3] < 255) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }


      }

      function saveImage() {
        // body...
        var dataURL = canvas.toDataURL();
        saveBtn.href = dataURL;
      }

      function draw(obj, rand) {

        var red, blue, green, alpha;

        var setColour = function(xpos, ypos) {
          if (xpos < 0) {
            xpos = 0;
          }
          if (xpos > cvs.width - 1) {
            xpos = cvs.width - 1;
          }
          if (ypos < 0) {
            ypos = 0;
          }
          if (ypos > cvs.height - 1) {
            ypos = cvs.height - 1;
          }
          red = imgd.getImageData(xpos, ypos, 1, 1).data[0];
          green = imgd.getImageData(xpos, ypos, 1, 1).data[1];
          blue = imgd.getImageData(xpos, ypos, 1, 1).data[2];
          alpha = imgd.getImageData(xpos, ypos, 1, 1).data[3];

        }

        var filler = function() {
          if (rand) {
            var temp = (Math.random() * 2 * ovA) - ovA;
            ctx.fillStyle = "rgba(" + Math.round(red - red * temp) + ", " + Math.round(green - green * temp) + ", " + Math.round(blue - blue * temp) + ", " + alpha / 255 + ")";
          } else {
            ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha / 255 + ")";
          }
        }

        for (var i = 0; i < points.length; i++) {
          if (obj == points[i] && obj.r % 2 == 0 && points[i + maxCols + 1] && obj.c < maxCols - 1) {
            //setColour(obj.x,obj.y+2*cellSize/3);
            setColour(Math.round(obj.c / maxCols * gridWidth), Math.round(obj.r / maxRows * gridHeight + 2 * cellSize / 3));
            filler();
            //console.log(obj.c);
            ctx.beginPath();
            ctx.moveTo(obj.x, obj.y);
            ctx.lineTo(points[i + maxCols].x, points[i + maxCols].y);
            ctx.lineTo(points[i + maxCols + 1].x, points[i + maxCols + 1].y);
            ctx.closePath();
            ctx.fill();
            //ctx.stroke();

            //setColour(obj.x+cellSize/2,obj.y+cellSize/3);
            setColour(Math.round(obj.c / maxCols * gridWidth + cellSize / 2), Math.round(obj.r / maxRows * gridHeight + cellSize / 3));
            filler();
            //ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.moveTo(obj.x, obj.y);
            ctx.lineTo(points[i + 1].x, points[i + 1].y);
            ctx.lineTo(points[i + maxCols + 1].x, points[i + maxCols + 1].y);
            ctx.closePath();
            ctx.fill();
            //console.log("YES");
          }
          if (obj == points[i] && obj.r % 2 != 0 && points[i + maxCols + 1] && obj.c > 0) {

            //setColour(obj.x-cellSize/2,obj.y+cellSize/3);
            setColour(Math.round((obj.c - 1) / maxCols * gridWidth), Math.round(obj.r / maxRows * gridHeight + cellSize / 3));
            //if (!setColour(Math.round((obj.c-1)/maxCols*gridWidth),200)) {console.log(obj)}
            filler();
            ctx.beginPath();
            ctx.moveTo(obj.x, obj.y);
            ctx.lineTo(points[i - 1].x, points[i - 1].y);
            ctx.lineTo(points[i + maxCols - 1].x, points[i + maxCols - 1].y);
            ctx.closePath();
            ctx.fill();
            //ctx.stroke();

            //setColour(obj.x,obj.y+2*cellSize/3);
            setColour(Math.round((obj.c - 1) / maxCols * gridWidth + cellSize / 2), Math.round(obj.r / maxRows * gridHeight + 2 * cellSize / 3));
            filler();
            //ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.moveTo(obj.x, obj.y);
            ctx.lineTo(points[i + maxCols - 1].x, points[i + maxCols - 1].y);
            ctx.lineTo(points[i + maxCols].x, points[i + maxCols].y);
            ctx.closePath();
            ctx.fill();
            //console.log("NO");
          }
        }
      }
      //Point generator
      function generatePoints(amount) {
        points = [];
        var temp;
        var row = 0;
        var col = 0;
        for (var i = 0; i < amount; i++) {
          temp = new point();
          if (row % 2 == 0) {
            temp.x = (col * cellSize) - cellSize;
            temp.x = temp.x + (Math.random() - .5) * variance * cellSize * 2;
          } else {
            temp.x = (col * cellSize) - cellSize - cellSize / 2;
            temp.x = temp.x + (Math.random() - .5) * variance * cellSize * 2;
          }
          temp.y = (row * cellSize * 0.866) - cellSize;
          temp.y = temp.y + (Math.random() - .5) * variance * cellSize * 2;
          temp.r = row;
          temp.c = col;
          points.push(temp);
          col = col + 1;
          if ((i + 1) % maxCols == 0) {
            row = row + 1;
            col = 0;
          }
        }
        //console.log(points);
      }

      function addRand(a, b) {
        return (Math.random() * b * a - (b / 2))
      }

      function pointFun(drawOnly) {
        if (drawOnly === true) {
          //do nothing
        } else {
          cellSize = (cRange.value * 3) + 30;
          variance = vRange.value / 100;
          gridWidth = cvs.width + cellSize * 2;
          gridHeight = cvs.height + cellSize * 2;
          maxCols = Math.ceil(gridWidth / cellSize) + 2;
          maxRows = Math.ceil(gridHeight / (cellSize * 0.865))
          //console.log(maxCols);
          var x = maxCols;
          var y = maxRows;
          generatePoints(x * y);
        }
        ovA = oAmount.value / 100;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        drawBG(ctx, cvs);
        for (var i = 0; i < points.length; i++) {
          draw(points[i], true);
        };
        saveImage();
        loader.style.display = "none";
      }

      //Execute when DOM has loaded
      document.addEventListener('DOMContentLoaded', init, false);

    })();
