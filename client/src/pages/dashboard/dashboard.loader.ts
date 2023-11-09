export const dashboardLoader = async () => {
  return await new Promise<{ hasUsername: boolean }>((resolve) => {
    setTimeout(() => resolve({ hasUsername: false }), 2000);
  });
};
