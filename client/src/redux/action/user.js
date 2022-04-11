import reqres from "../../../api/reqres";

export function setUser(payload) {
  return {
    type: "user/fetchUser",
    payload,
  };
}

export function setUserById(payload) {
  return {
    type: "userById/fetchUser",
    payload,
  };
}

export function setLoading(payload) {
  return {
    type: "loading/user",
    payload,
  };
}

export function setUserPage(payload) {
  return {
    type: "page/user",
    payload,
  };
}

export function setTotalPage(payload) {
  return {
    type: "total_page/user",
    payload,
  };
}

export function asyncGetUser(page) {
  if (!page) page = 1;
  return (dispatch) => {
    return reqres
      .get("users?page=1&per_page=" + page)
      .then((resp) => dispatch(setUser(resp.data)))
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  };
}
