import inquirer from 'inquirer';
import { searchList } from './utils/git';
import loading from './utils/loading';

export default async function search() {
  const answers = await inquirer.prompt([
    {
      type   : 'input',
      name   : 'search',
      message: 'search repo'
    }
  ]);
	
  if (answers.search) {
    const l = loading('searching');
    let list = await searchList();
		
    list = list
      .filter(item => item.name.indexOf(answers.search) > -1)
      .map(({ name }) => name);
		
    l.succeed('search end');
	  
    console.log('');
	  if (list.length === 0) {
		  console.log(`${answers.search} is not found`);
	  }
	  console.log(list.join('\n'));
	  console.log('');
  }
}
