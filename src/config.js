import rc from './utils/rc'

export default async function apply(action, k, v) {
	switch(action) {
		case 'get':
			return await rc(k)
			break
		case 'set':
			await rc(k, v)
			return true
			break
		
		default:
			throw new Error('config input invalid, Please check')
	}
}
