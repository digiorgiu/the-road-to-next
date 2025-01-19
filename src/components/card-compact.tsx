import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

type CardCompactProps = {
    title: string
    description: string
    content: React.ReactNode
    footer?: React.ReactNode
    classNames?: string
}

export default function CardCompact({ title, description, content, footer, classNames }: CardCompactProps) {
    return (
        <Card className={classNames}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    )
}