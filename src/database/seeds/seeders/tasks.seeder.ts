import { AppDataSource } from '../../data-source';
import { Task } from '../../../common/entities/task.entity';

const TASKS = [
  {
    title: 'Remove comments from code',
    description:
      'On 17’th line <span class="code-highlight">link</span> tag is surrounded with <span class="code-highlight"> &lt;!--</span> and <span class="code-highlight">--&gt;</span> comment symbols. Remove them to bring styles of the page back.',
    checkboxText: 'Line uncommented',
    lessonId: 1,
    codeToInclude: [],
    codeToExclude: ['<!--', '-->'],
  },
  {
    title: 'Add comments to the code',
    description:
      'On 17’th line <span class="code-highlight">link</span> tag is surrounded with <span class="code-highlight"> &lt;!--</span> and <span class="code-highlight">--&gt;</span> comment symbols. Remove them to bring styles of the page back.',
    checkboxText: 'Line commented',
    lessonId: 1,
    codeToInclude: ['<!--', '-->'],
    codeToExclude: [],
  },
  {
    title: 'Remove comments from code',
    description:
      'On 17’th line <span class="code-highlight">link</span> tag is surrounded with <span class="code-highlight"> &lt;!--</span> and <span class="code-highlight">--&gt;</span> comment symbols. Remove them to bring styles of the page back.',
    checkboxText: 'Line uncommented',
    lessonId: 2,
    codeToInclude: [],
    codeToExclude: ['<!--', '-->'],
  },
  {
    title: 'Remove comments from code',
    description:
      'On 17’th line <span class="code-highlight">link</span> tag is surrounded with <span class="code-highlight"> &lt;!--</span> and <span class="code-highlight">--&gt;</span> comment symbols. Remove them to bring styles of the page back.',
    checkboxText: 'Line uncommented',
    lessonId: 3,
    codeToInclude: [],
    codeToExclude: ['<!--', '-->'],
  },
];

export const seedTasks = async () => {
  const repository = AppDataSource.getRepository(Task);

  await repository.insert(TASKS);

  console.log('Seeded: Tasks');
};
