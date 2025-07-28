export const Pagination = ({ page, totalPages, goToPage }) => {
  return (
    <div style={{ marginTop: "16px", textAlign: "center" }}>
      <button disabled={page <= 1} onClick={() => goToPage(page - 1)}>
        &lt;
      </button>
      <span style={{ margin: "0 12px" }}>
        {page} / {totalPages}
      </span>
      <button disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>
        &gt;
      </button>
    </div>
  );
};
