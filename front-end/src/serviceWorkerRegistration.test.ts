
import {register, unregister, registerValidSW, checkValidServiceWorker} from './serviceWorkerRegistration'

type Config = {
    onSuccess?: (registration: ServiceWorkerRegistration) => void;
    onUpdate?: (registration: ServiceWorkerRegistration) => void;
  };


test('renders without crashing', async() => {
    let config :Config

    expect(() => register(config)).not.toThrow();
    expect(() => unregister()).not.toThrow();
    expect(() => registerValidSW).not.toThrow();
    expect(() => checkValidServiceWorker).not.toThrow();
});