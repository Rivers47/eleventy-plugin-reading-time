var htmlToText = require('html-to-text');
var wordCount = require('word-count');

module.exports = function readingTime(
  postOrContent,
  { includeSecond = false, raw = false, wpm = 100 } = {}
) {
  const htmlContent =
    typeof postOrContent === 'string'
      ? postOrContent
      : postOrContent.templateContent;

  if (!htmlContent) {
    return `0 ${printSeconds ? 'seconds' : 'minutes'}`;
  }

  var wordsCount = wordCount(htmlToText.htmlToText(
    htmlContent, {
    ignoreImage: false,
    ignoreHref: true,
    wordwrap: false
  }));
  var readingTime = wordsCount / wpm;
  var minute = Math.floor(readingTime);
  var second = Math.ceil(readingTime % 1 * 60);
  if (includeSecond === true) {
    if (raw === true)
      return { minute, second }
    var minuteRet = minute <= 1 ? '1 minute' : (minute + ' minutes');
    var secondRet = second <= 1 ? '1 second' : (minute + ' seconds');
    return {minuteRet, secondRet};
  }

  if (raw === true)
    return minute;
  return minute <= 1 ? '1 minute' : (minute + ' minutes');
};
