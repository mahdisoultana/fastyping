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

function TextTyping() {
  const { currentWord, currentIndex } = useTypedWord();
  return (
    <div className="w-[500px] m-auto  p-4 my-10 mb-2 space-y-4 break-words">
      <div className="flex  flex-wrap  border border-red-500 p-4">
        {text.split(' ').map((word, index, arr) => {
          let classNameHighlighted = '';

          if (currentIndex == index && word.length && word === currentWord) {
            classNameHighlighted = 'bg-green-500 border-transparent';
          } else if (currentIndex === index) {
            classNameHighlighted =
              currentWord.length > 0
                ? 'border-red-500  '
                : 'bg-gray-200 border-transparent';
          } else {
            classNameHighlighted = 'bg-transparent border-transparent';
          }
          return (
            <Word
              key={index}
              index={index}
              classNameHighlighted={classNameHighlighted}
              word={word}
              // currentWord={currentWord}
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
