import rc from './utils/rc';

export default async function apply(action, k, v) {
  let config;
  switch (action) {
    /* eslint-disable no-case-declarations */
    case 'get':
      config = await rc(k);
      if (!k) {
        Object.keys(config).forEach(key => console.log(`${key}=${config[key]}`));
      } else {
        console.log(config);
      }
      return true;
    case 'set':
      await rc(k, v);
      return true;

    case 'remove':
      await rc(k, v, true);
      return true;

    default:
      config = await rc();
      Object.keys(config).forEach(key => console.log(`${key}=${config[key]}`));
  }
}
