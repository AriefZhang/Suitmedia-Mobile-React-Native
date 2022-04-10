const userState = {
  users: [],
  user: {},
  total_pages: 0,
  isLoading: true,
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
        isLoading: true
      }  
    
    default:
      return state
  }
}
