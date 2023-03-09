

export function fetchUserByMsg(ID = 0) {
  if (config.useMock) {
    return mockFetchGood(ID);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}