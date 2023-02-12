import { memo } from 'react';
import { create } from 'zustand';
function Typer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60); // 10 minutes timer
  return (
    <div>
      <TextTyping />
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
const text = `useEffect 99% of the time this is what you want to use. When hooks are stable and if you refactor any of your class components to use hooks, you'll likely move any code from componentDidMount, componentDidUpdate, and componentWillUnmount to useEffect.

The one catch is that this runs after react renders your component and ensures that your effect callback does not block browser painting. This differs from the behavior in class components where componentDidMount and componentDidUpdate run synchronously after rendering. It's more performant this way and most of the time this is what you want.

However, if your effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of the DOM node between the time that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll want to use useLayoutEffect. Otherwise the user could see a flicker when your DOM mutations take effect. This is pretty much the only time you want to avoid useEffect and use useLayoutEffect instead.`;
function TextTyping() {
  return (
    <div className="w-[500px] m-auto  p-4 my-10 mb-2 space-y-4 break-words">
      <div className="flex  flex-wrap  border border-red-500 p-4">
        {text.split(' ').map((word, index, arr) => {
          return <Word key={index} index={index} word={word} />;
        })}
      </div>
      <InputTyper />
    </div>
  );
}
const Word = memo(function Word({
  word,
  index,
}: {
  word: string;
  index: number;
}) {
  const { currentWord, currentIndex } = useTypedWord();
  let classNameHighlighted = '';

  if (currentIndex == index && word.length && word === currentWord) {
    classNameHighlighted = 'bg-green-500 border-transparent';
  } else if (currentIndex === index) {
    classNameHighlighted =
      currentWord.length > 0
        ? 'border-gray-100 '
        : 'bg-gray-200 border-transparent';
  } else {
    classNameHighlighted = 'bg-transparent border-transparent';
  }
  return (
    <p className={` px-1  border  ${classNameHighlighted}  `}>
      <span>
        {currentIndex == index
          ? [...word].map((char, key) => (
              <span
                key={key}
                className={
                  currentWord[key] == char
                    ? 'bg-green-500'
                    : currentWord.length > 0
                    ? 'bg-red-500'
                    : 'bg-transparent'
                }
              >
                {char}
              </span>
            ))
          : word}
      </span>
    </p>
  );
});

type TypedWord = {
  data: string[];
  setData: (data: string) => void;
  currentIndex: number;
  currentWord: string;
  dataCurrentWord: string;
  setCurrentIndex: (index?: number) => void;
  setCurrentWord: (s: string) => void;
  setDataCurrentWord: (s: string) => void;
};
const useTypedWord = create<TypedWord>((set, get) => ({
  startTimer: null,

  data: text.split(' '),
  setData: (text) => set({ data: text.split(' ') }),
  currentIndex: 0,
  dataCurrentWord: '',
  currentWord: '',
  setDataCurrentWord: (word) => set({ dataCurrentWord: word }),
  setCurrentIndex: (index) => {
    console.log('console with index ', index);

    set({
      currentIndex: typeof index == 'number' ? index : get().currentIndex + 1,
    });
  },
  setCurrentWord: (word) => set({ currentWord: word }),
}));
type TypedScore = {
  missedWord: number;
  expireTime: boolean;
  scoreWord: number;
  setExpireTime: () => void;
  setScoreWord: () => void;
  setMissedWord: () => void;
};
const useScore = create<TypedScore>((set, get) => ({
  scoreWord: 0,
  expireTime: false,
  missedWord: 0,
  setScoreWord: () => set({ scoreWord: get().scoreWord + 1 }),
  setMissedWord: () => set({ missedWord: get().missedWord + 1 }),
  setExpireTime: () => set({ expireTime: !get().expireTime }),
}));

function InputTyper() {
  const { setCurrentWord, currentWord, setCurrentIndex, currentIndex, data } =
    useTypedWord();
  const { setScoreWord, setMissedWord } = useScore();

  return (
    <input
      value={currentWord}
      onChange={(e) => setCurrentWord(e.target.value.trim())}
      onKeyUp={(e) => {
        if (e.code === 'Space') {
          if (currentWord.length > 0) {
            if (currentWord == data[currentIndex]) {
              setScoreWord();
            } else {
              setMissedWord();
            }
            console.log({ currentIndex, lengthy: data.length - 1 });
            if (currentIndex >= data.length - 1) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex();
            }
            setCurrentWord('');
          }
        }
      }}
      className="w-full p-2 border text-lg outline-dashed outline-1"
    />
  );
}

////Timer Component
import { useTimer } from 'react-timer-hook';
function MyTimer({ expiryTimestamp }: { expiryTimestamp: Date }) {
  const { seconds, minutes, isRunning, start, restart, pause } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire,
  });

  const { setExpireTime } = useScore();

  function onExpire() {
    setExpireTime();
    console.warn('onExpire called');
  }

  const expiredTime = 60;
  const { scoreWord, missedWord, expireTime } = useScore();
  return (
    <div style={{ textAlign: 'center' }}>
      {expireTime && (
        <div className="flex items-center justify-between m-auto w-[400px] border p-4">
          <div>
            <p className="flex space-x-2 items-baseline font-light ">
              <span>Win Word</span>{' '}
              <span className="text-4xl text-green-500 font-light">
                {scoreWord}
              </span>
            </p>
            <p className="flex space-x-2 items-baseline font-light ">
              <span>Missed Word</span>{' '}
              <span className="text-4xl text-red-500 font-light">
                {missedWord}
              </span>
            </p>
          </div>
          <p>{isRunning ? 'Running' : 'Not running'}</p>
        </div>
      )}
      <button
        className="w-[70px] rounded-sm h-[30px]  border m-2 hover:bg-red-300 active:opacity-20"
        onClick={isRunning ? pause : start}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>

      <button
        className="w-[70px] rounded-sm h-[30px]  border m-2 hover:bg-red-300 active:opacity-20"
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + expiredTime);
          restart(time, false);
        }}
      >
        Restart
      </button>
      <div className="text-6xl text-gray-800">
        <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
      </div>
    </div>
  );
}
function formatTime(time: number): string {
  return `${time}`.padStart(2, '0');
}

export default Typer;
