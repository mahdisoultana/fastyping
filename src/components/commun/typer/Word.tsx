import { memo } from 'react';

const Word = memo(
  function Word({
    word,
    index,
    currentIndex,
    classNameHighlighted,
  }: {
    word: string;
    classNameHighlighted: string;

    currentWord?: string;
    currentIndex: number;
    index: number;
  }) {
    // const { currentWord } = useTypedWord();
    console.log(word);
    return (
      <p className={` px-1  border  ${classNameHighlighted}  `}>
        <span>
          {currentIndex == index
            ? [...word].map((char, key) => (
                <span
                  key={key}
                  // className={

                  // currentWord[key] == char
                  //   ? 'bg-green-500'
                  //   : currentWord.length > 0
                  //   ? 'bg-red-500'
                  //   : 'bg-transparent'
                  // }
                >
                  {char}
                </span>
              ))
            : word}
        </span>
      </p>
    );
  },
  (prev, next) =>
    prev.classNameHighlighted === next.classNameHighlighted &&
    prev.index === prev.index,
);

export default Word;
