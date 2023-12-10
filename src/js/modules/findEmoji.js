import { splitGraphemes } from "/js/modules/textSegmentation.min.js";

const findEmoji = (str) => {
  const graphemes = splitGraphemes(str);

  return graphemes.filter((char) =>
    /\p{Regional_Indicator}|\p{Emoji_Presentation}|\p{Extended_Pictographic}+/gu.test(
      char
    )
  );
};

// const findEmoji = (str) =>
//   [...new Intl.Segmenter().segment(str)]
//     .map((char) => char.segment)
//     .filter((char) =>
//       /\p{Regional_Indicator}|\p{Emoji_Presentation}|\p{Extended_Pictographic}+/gu.test(
//         char
//       )
//     );

export default findEmoji;
