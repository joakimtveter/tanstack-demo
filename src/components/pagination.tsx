import { Link } from "@tanstack/react-router";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
} from "#/components/ui/pagination";
import { Button } from "#/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type PaginationProps = {
  total: number;
  limit: number;
  currentPage: number;
};

export default function Pagination(props: PaginationProps) {
  const { currentPage, total, limit } = props;
  const numberOfPages = Math.ceil(total / limit);

  return (
    <PaginationRoot className="my-4">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="default"
            className="pl-2!"
            disabled={currentPage <= 1}
            render={<Link to="." search={{ page: currentPage - 1, pageSize: limit }} />}
          >
            <ChevronLeftIcon data-icon="inline-start" />
            <span className="hidden sm:block">Previous</span>
          </Button>
        </PaginationItem>

        {Array.from({ length: numberOfPages }, (_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <PaginationItem key={page}>
              <Button
                variant={isActive ? "outline" : "ghost"}
                size="icon"
                aria-label={`Page ${page}`}
                render={<Link to="." search={{ page, pageSize: limit }} />}
              >
                {page}
              </Button>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <Button
            variant="ghost"
            size="default"
            className="pr-2!"
            disabled={currentPage >= numberOfPages}
            render={<Link to="." search={{ page: currentPage + 1, pageSize: limit }} />}
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon data-icon="inline-end" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
