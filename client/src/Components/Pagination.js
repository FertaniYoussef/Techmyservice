const Pagination = ({ postsPerPage, totalPosts, paginate,paginateBack,paginateFront,currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav aria-label="Page navigation example">
        <ul class="inline-flex space-x-px">
        <li>
      <a  onClick={() => paginateBack()} class="py-2 px-3 ml-0 leading-tight text-gray-500  bg-sky-50  rounded-l-lg border border-sky-400 hover:bg-gray-100 hover:text-gray-700 no-underline cursor-pointer">Previous</a>
    </li>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} className='py-2 px-3 leading-tight text-gray-500  bg-sky-50  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 no-underline cursor-pointer'>
                {number}
              </a>
            </li>
          ))}
           <li>
      <a  onClick={() =>  {if (currentPage<pageNumbers.length) paginateFront()}} class="py-2 px-3 leading-tight text-gray-500  bg-sky-50  rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 no-underline cursor-pointer">Next</a>
    </li>
        </ul>
      </nav>
    );
  };
  
  export default Pagination;