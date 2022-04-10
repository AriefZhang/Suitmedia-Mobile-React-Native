import reqres from "../../../api/reqres";

export function setUser(payload) {
  return {
    type: "user/fetchUser",
    payload,
  };
}

export function setTotalPage(payload) {
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

export function asyncGetUser(page) {
  if (!page) page = 1;
  return (dispatch) => {
    reqres
      .get("users?page=" + page + "&per_page=8")
      .then((resp) => dispatch(setUser(resp.data)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
}
