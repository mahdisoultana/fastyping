//Timer Component
import { useTimer } from 'react-timer-hook';
import { useScore } from '../../../hooks';

const timeDefault = new Date();
timeDefault.setSeconds(timeDefault.getSeconds() + 60);

function MyTimer({
  expiryTimestamp = timeDefault,
}: {
  expiryTimestamp?: Date;
}) {
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
export default MyTimer;
