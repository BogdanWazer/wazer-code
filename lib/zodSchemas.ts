import { z } from "zod";

export const courseLevels = ["Початковий", "Середній", "Просунутий"] as const;

export const courseStatus = ["Чернетка", "Опубліковано", "Архівовано"] as const;

export const courseCategories = [
  "Розробка",
  "Бізнес",
  "Фінанси",
  "IT та ПЗ",
  "Офісна продуктивність",
  "Особистий розвиток",
  "Дизайн",
  "Маркетинг",
  "Здоров'я та фітнес",
  "Музика",
  "Викладання та академія",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Назва має містити щонайменше 3 символи" })
    .max(100, { message: "Назва має містити не більше 100 символів" }),
  description: z
    .string()
    .min(3, { message: "Опис має містити щонайменше 3 символи" }),

  fileKey: z.string().min(1, { message: "Файл є обов'язковим" }),

  price: z.coerce
    .number()
    .min(1, { message: "Ціна має бути додатнім числом" }),

  duration: z.coerce
    .number()
    .min(1, { message: "Тривалість має бути щонайменше 1 година" })
    .max(500, { message: "Тривалість має бути не більше 500 годин" }),

  level: z.enum(courseLevels, {
    message: "Рівень є обов'язковим",
  }),
  category: z.enum(courseCategories, {
    message: "Категорія є обов'язковою",
  }),
  smallDescription: z
    .string()
    .min(3, { message: "Короткий опис має містити щонайменше 3 символи" })
    .max(200, {
      message: "Короткий опис має містити не більше 200 символів",
    }),

  slug: z
    .string()
    .min(3, { message: "Слаг має містити щонайменше 3 символи" }),

  status: z.enum(courseStatus, {
    message: "Статус є обов'язковим",
  }),
});

export const chapterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Назва має містити щонайменше 3 символи" }),
  courseId: z.string().uuid({ message: "Некоректний ідентифікатор курсу" }),
});

export const lessonSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Назва має містити щонайменше 3 символи" }),
  chapterId: z.string().uuid({ message: "Некоректний ідентифікатор розділу" }),
  courseId: z.string().uuid({ message: "Некоректний ідентифікатор курсу" }),
  description: z
    .string()
    .min(3, { message: "Опис має містити щонайменше 3 символи" })
    .optional(),

  videoKey: z.string().optional(),
  thumbnailKey: z.string().optional(),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
