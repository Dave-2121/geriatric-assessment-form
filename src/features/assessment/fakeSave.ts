// No backend, so just wait a bit like a real request would.
export const fakeSave = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, 800);
  });
