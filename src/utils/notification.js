import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const notify = new Notyf({
  ripple: true,
  duration: 3000,
  dismissible: true,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [
    {
      type: 'success',
      background: 'green'
    },
    {
      type: 'warning',
      background: 'yellow'
    },
    {
      type: 'error',
      background: 'indianred'
    }
  ]
});