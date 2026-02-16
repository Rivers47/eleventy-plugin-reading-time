var htmlToText = require('html-to-text');
var wordCount = require('word-count');

module.exports = function readingTime(
  postOrContent,
  { includeSecond = false, wpm = 100 } = {}
) {
  const htmlContent =
    typeof postOrContent === 'string'
      ? postOrContent
      : postOrContent.templateContent;

  if (!htmlContent) {
    return `0 ${printSeconds ? 'seconds' : 'minutes'}`;
  }

  var wordsCount = wordCount(htmlToText.fromString(
    content, {
    ignoreImage: false,
    ignoreHref: true,
    wordwrap: false
  }));
  var readingTime = wordsCount / wpm;
  var minute = Math.floor(readingTime);
  var second = Math.ceil(readingTime % 1 * 60);
  if (includeSecond === true) {
    return { minute, second }
  }
  else {
    return minute < 1 ? '1' : minute
  }
};
