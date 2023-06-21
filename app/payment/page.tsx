"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";

function PaymentPage() {
  // // Get the URL parameters from the current page URL
  // const urlParams = new URLSearchParams(window.location.search);

  // // Check if the payment status parameter exists
  // if (urlParams.has("status")) {
  //   const paymentStatus = urlParams.get("status");

  //   if (paymentStatus === "success") {
  //     // Payment was successful
  //     setMessage("payment was successful");
  //     // Perform success actions (e.g., show success message, update UI, etc.)
  //   } else if (paymentStatus === "failure") {
  //     // Payment failed
  //     setMessage("payment has failed");
  //     // Perform failure actions (e.g., show error message, update UI, etc.)
  //   }
  // }
  return (
    <>
      <Breadcrumb
        pageName="this is the payment page!"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <div className=" mx-auto h-[315px]">
        <h1 className=" ml-[20%] text-2xl ">{`Your payment has been received! instruccions for the appointment and receipt has been send to ${sessionStorage.getItem(
          "email"
        )} `}</h1>
      </div>
    </>
  );
}

export default PaymentPage;
