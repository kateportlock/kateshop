import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, itemsPerPage, handlePageClick, curPage }) => {

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={itemsPerPage}
                pageCount={pageCount}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                containerClassName={"pagination-list is-justify-content-center mt-6"}
                pageLinkClassName={"pagination-link"}
                previousLinkClassName={"pagination-link pagination-previous"}
                nextLinkClassName={"pagination-link pagination-next"}
                disabledClassName={"pagination-link is-disabled"}
                activeLinkClassName={"pagination-link has-background-grey-light"}
                forcePage={curPage}
            />
        </>
    )
}

export default Pagination;