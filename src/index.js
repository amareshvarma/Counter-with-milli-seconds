(function () {
  var hour = document.querySelector(".hour");
  var min = document.querySelector(".minutes");
  var sec = document.querySelector(".seconds");
  var msec = document.querySelector(".milliseconds");

  var startBtn = document.querySelector(".start");
  var stopBtn = document.querySelector(".stop");
  var resetBtn = document.querySelector(".reset");
  var startTimer = null;

  startBtn.addEventListener("click", () => {
    // console.log("start");

    if (
      hour.value == 0 &&
      min.value == 0 &&
      sec.value == 0 &&
      msec.value == 0
    ) {
      return;
    }

    function timer() {
      console.log("inside timer");
      if (
        hour.value == 0 &&
        min.value == 0 &&
        sec.value == 0 &&
        msec.value == 0
      ) {
        hour.value = "";
        min.value = "";
        sec.value = "";
        msec.value = "";
        return;
      }
      if (msec.value > 100) {
        sec.value = parseInt(sec.value) + Math.floor(msec.value / 100);
        msec.value = msec.value % 100;
      }
      if (sec.value > 60) {
        min.value = parseInt(min.value) + 1;
        sec.value -= 59;
      }
      if (min.value > 60) {
        hour.value = parseInt(hour.value) + 1;
        min.value = min.value - 60;
      }

      if (msec.value != 0) {
        msec.value = `${msec.value < 10 ? "00" : ""}${msec.value - 1}`;
      } else if (msec.value == 0 && sec.value != 0) {
        msec.value = 100;
        sec.value = `${sec.value < 10 ? "0" : ""}${sec.value - 1}`;
      } else if (sec.value == 0 && min.value != 0) {
        min.value = `${min.value < 10 ? "0" : ""}${min.value - 1}`;
        sec.value = 60;
      } else if (min.value == 0 && hour.value != 0) {
        hour.value = `${hour.value < 10 ? "0" : ""}${hour.value - 1}`;
        min.value = 60;
      }
    }

    function stopInterval(action) {
      startBtn.innerHTML = action === "pause" ? "continue" : "start";

      startBtn.style.display = "initial";
      stopBtn.style.display = "none";
      clearInterval(startTimer);
    }
    function startInterval() {
      console.log("start interval");
      startBtn.style.display = "none";
      stopBtn.style.display = "initial";
      startTimer = setInterval(() => {
        timer();
      }, 1);
    }

    startInterval();

    stopBtn.addEventListener("click", () => {
      stopInterval("pause");
    });

    resetBtn.addEventListener("click", () => {
      msec.value = "";

      stopInterval();
    });
  });
})();
