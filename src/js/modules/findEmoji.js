const findEmoji = (str) =>
  [...new Intl.Segmenter().segment(str)]
    .map((char) => char.segment)
    .filter((char) =>
      /\p{Regional_Indicator}|\p{Emoji_Presentation}|\p{Extended_Pictographic}+/gu.test(
        char
      )
    );

export default findEmoji;