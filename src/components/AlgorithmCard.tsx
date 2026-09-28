import type { ReactNode } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type AlgorithmCardProps = {
  title: string;
  description: string;
  preview?: ReactNode;
  algorithmId?: string;
};

export function AlgorithmCard({
  title,
  description,
  preview,
  algorithmId,
}: AlgorithmCardProps) {
  return (
    <Card className="w-full min-w-0 lg:w-[calc((100%-3rem)/3)]" size="sm">
      <CardHeader>
        <CardTitle>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        </CardTitle>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      {preview && (
        <CardContent>
          <div className="rounded-lg bg-slate-50 p-3">{preview}</div>
        </CardContent>
      )}
      <CardFooter>
        {algorithmId ? (
          <Link
            to={`/algorithms/${algorithmId}`}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-blue-700 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Explore {title.toLowerCase()}
          </Link>
        ) : (
          <span className="flex h-11 w-full items-center justify-center rounded-lg bg-slate-100 text-sm font-medium text-slate-500">
            Coming soon
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
