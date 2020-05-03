export default {
  setToken: (token: string) => localStorage.setItem('token', token),

  getToken: (): string|null => localStorage.getItem('token'),

  purgeToken: () => localStorage.removeItem('token')
};
