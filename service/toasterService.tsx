import { Box, Button } from "@mui/material";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { IoBagCheck } from "react-icons/io5";
const toasterSuccess = (message: string, total?: any) => {
  toast(
    (t) => (
      <>
        <div className="flex flex-row items-center w-full">
          <div className="basis-1/2">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <IoBagCheck />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{message}</p>
                <p className="mt-1 text-sm text-gray-500">Total: {total}</p>
              </div>
            </div>
          </div>
          <div className="basis-1/2">
            <div className="grid border-l border-gray-200 justify-items-center">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg  flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Continue Shopping
                <br />
              </button>

              <div className="mt-1">
                <Link href={"/checkout"} className="mt-1 text-sm text-gray-500">
                  Check out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    {
      duration: 8000,
      style: {
        minWidth: "350px",
        height: "90px",
      },
    }
  );
};

const notifyError = (message: string) => {
  toast.error(message);
};
export { toasterSuccess, notifyError };
