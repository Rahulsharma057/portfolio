// react-toastify ka ek hi wrapper - puri app isi se notification dikhati hai.
// Isse style aur duration ek jagah se control hoti hai.
import { toast as rt } from "react-toastify";

const opts = { position: "bottom-center", autoClose: 3000 };

export const toast = {
  success: (msg) => rt.success(msg, opts),
  error: (msg) => rt.error(msg, { ...opts, autoClose: 5000 }),
  info: (msg) => rt.info(msg, opts),
  warn: (msg) => rt.warn(msg, opts),
  // Promise ke saath: loading -> success / error apne aap
  promise: (promise, msgs) => rt.promise(promise, msgs, opts),
  dismiss: () => rt.dismiss(),
};

export default toast;
