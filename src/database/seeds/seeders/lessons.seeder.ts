import { AppDataSource } from '../../data-source';
import { Lesson } from '../../../common/entities/lesson.entity';

const LESSONS = [
  {
    title: 'İlk bug düzeltme',
    courseId: 1,
    free: true,
    codeContent: `
      &lt;!DOCTYPE html&gt;
        &lt;html lang=&quot;en&quot;&gt;
          &lt;head&gt;
            &lt;meta charset=&quot;UTF-8&quot; /&gt;
            &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot; /&gt;
            &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;
            &lt;link
              href=&quot;https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&amp;display=swap&quot;
              rel=&quot;stylesheet&quot;
            /&gt;
            &lt;!-- &lt;link rel=&quot;stylesheet&quot; href=&quot;https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css&quot; /&gt; -->
            &lt;title&gt;Kodoren store&lt;/title&gt;
          &lt;/head&gt;
          &lt;body&gt;
            &lt;main class=&quot;main&quot;&gt;
              &lt;div class=&quot;main__card&quot;&gt;
                &lt;img src=&quot;https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg&quot; alt=&quot;&quot; class=&quot;main__image&quot; /&gt;
                &lt;h1 class=&quot;main__heading&quot;&gt;Kodoren t-shirt&lt;/h1&gt;
                &lt;p class=&quot;main__text&quot;&gt;Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton&lt;/p&gt;
                &lt;button class=&quot;main__button&quot;&gt;Buy&lt;/button&gt;
              &lt;/div&gt;
            &lt;/main&gt;
          &lt;/body&gt;
        &lt;/html&gt;
      `,
    codeFileExtension: 'html',
  },
];

export const seedLessons = async () => {
  const repository = AppDataSource.getRepository(Lesson);

  await repository.insert(LESSONS);

  console.log('Seeded: Lessons');
};
