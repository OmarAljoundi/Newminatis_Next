import { FC, useState } from "react";
import { TextField } from "@mui/material";
import { AxiosResponse } from "axios";
import EmailService from "@/service/EmailService";
import { IBaseResponse } from "@/interface/IBaseResponse";
import Link from "next/link";
import { SocialMediaIcons } from "../SocialMediaIcons";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import Image from "next/image";

const Footer: FC = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const result = (await EmailService.postEmail(
      email
    )) as AxiosResponse<IBaseResponse>;
    if (result.data.success) {
      toast.success(
        "Congratulation! You have successfully subscribed to our newsletter",
        { duration: 8000 }
      );
      window.scroll({
        behavior: "smooth",
        left: 0,
        top: 0,
      });
      setEmail("");
    } else {
      toast.error("You have already subscribed to our newsletter", {
        duration: 8000,
      });
    }
    setLoading(false);
  };
  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <footer className="pt-6 lg:pt-20 pb-4 lg:pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8 lg:gap-y-12 lg:justify-items-center ">
          <div>
            <div className="max-w-sm">
              <a href="#" title="" className="inline-flex rounded-md">
                <Image
                  src="/assets/images/logos/newmanits.png"
                  alt="Newmanits Logo"
                  width={200}
                  height={80}
                />
              </a>

              <p className="mt-4 font-medium text-sm pl-2">
                Newminatis is a creative company that combines fashion, art, and
                music to foster diversity, inclusivity, and individual
                expression. Their vision is to build a community-focused brand
                that celebrates creativity and brings people together through
                innovative designs and projects.
              </p>
            </div>
          </div>

          <div>
            <p className="uppercase font-semibold text-sm">Useful Links</p>
            <ul className="mt-4 divide-y-2">
              {importantLinks.map((item) => (
                <li key={item.label} className="py-2">
                  <Link
                    href={item.link}
                    title=""
                    className="font-medium text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="uppercase font-semibold text-sm">Contact Us</p>
            <div className="mt-4 grid">
              <span className="font-medium text-sm">Newminatis LLC</span>
              <span className="font-medium text-sm">
                3680 Wilshire Blvd Ste P04 <br /> 1716 Los Angeles, CA 90010
              </span>

              <span className="font-medium text-sm">
                Email: support@newminatis.com
              </span>
              <span className="font-medium text-sm">
                Phone: +1 415 818 1185
              </span>
              <div className="mt-2">
                <SocialMediaIcons color="black" />
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className="uppercase font-semibold text-sm">Join The Tribe</p>
            <form
              onSubmit={handleSubmitForm}
              className="d-flex mt-4"
              style={{ columnGap: "5px" }}
            >
              <TextField
                fullWidth
                name="email"
                value={email}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  mb: 2,
                  "& .MuiInputBase-root": {
                    background: "white",
                    borderRadius: "0",
                  },
                }}
                placeholder="Email Address"
              />

              <div className="w-fit mr-auto">
                <LoadingButton
                  type="submit"
                  loading={loading}
                  disabled={!isValidEmail()}
                  color="primary"
                >
                  <span
                    style={
                      loading
                        ? {
                            visibility: "hidden",
                          }
                        : {
                            visibility: "visible",
                          }
                    }
                    className="uppercase text-xs"
                  >
                    Subscribe
                  </span>
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>

        <hr className="mt-6 md:mt-12" />

        <div className="grid justify-items-center lg:flex mt-2 flex-row items-end lg:justify-between">
          <p className="font-medium text-sm">
            © Copyright 2023. All Rights Reserved
          </p>

          <div className="mt-2 lg:mt-6 sm:mt-0 flex gap-x-4">
            {PaymentIcons.map((i) => (
              <img
                src={i.link}
                alt={i.label}
                key={i.label}
                style={{ width: "30px", height: "30px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const importantLinks = [
  {
    label: "About Us",
    link: "/our-story",
  },
  {
    label: "Terms & Conditions",
    link: "/terms-and-conditions",
  },
  {
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    label: "Shipping Information",
    link: "/shipping-information",
  },
  {
    label: "Return Policy",
    link: "/return-policy",
  },
  {
    label: "FAQs",
    link: "/faqs",
  },
];
const contactUs = [
  "Newminatis LLC",
  "3680 Wilshire Blvd Ste P04 <br/> 1716 Los Angeles, CA 90010",
  "",
];

const PaymentIcons = [
  {
    label: "Apple-Pay",
    link: "/assets/images/payments/apple-pay.svg",
  },
  {
    label: "Google-Pay",
    link: "/assets/images/payments/google-pay.svg",
  },
  {
    label: "Mastercard",
    link: "/assets/images/payments/mastercard.svg",
  },
  {
    label: "Visa",
    link: "/assets/images/payments/visa.svg",
  },
];

export default Footer;
