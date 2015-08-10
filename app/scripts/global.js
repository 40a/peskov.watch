function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2 + ' ₽';
}
function pluralText(value, suffix)
{
  var cases, text;
  value = Math.round(value);
  if (suffix.length === 2) {
    text = suffix[value > 1 ? 1 : 0];
  } else {
    cases = [2, 0, 1, 1, 1, 2];
    text = suffix[value % 100 > 4 && value % 100 < 20 ? 2 : cases[(value % 10 < 5 ? value % 10 : 5)]];
  }
  return text;
};
