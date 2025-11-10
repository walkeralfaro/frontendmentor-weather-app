import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function CurrentCard({title, value, units} : {title: string, value: number, units: string}) {
  return (
    <Card className="py-4 gap-4">
      <CardHeader>
        <CardTitle className="font-light">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-light">
          {value} {''}{units}
        </p>
      </CardContent>
    </Card>
  )
}