import {
  LOGIN_URL,
  ME_URL,
  REGISTER_URL,
  REQUEST_PASSWORD_URL,
} from "../redux/authCrud";
import userDetails from "./userDetails";

export default function mockAuth(mock) {
  mock.onPost(LOGIN_URL).reply(({ data }) => {
    const { email, password } = JSON.parse(data);
    if (email && password) {
      const user = userDetails.find(
        (x) =>
          x.email.toLowerCase() === email.toLowerCase() &&
          x.password === password
      );

      if (user) {
        return [200, { ...user, password: undefined }];
      }
    }

    return [400];
  });

  mock.onPost(REGISTER_URL).reply(({ data }) => {
    const { email, fullname, username, password } = JSON.parse(data);

    if (email && fullname && username && password) {
      const accessToken = "access-token-" + Math.random();
      const user = {
        id: generateUserId(),
        username: username,
        password: password,
        creationDate: new Date().getTime(),
        email: email,
      };

      userDetails.push(user);

      return [200, { ...user, password: undefined }];
    }

    return [400];
  });

  mock.onPost(REQUEST_PASSWORD_URL).reply(({ data }) => {
    const { email } = JSON.parse(data);

    if (email) {
      const user = userDetails.find(
        (x) => x.email.toLowerCase() === email.toLowerCase()
      );

      if (user) {
        user.password = undefined;

        return [200, { ...user, password: undefined }];
      }
    }

    return [400];
  });

  mock.onGet(ME_URL).reply(({ headers: { Authorization } }) => {
    const accessToken =
      Authorization &&
      Authorization.startsWith("Bearer ") &&
      Authorization.slice("Bearer ".length);
    if (accessToken) {
      const user = userDetails.find((x) => x.email === accessToken);
      if (user) {
        return [200, { ...user, password: undefined }];
      }
    }
    return [401];
  });

  function generateUserId() {
    const ids = userDetails.map((el) => el.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
  }
}
