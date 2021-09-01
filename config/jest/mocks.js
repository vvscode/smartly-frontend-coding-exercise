const delay = require("mocker-api/utils/delay");

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const suggestions = [
  "cars",
  "football",
  "traveling",
  "food",
  "fashion",
  "shopping",
  "culture",
  "animals",
  "climbing"
];

const proxy = {
  "GET /search": (req, res) => {
    const amount = Math.min(
      8,
      Math.floor(Math.random(102) * suggestions.length)
    );
    const results = shuffle(suggestions.slice()).slice(0, amount);

    return res.json(results);
  }
};

module.exports = delay(proxy, 750);
