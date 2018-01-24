import rc from './utils/rc';

export default async function apply(action, k, v) {
  switch (action) {
    case 'get':
      console.log(await rc(k));
      console.log('');
      return true;
    case 'set':
      await rc(k, v);
      return true;

    case 'remove':
      await rc(k, v, true);
      return true;

    default:
      console.log(await rc());
  }
}
