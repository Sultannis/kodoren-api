import { AppDataSource } from '../../data-source';
import { Lesson } from '../../../common/entities/lesson.entity';

const LESSONS = [
  {
    title: 'İlk bug düzeltme',
    courseId: 1,
    free: true,
    codeContent: `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <!-- <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" /> -->
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
];

export const seedLessons = async () => {
  const repository = AppDataSource.getRepository(Lesson);

  await repository.insert(LESSONS);

  console.log('Seeded: Lessons');
};
