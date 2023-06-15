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
      `HTML files can be processed by your browser and turned into visual information, every page you see on the internet is an html file, even this sandbox that you are working in right now.`,
      `As you can see every HTML file is structured using nested 'tags'. The basic structure of the tag consists of opening tag <span class="code-highlight>&lt;sometagname&mt;</span>, text or other nested tags in between and closing tag <span class=”code-highlight>&lt;//sometagname&mt;</span>.`,
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
