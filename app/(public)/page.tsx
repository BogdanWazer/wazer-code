import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

const features: featureProps[] = [
  {
    title: "Всеосяжні курси",
    description:
      "Доступ до широкого спектру ретельно відібраних курсів від експертів галузі.",
    icon: "📚",
  },
  {
    title: "Інтерактивне навчання",
    description:
      "Взаємодійте з інтерактивним контентом, вікторинами та завданнями для кращого засвоєння матеріалу.",
    icon: "🎮",
  },
  {
    title: "Відстеження прогресу",
    description:
      "Відстежуйте свій прогрес і досягнення завдяки детальній аналітиці та персональним панелям.",
    icon: "📊",
  },
  {
    title: "Підтримка спільноти",
    description:
      "Долучайтеся до активної спільноти учнів та викладачів для співпраці й обміну знаннями.",
    icon: "👥",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="outline">Майбутнє онлайн-освіти</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Підніміть свій навчальний досвід
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Відкрийте новий спосіб навчання з нашою сучасною інтерактивною системою.
            Доступ до якісних курсів у будь-який час і будь-де.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              className={buttonVariants({
                size: "lg",
              })}
              href="/courses"
            >
              Переглянути курси
            </Link>

            <Link
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              })}
              href="/login"
            >
              Увійти
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
