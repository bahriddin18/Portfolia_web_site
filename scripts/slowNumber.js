let easing = {
  quadratic: function (x) {
    return Math.sqrt(x);
  },
};

function range(start, stop, step) {
  let array = [];
  for (let i = start; i < stop; i += step) array.push(i);
  return array;
}

function interpolation(fps, easing, finalValue) {
  function scaleIt(value) {
    return finalValue * value;
  }

  let x = range(0, 1, 1 / fps),
    y = x.map(easing).map(scaleIt);

  return y;
}

function animateEl(values, duration, onAnimate) {
  let frameIndex = 0,
    fps = values.length,
    id = setInterval(anime, duration / fps);

  function anime() {
    let current = values[frameIndex],
      isLastFrame = frameIndex === fps - 1;

    onAnimate(current, frameIndex, values);

    if (isLastFrame) {
      clearInterval(id);
    } else {
      frameIndex++;
    }
  }
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function unformat(content) {
  let unlocalized = content.replace(".", "").replace(",", "."),
    value = parseFloat(unlocalized);
  return value;
}

function format(value) {
  return value.toString().replace(".", ",");
}

window.addEventListener("scroll", function slow() {
  if (window.scrollY > 350) {
    let fps = 20,
      els = [].slice.call(document.querySelectorAll(".slowNumber"));

    els.forEach(function (el) {
      let content = el.firstChild.textContent.trim(),
        decimalPlaces = content.split(",")[1] || "",
        value = unformat(content),
        values = interpolation(fps, easing.quadratic, value);

      animateEl(values, 1000, function (current, i, values) {
        let isLast = i === values.length - 1,
          value = round(current, decimalPlaces.length);
        el.firstChild.textContent = isLast ? content : format(value);
      });
    });

    this.removeEventListener("scroll", slow);
  }
});
