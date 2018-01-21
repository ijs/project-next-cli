import rc from './utils/rc';

export default async function apply(action, k, v) {
  switch (action) {
  case 'get':
    console.log(await rc(k));
    console.log('');
    return true;
    break;
  case 'set':
    await rc(k, v);
    return true;
    break;

  case 'remove':
    await rc(k, v, true);
    return true;
    break;

  default:
    console.log(await rc());
  }
}
