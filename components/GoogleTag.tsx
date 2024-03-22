import Script from "next/script";

const GoogleTag = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11078457256"
      />

      <Script id="google-analytics">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
        
              gtag("config", "AW-11078457256");
          `}
      </Script>
    </>
  );
};

export default GoogleTag;
