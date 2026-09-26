import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { AlgorithmPreview } from "./AlgorithmPreview";

type AlgorithmCardProps = {
  title: string;
  description: string;
  previewData: number[];
};

export function AlgorithmCard({
  title,
  description,
  previewData,
}: AlgorithmCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        </CardTitle>
        <CardDescription className="leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <AlgorithmPreview data={previewData} />
      </CardContent>
      <CardFooter>
        <Button className="h-11 w-full bg-blue-700 text-white hover:bg-blue-800">
          Explore {title.toLowerCase()}
        </Button>
      </CardFooter>
    </Card>
  );
}
