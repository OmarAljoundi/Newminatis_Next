import Link from "next/link";
import { toast } from "react-hot-toast";
import { IoBagCheck } from "react-icons/io5";
const toasterSuccess = (
  total?: any,
  position: "bottom-center" | "top-center" = "bottom-center"
) => {
  toast(
    (t) => (
      <div
        className="bg-white border-2 border-gray-400 w-full shadow-lg p-5"
        style={{ borderRadius: "0" }}
      >
        <div className="">
          <div
            className="flex pb-3"
            style={{ alignItems: "center", columnGap: "12px" }}
          >
            <div className="">
              <IoBagCheck color="black" size={"27px"} />
            </div>
            <p className="text-xs" style={{ textTransform: "uppercase" }}>
              Item added to cart <br />{" "}
              <div className="flex">
                <div>Cart Total:</div>
                <div className="absolute right-9 font-semibold">{total}</div>
              </div>
            </p>
          </div>
          <div className="flex" style={{ columnGap: "12px" }}>
            <button
              className="py-1 w-full text-xs bg-black text-white border-0"
              onClick={() => toast.dismiss(t.id)}
            >
              CONTINUE SHOPPING
            </button>
            <Link
              href={"/checkout"}
              className="px-2 py-1 text-xs w-2/4 border border-black text-black bg-transparent"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              CHECK OUT
            </Link>
          </div>
        </div>
      </div>
    ),
    {
      position: position,
      duration: 1500000,
      style: {
        minWidth: position == "top-center" ? "400px" : "100%",
        background: "transparent",
        boxShadow: "none",
      },
    }
  );
};

const notifyError = (message: string) => {
  toast.error(message);
};
export { toasterSuccess, notifyError };
