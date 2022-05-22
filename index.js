function animation(name, selection) {
  $(selection).addClass(name);
  setTimeout(() => {
    $(selection).removeClass(name);
  }, 150);
}

function setOutput(num) {
  if (num === "") {

    $(".display-output__value").text(num);
  } else if (String(num).includes(".")) {

    $(".display-output__value").text(num);
  } else {
    var numWithCommas = addCommas(num);
    $(".display-output__value").text(numWithCommas);
  }
}

function setMinus(minus) {
  $(".display-output__value").text(minus);
}

function getOutput() {
  var output = $(".display-output__value").text();
  return output;
}

function setHistory(num) {
  $(".display-history__value").text(num);

}

function getHistory() {
  var output = $(".display-history__value").text();
  return output;
}

function addCommas(num) {
  if (num === "-") {
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}



function removeCommas(num) {
  var value = num.replace(/\,/g, '');
  return value;
}

$(".number").click((e) => {

  var output = removeCommas(getOutput());
  var {
    id
  } = e.target;

  animation("depressed--number", e.target);



  if(output.length < 12) {
    if (output !== NaN) { //if output is a number//
        output += id;
        setOutput(output);
    } else {
      setOutput(id);
    }

  }
});

$(".operator").click((e) => {
  var {
    id
  } = e.target;
  var history = getHistory();
  var output = String(removeCommas(getOutput()));

  if (id === "ce") {
    var slice = output.slice(0, output.length - 1);
    setOutput(slice);
    animation("depressed--clear", e.target);
  } else if (id === "clear") {
    setHistory("");
    setOutput("");
    animation("depressed--clear", e.target);
  } else if (id === "-") {
    animation("depressed--action", e.target);
    if (output === "" && history !== "") {
      var sliceHistory = history.slice(0, history.length - 1);
      sliceHistory += id;
      setHistory(sliceHistory);
    }
    if (output !== "" && hasNumber(output)) {
      if (history === "") {
        output += id
        setHistory(output);
        setOutput("");
      } else {

        output = history + output + id
        setHistory(output);
        setOutput("");
      }

    } else {
      if(history === "") {
        setMinus("-");
      }
    }
  } else {
    if (id !== "=") {
      animation("depressed--action", e.target);
      if (output === "" && history !== "") {
        var sliceHistory = history.slice(0, history.length - 1);
        sliceHistory += id;
        setHistory(sliceHistory);
      }


      if (output !== "" && hasNumber(output)) {
        if (history === "") {
          output += id
          setHistory(output);
          setOutput("");
        } else {
          if(String(history).length <= 25) {
            output = history + output + id
            setHistory(output);
            setOutput("");
          }
        }
      }
    } else {
      animation("depressed--action", e.target);
      history += output;
      var calculation = eval(history);
      if(String(calculation).length > 10) {
        var calculation = calculation.toExponential(5);
        setHistory("");
        setOutput(calculation);
      } else {
        setHistory("");
        setOutput(calculation);
      }
    }
  }

});

$(".decimal").click((e) => {
  var {
    id
  } = e.target;
  var output = String(removeCommas(getOutput()));
  var history = getHistory();

  if (!(output.includes("."))) {
    if (output === "") {
      setOutput("0.");
    } else {
      output += id;
      setOutput(output);
    }
  }
});

function hasNumber(str) {
  return /\d/.test(str);
}
