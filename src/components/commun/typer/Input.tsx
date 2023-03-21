import { text, useScore, useTypedWord } from '../../../hooks';

function InputTyper() {
  const {
    setCurrentWord,
    currentWord,
    captureWord,
    setCapturedWord,
    setCurrentIndex,
    currentIndex,
    data,
  } = useTypedWord();
  const { setScoreWord, setMissedWord } = useScore();

  return (
    <input
      value={currentWord}
      onChange={(e) => setCurrentWord(e.target.value.trim())}
      onKeyUp={(e) => {
        if (e.code === 'Space') {
          setCapturedWord('');
          if (currentWord.length > 0) {
            if (currentWord == data[currentIndex]) {
              setScoreWord();
            } else {
              setMissedWord();
            }
            // console.log({ currentIndex, lengthy: data.length - 1 });
            if (currentIndex >= data.length - 1) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex();
            }
            setCapturedWord(currentWord);
            setCurrentWord('');
          }
        }
      }}
      className={`w-full p-2 border rounded-sm text-2xl outline-gray-800/40 outline-dashed outline-1  block  ${
        !text.split(' ')[currentIndex].startsWith(currentWord)
          ? 'text-red-500 focus:outline-red-800 bg-red-50'
          : 'text-gray-900 focus:outline-gray-800 bg-gray-50'
      }`}
    />
  );
}
export default InputTyper;
