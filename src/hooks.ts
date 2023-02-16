import { create } from 'zustand';
export const text = `useEffect 99% of the time this is what you want to use. When hooks are stable and if you refactor any of your class components to use hooks, you'll likely move any code from componentDidMount, componentDidUpdate, and componentWillUnmount to useEffect.

The one catch is that this runs after react renders your component and ensures that your effect callback does not block browser painting. This differs from the behavior in class components where componentDidMount and componentDidUpdate run synchronously after rendering. It's more performant this way and most of the time this is what you want.

However, if your effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of the DOM node between the time that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll want to use useLayoutEffect. Otherwise the user could see a flicker when your DOM mutations take effect. This is pretty much the only time you want to avoid useEffect and use useLayoutEffect instead.`;

export type TypedWord = {
  data: string[];
  setData: (data: string) => void;
  currentIndex: number;
  currentWord: string;
  dataCurrentWord: string;
  setCurrentIndex: (index?: number) => void;
  setCurrentWord: (s: string) => void;
  setDataCurrentWord: (s: string) => void;
};
export const useTypedWord = create<TypedWord>((set, get) => ({
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
export type TypedScore = {
  missedWord: number;
  expireTime: boolean;
  scoreWord: number;
  setExpireTime: () => void;
  setScoreWord: () => void;
  setMissedWord: () => void;
};
export const useScore = create<TypedScore>((set, get) => ({
  scoreWord: 0,
  expireTime: false,
  missedWord: 0,
  setScoreWord: () => set({ scoreWord: get().scoreWord + 1 }),
  setMissedWord: () => set({ missedWord: get().missedWord + 1 }),
  setExpireTime: () => set({ expireTime: !get().expireTime }),
}));
