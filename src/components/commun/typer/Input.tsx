import { useScore, useTypedWord } from '../../../hooks';

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
            // console.log({ currentIndex, lengthy: data.length - 1 });
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
export default InputTyper;
