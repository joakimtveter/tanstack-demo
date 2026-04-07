import { Link } from "@tanstack/react-router";

type PaginationProps = {
  total: number;
  limit: number;
  currentPage: number;
};
export default function Pagination(props: PaginationProps) {
  const { currentPage, total, limit } = props;
  const numberOfPages = Math.ceil(total / limit);
  return (
    <div className="flex gap-2 justify-center my-4 align-baseline">
      <Link
        to="."
        search={{ page: currentPage - 1, pageSize: limit }}
        disabled={currentPage > 1}
      >
        Previos
      </Link>

      {Array.from({ length: numberOfPages }, (_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            to="."
            search={{ page, pageSize: limit }}
            className={`px-3 py-1 border rounded
              ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {page}
          </Link>
        );
      })}

      <Link
        to="."
        search={{ page: currentPage - 1, pageSize: limit }}
        disabled={currentPage == numberOfPages}
      >
        Next
      </Link>
    </div>
  );
}
