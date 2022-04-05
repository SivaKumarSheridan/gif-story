import MockAdapter from "axios-mock-adapter";
import mockAuth from "../../app/modules/auth/mockAuth";

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300 });

  mockAuth(mock);

  return mock;
}
