import { AppDataSource } from '../../data-source';
import { Course } from '../../../common/entities/course.entity';

const COURSES = [
  {
    title: 'HTML & CSS: İlk basamak',
    description:
      'HTML ve CSS, modern web geliştirmenin temelleridir. Bu kurs, bu teknolojilere ilişkin temel bilgileri size sağlayacak ve onları birlikte nasıl kullanarak bir web sitesi oluşturacağınızı gösterecektir.',
    free: false,
  },
  {
    title: 'JavaScript: Siteyi canlı tut',
    description:
      'Başlangıçta LiveScript olarak adlandırılan JavaScript, şimdi tüm webi güçlendiren basit bir betik diliydi. İnteraktif web siteleri oluşturmak için nasıl kullanılacağını öğrenin.',
    free: false,
  },
  {
    title: 'Vue Js: SPA oluşturma',
    description:
      "Vue Js, web uygulamaları oluşturmak için bir araç kutusu gibidir. Vue'yu kullanarak, küçük widget'lardan tam uygulamalara kadar her şeyi hızlı ve sürdürülebilir bir şekilde oluşturabilirsiniz.",
    free: false,
  },
];

export const seedCourses = async () => {
  const repository = AppDataSource.getRepository(Course);

  await repository.insert(COURSES);

  console.log('Seeded: Courses');
};
