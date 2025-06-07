export const trackPageLoad = () => {
  const timing = window.performance.timing;
  const loadTime = timing.loadEventEnd - timing.navigationStart;
  console.log(`Page loaded in ${loadTime}ms`);
};
