import { AppDataSource } from '../../data-source';
import { Task } from '../../../common/entities/task.entity';

const TASKS = [
  {
    title: 'Looks like something is not loading properly',
    descriptions: [
      'On 11’th line <span class="code-highlight">link</span> tag is surrounded with <span class="code-highlight"> &lt;!--</span> and <span class="code-highlight">--&gt;</span> comment symbols. Remove them to bring styles of the page back.',
    ],
    checkboxText: 'Line uncommented',
    lessonId: 1,
    codeToInclude: [],
    codeToExclude: ['<!--', '-->'],
  },
  {
    title: 'The inner structure of the page',
    descriptions: [
      `HTML file can be processed by your browser, and every page you see on the internet is one, even this sandbox that you are working in right now.`,
      `As you can see every HTML file is structured using nested 'tags'. <span class="code-highlight">&lt;html lang="tr"&mt;</span>`,
    ],
    checkboxText: 'New tag inserted',
    lessonId: 2,
    codeToInclude: ['<p>You can return product within 7 days</p>'],
    codeToExclude: [],
  },
];

export const seedTasks = async () => {
  const repository = AppDataSource.getRepository(Task);

  await repository.insert(TASKS);

  console.log('Seeded: Tasks');
};
