import { useLayoutEffect, useState } from 'react';
import { text, useTypedWord } from '../../../hooks';
import InputTyper from './Input';
import MyTimer from './MyTimer';
import Word from './Word';

function Typer() {
  return (
    <div>
      <TextTyping />
      <MyTimer />
    </div>
  );
}
const textArr: {
  word: string;
  isCorrect: boolean | null;
  isIn: boolean;
}[] = text.split(' ').map((w) => ({ word: w, isCorrect: null, isIn: false }));

function TextTyping() {
  const { currentWord, currentIndex, captureWord } = useTypedWord();
  const [text, setText] = useState(() => textArr);
  useLayoutEffect(() => {
    const index =
      currentIndex == 0
        ? currentIndex
        : currentIndex > text.length - 1
        ? currentIndex
        : currentIndex - 1;
    setText(() =>
      text.map((item, i) =>
        i === index
          ? {
              isIn: false,
              word: item.word,
              isCorrect: index === i ? text[index].word === captureWord : null,
            }
          : item,
      ),
    );

    return () => {};
  }, [currentIndex]);

  return (
    <div className="w-[650px] m-auto  p-4 my-10 mb-2 space-y-4 break-words">
      <div className="flex  flex-wrap  border border-gray-500/20  rounded-sm p-4 text-2xl font-medium text-gray-900 mb-12">
        {text.map(({ word, isCorrect }, index, arr) => {
          // this text logic is for all texts that persist
          let classNameHighlighted = `rounded-sm ${
            isCorrect === null || currentIndex == 0
              ? ''
              : isCorrect
              ? ' text-green-600   '
              : 'text-red-500  '
          } `;

          if (currentIndex == index && word.length && word === currentWord) {
            classNameHighlighted += 'bg-green-500 border-transparent';
          } else if (currentIndex === index) {
            classNameHighlighted +=
              currentWord.length > 0 &&
              !text[currentIndex].word.startsWith(currentWord)
                ? 'border-red-500 bg-red-500 '
                : 'bg-gray-200  border-transparent border-green-500  border';
          } else {
            classNameHighlighted += 'bg-transparent border-transparent';
          }

          return (
            <Word
              key={index}
              index={index}
              classNameHighlighted={classNameHighlighted}
              word={word}
              currentIndex={currentIndex}
            />
          );
        })}
      </div>
      <InputTyper />
    </div>
  );
}

export default Typer;
