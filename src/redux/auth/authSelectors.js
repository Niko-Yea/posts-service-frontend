const getIsLoggegIn = (state) => state.authSlice.isLoggedIn;
const getToken = (state) => state.authSlice.token;
const getUserName = (state) => state.authSlice.user.name;
const getUserId = (state) => state.authSlice.user.id;
const getUserAvatar = (state) => state.authSlice.user.avatar;

const authSelectors = {
  getIsLoggegIn,
  getToken,
  getUserName,
  getUserId,
  getUserAvatar,
};
export default authSelectors;
