const userState = {
  users: [],
  user: {},
  total_pages: 0,
  isLoading: true,
  userList: true
};

export default function reducer(state = userState, action) {
  const { type, payload } = action;
  switch (type) {
    case "user/fetchUser":
      return {
        ...state,
        users: payload
      }
    case "userById/fetchUser":
      return {
        ...state,
        user: payload
      }
    case "loading/user":
      return {
        ...state,
        isLoading: payload
      }  
    case "page/user":
      return {
        ...state,
        userList: payload
      }  
    case "total_page/user":
      return {
        ...state,
        userList: payload
      }  
    default:
      return state
  }
}
