import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar, Star } from "lucide-react";

export interface IMovie {
  title: string;
  genres: string;
  year: string;
  amount_ratings: number;
  rating: number;
}

export function CardWithForm({
  amount_ratings,
  genres,
  rating,
  title,
  year,
}: IMovie) {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex gap-2 flex-wrap">
          {genres.split("|").map((genre) => (
            <Label className="bg-zinc-200 p-2 rounded-sm">{genre}</Label>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <span className="flex items-center">
          <Calendar strokeWidth={1} width={16} className="mr-2" />
          {year}
        </span>
        <span className="flex items-center">
          <Star strokeWidth={1} width={16} className="mr-2" />
          {rating.toFixed(2)} ({amount_ratings})
        </span>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
