import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { map } from "lodash"

interface IBreadcrumbContent {
  name: string,
  url: string
}

interface IBreadcrumb {
  contents: IBreadcrumbContent[]
}

export function AppBreadcrumb({ contents }: IBreadcrumb) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {
          map(contents, (content: IBreadcrumbContent, index: number) => (
            <div key={index} className="flex flex-col w-auto">
              <BreadcrumbItem>
                <BreadcrumbLink href={content.url}>{content.name}</BreadcrumbLink>
              </BreadcrumbItem>
              {
                (index === contents.length - 1)
                  ? null
                  : <BreadcrumbSeparator />
              }
            </div>
          ))
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}
