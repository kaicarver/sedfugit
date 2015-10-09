// Simple stopwatch object

var Stopwatch = function(elem, options) {
  options = options || {};
  options.delay = options.delay || 100;
  var timer = createTimer(), offset, clock, interval;
  elem.appendChild(timer);
  elem.stopwatch = this;
  reset();
  
  function createTimer() { return document.createElement("span"); }
  function start()  { if (!interval) { offset = Date.now(); interval = setInterval(update, options.delay); } }
  function stop()   { if (interval)  { clearInterval(interval); interval = null; } }
  function reset()  { clock = 0; render(); }
  var rest_re = /rest (\d+) seconds/;
  function update() { clock += delta(); render(); }
  function render() { var maxrest = elem.innerText.match(rest_re); var overdue = maxrest && maxrest[1] < time(); timer.innerHTML = (overdue ? '<span style="color: red">' : "<span>") + time() + "</span>"; }
  function delta()  { var now = Date.now(), d = now - offset; offset = now; return d; }
  function time()   { return Math.round(clock/1000); }
  
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
  this.time   = time;
};
