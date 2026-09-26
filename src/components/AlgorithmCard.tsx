import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

type AlgorithmCardProps = {
  title: string;
  description: string;
  preview: ReactNode;
};

export function AlgorithmCard({
  title,
  description,
  preview,
}: AlgorithmCardProps) {
  return (
    <Card className="w-full" size="sm">
      <CardHeader>
        <CardTitle>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        </CardTitle>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-slate-50 p-3">{preview}</div>
      </CardContent>
      <CardFooter>
        <Button className="h-11 w-full bg-blue-700 text-white hover:bg-blue-800">
          Explore {title.toLowerCase()}
        </Button>
      </CardFooter>
    </Card>
  );
}
