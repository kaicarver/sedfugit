// Simple stopwatch object

var Stopwatch = function(elem, options) {
  options = options || {};
  options.delay = options.delay || 100;
  var timer = createTimer(), offset, clock, interval;
  var reminderBell = new Audio("C5.mp3");
  var reminderInterval = 10; // when overdue, ring bell every reminderInterval seconds
  var maxReminders = 20; // when overdue, ring bell every reminderInterval seconds
  elem.appendChild(timer);
  elem.stopwatch = this;
  reset();
  
  function createTimer() { return document.createElement("span"); }
  function start()  { if (!interval) { offset = Date.now(); interval = setInterval(update, options.delay); if (clock == "") clock = 0;} }
  function stop()   { if (interval)  { clearInterval(interval); interval = null; } }
  function running(){ return interval; }
  function reset()  { clock = ""; updateDisplay(); }
  var rest_re = /rest (\d+) seconds/;
  var push_re = /(\d+) pushup/;
  function update() { clock += delta(); updateDisplay(); }
  function updateDisplay() { timer.innerHTML = render(); }
  function render() { var maxrest = elem.innerText.match(rest_re);
		      var overdue = maxrest && maxrest[1] <= time();
		      if (overdue) {
			var overdueTime = time() - maxrest[1];
			if (overdueTime % reminderInterval == 0 && overdueTime < maxReminders * reminderInterval) {
			  reminderBell.play();
			  //speak("Time to go on to the next set!");
			  // there us a bug here that this gets called multible times for same time
			  console.log("reminder...", overdueTime);
			}
		      }
		      return (overdue ? '<span style="color: red">' : "<span>") +  time() + "</span>"; }
  function pushups(){ var pushups = elem.innerText.match(push_re); return (pushups ? pushups[1] : 0); }
  function delta()  { var now = Date.now(), d = now - offset; offset = now; return d; }
  function time()   { return clock == 0 && !running() ? "" : Math.round(clock/1000); }
  
  this.start  = start;
  this.stop   = stop;
  this.running= running;
  this.reset  = reset;
  this.time   = time;
  this.render = render;
  this.pushups= pushups;
};
