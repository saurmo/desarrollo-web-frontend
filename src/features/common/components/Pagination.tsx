'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

// Genera el rango de páginas a mostrar: siempre primera, última,
// y una ventana alrededor de la página actual. Los huecos se marcan con null.
const buildPageRange = (currentPage: number, totalPages: number): (number | null)[] => {
  const delta = 1;
  const pages: (number | null)[] = [];
  let lastAdded = 0;

  for (let page = 1; page <= totalPages; page++) {
    const isEdge = page === 1 || page === totalPages;
    const isNearCurrent = Math.abs(page - currentPage) <= delta;

    if (!isEdge && !isNearCurrent) continue;

    if (lastAdded && page - lastAdded > 1) {
      pages.push(null);
    }
    pages.push(page);
    lastAdded = page;
  }

  return pages;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(currentPage, totalPages);
  const canGoPrevious = currentPage > 1 && !isLoading;
  const canGoNext = currentPage < totalPages && !isLoading;

  const buttonBase =
    'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Paginación">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className={`${buttonBase} border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700`}
      >
        Anterior
      </button>

      {pages.map((page, index) =>
        page === null ? (
          <span key={`gap-${index}`} className="px-1 text-sm text-slate-500">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            aria-current={page === currentPage ? 'page' : undefined}
            className={
              page === currentPage
                ? `${buttonBase} border-blue-500 bg-blue-600 text-white`
                : `${buttonBase} border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800`
            }
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`${buttonBase} border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700`}
      >
        Siguiente
      </button>
    </nav>
  );
};
