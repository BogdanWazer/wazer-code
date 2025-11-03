"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";

import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);

// Reverse mapping: Ukrainian -> English for database
function mapToEnglishLevel(ukrainian: string): "Beginner" | "Intermediate" | "Advanced" {
  const levelMap: Record<string, "Beginner" | "Intermediate" | "Advanced"> = {
    Початковий: "Beginner",
    Середній: "Intermediate",
    Просунутий: "Advanced",
  };
  return levelMap[ukrainian] || (ukrainian as "Beginner" | "Intermediate" | "Advanced");
}

function mapToEnglishStatus(ukrainian: string): "Draft" | "Published" | "Archived" {
  const statusMap: Record<string, "Draft" | "Published" | "Archived"> = {
    Чернетка: "Draft",
    Опубліковано: "Published",
    Архівовано: "Archived",
  };
  return statusMap[ukrainian] || (ukrainian as "Draft" | "Published" | "Archived");
}

function mapToEnglishCategory(ukrainian: string): string {
  const categoryMap: Record<string, string> = {
    Розробка: "Development",
    Бізнес: "Business",
    Фінанси: "Finance",
    "IT та ПЗ": "IT & Software",
    "Офісна продуктивність": "Office Productivity",
    "Особистий розвиток": "Personal Development",
    Дизайн: "Design",
    Маркетинг: "Marketing",
    "Здоров'я та фітнес": "Health & Fitness",
    Музика: "Music",
    "Викладання та академія": "Teaching & Academics",
  };
  return categoryMap[ukrainian] || ukrainian;
}

export async function CreateCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have been blocked due to rate limiting",
        };
      } else {
        return {
          status: "error",
          message: "You are a bot! if this is a mistake contact our support",
        };
      }
    }

    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    const data = await stripe.products.create({
      name: validation.data.title,
      description: validation.data.smallDescription,
      default_price_data: {
        currency: "usd",
        unit_amount: validation.data.price * 100,
      },
    });

    // Map Ukrainian values back to English for database
    const dbData = {
      ...validation.data,
      level: mapToEnglishLevel(validation.data.level),
      status: mapToEnglishStatus(validation.data.status),
      category: mapToEnglishCategory(validation.data.category),
      userId: session?.user.id as string,
      stripePriceId: data.default_price as string,
    };

    await prisma.course.create({
      data: dbData,
    });

    return {
      status: "success",
      message: "Course created succesfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
