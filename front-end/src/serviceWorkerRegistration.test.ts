jest.setTimeout(25000)

import {register} from './serviceWorkerRegistration'

type Config = {
    onSuccess?: (registration: ServiceWorkerRegistration) => void;
    onUpdate?: (registration: ServiceWorkerRegistration) => void;
  };
test('renders without crashing', async() => {
    let config :Config

    expect(() => register(config)).not.toThrow();

});