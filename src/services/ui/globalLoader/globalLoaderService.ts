type Listener = () => void;

const listeners = new Set<Listener>();
let pendingRequestCount = 0;

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const decrementRequestCount = () => {
  pendingRequestCount = Math.max(0, pendingRequestCount - 1);
};

export const globalLoaderService = {
  beginRequest() {
    pendingRequestCount += 1;
    notifyListeners();
  },
  endRequest() {
    decrementRequestCount();
    notifyListeners();
  },
  getPendingRequestCount() {
    return pendingRequestCount;
  },
  getSnapshot() {
    return pendingRequestCount > 0;
  },
  reset() {
    pendingRequestCount = 0;
    notifyListeners();
  },
  subscribe(listener: Listener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
};
