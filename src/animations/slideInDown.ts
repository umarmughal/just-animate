export const slideInDown: ja.IAnimationOptions = {
  keyframes: [
    {
      transform: 'translate3d(0, -100%, 0)',
      visibility: 'hidden'
    },
    {
      transform: 'translate3d(0, 0, 0)',
      visibility: 'visible'
    }
  ],
  timings: {
    duration: 1000
  },
  name: 'slideInDown'
};