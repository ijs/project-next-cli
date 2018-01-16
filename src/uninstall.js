import { exists } from 'mz/fs';
import rmfr from 'rmfr';
import { dirs } from './utils/defs';

export default async function apply(scaffold) {
  if (!scaffold) {
    throw new Error('scaffold is empty');
  }
  const dir = `${dirs.download}/${scaffold}`;

  if (await exists(dir)) {
    await rmfr(`${dirs.download}/${scaffold}`);
  }
}
