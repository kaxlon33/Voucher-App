import React, { useRef, useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { HiComputerDesktop } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useSWR from "swr";
import VoucherListRow from "./VoucherListRow";
import { debounce, set } from "lodash";
import VoucherListSkeletonLoader from "./VoucherListSkeletonLoader";
import Pagination from "./pagination";


const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherList = () => {

  // const [search, setSearch] = useState("");
  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + `/vouchers`
  )
  const searchInput = useRef();
  // console.log(searchInput);

  const { data, isLoading, error } = useSWR(
    fetchUrl,
    fetcher
  );


  const handleSearch = debounce((e) => {
    console.log(e.target.value);
    setFetchUrl(
      `${import.meta.env.VITE_API_URL}/vouchers?q=${e.target.value}`
    )
  }, 500);

  const handleClear = () => {
    setSearch("");
    searchInput.current.value = "";
  };

  const updateFetchUrl = (url) => {
    setFetchUrl(url);
  }

  return (
    <section>
      <p className="font-bold text-lg">VoucherList</p>
      <div>
        <div className=" flex justify-between mb-3">
          <div className="">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <HiSearch className="w-4 h-4 text-stone-500 dark:text-stone-400" />
              </div>
              <input
                onChange={handleSearch}
                ref={searchInput}
                type="text"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Voucher"
              />
              {/* {search && (
                <button
                  onClick={handleClear}
                  className="absolute top-0 right-2 bottom-0 m-auto"
                >
                  <HiX className="w-4 h-4 text-stone-500 dark:text-stone-400 fill-red-500 scale-100 active:scale-90" />
                </button>
              )} */}
            </div>
          </div>
          <div className="">
            <Link
              to={"/sale"}
              className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Sale
              <HiComputerDesktop />
            </Link>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
            <thead className="text-xs text-stone-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-stone-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  # VOUCHER ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer name
                </th>

                <th scope="col" className="px-6 py-3 text-end">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-end">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3 text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hidden last:table-row">
                <td colSpan={5} className="px-6 py-4 text-center">
                  There is no Voucher
                </td>
              </tr>
              {isLoading ? (

               <VoucherListSkeletonLoader />
              ):
                data?.data?.map((voucher, index) => (
                  <VoucherListRow key={voucher.id} voucher={voucher} />
                ))}
            </tbody>
          </table>
        </div>
        {!isLoading && <Pagination links={data?.links} meta={data?.meta} updateFetchUrl={updateFetchUrl}/> }
        </div>
    </section>
  );
};

export default VoucherList;
