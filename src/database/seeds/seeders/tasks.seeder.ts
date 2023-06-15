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
      `As you can see every HTML file is structured using nested "tags". The basic structure of the tag consists of opening tag <span class="code-highlight"> &lt;sometagname&gt;</span>, text or other nested tags in between and closing tag <span class="code-highlight">&lt;/sometagname&gt;</span>. This so called <strong>paired</strong> tag, on the line number <span class="code-highlight">12</span> you can see an example of title paired tag.`,
      `There is also another type of tag - <strong>unpaired</strong>. These are called so because they consist of only one tag which starts with <span class="code-highlight">&lt;</span> symbol and ends with <span class="code-highlight">/&gt;</span> symbol. On the line number <span class="code-highlight">17</span> you can see an example of unpaired tag <strong>img</strong> that is used to insert images to the page.`,
      `Let's add out own tag to the page and see what happens. Copy this line of code <span class="code-highlight">&lt;p class="main__text"&gt;Product can be returned within 7 days since purchase*&lt;/p&gt;</span> and insert it right after <span class="code-highlight">p</span> tag on the line <strong>19</strong>. This will create new paragraph of description in product card.`,
    ],
    checkboxText: 'New tag inserted',
    lessonId: 2,
    codeToInclude: [
      '<p class="main__text">Product can be returned within 7 days since purchase*</p>',
    ],
    codeToExclude: [],
  },
];

export const seedTasks = async () => {
  const repository = AppDataSource.getRepository(Task);

  await repository.insert(TASKS);

  console.log('Seeded: Tasks');
};
