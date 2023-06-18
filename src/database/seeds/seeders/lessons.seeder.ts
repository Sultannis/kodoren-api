import { AppDataSource } from '../../data-source';
import { Lesson } from '../../../common/entities/lesson.entity';

const LESSONS = [
  {
    order: 1,
    title: 'Fixing first bug',
    description: 'Selling page is broken and customers are leaving. See what is going on and try to fix it.',
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
    introDialogLines: [
      'Shoot, again... I really need to find a better develops.',
      'Hey, you! Yes, you! Think you can do something about this?',
    ],
    outroDialogLines: ['Hmmm, not bad. Would you like to work for me?'],
    codeFileExtension: 'html',
  },
  {
    order: 2,
    title: 'Basics of HTML tags',
    description:
      "That was a good start, but before we move on any further, let's make sure that you know the structure of the HTML document",
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
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
  {
    order: 3,
    title: 'Tag attributes',
    description: 'To make our page more interesting, we need to add some attributes to our tags',
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 4,
    title: 'Boolean attributes',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 5,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 6,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 7,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 8,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 9,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 10,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 11,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 12,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 13,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 14,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 15,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 16,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 17,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 18,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 19,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
                    <button class="main__button">Buy</button>
                </div>
            </main>
        </body>
    </html>
    `,
    codeFileExtension: 'html',
  },
  {
    order: 20,
    title: 'Coming soon',
    description: 'Boolean attributes - attributes that do not require a value',
    courseId: 1,
    free: false,
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
            <link rel="stylesheet" href="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/course-1-lesson-1.css" />
            <title>Kodoren store</title>
        </head>
        <body>
            <main class="main">
                <div class="main__card">
                    <img src="https://kodoren-lessons-assets.fra1.cdn.digitaloceanspaces.com/kodoren-tee.jpg" alt="" class="main__image" />
                    <h1 class="main__heading">Kodoren t-shirt</h1>
                    <p class="main__text">Darkblue baggy-fit t-shirt with kodoren logo. Unisex, 100% cotton</p>
                    <p class="main__text">Product can be returned within 7 days since purchase*</p>
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
