import Breadcrumb from "@/components/Common/Breadcrumb";
import Form from "@/components/Booking/Form";

const BookingPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Book an appointment with us!"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <section className="mx-5 flex flex-row justify-evenly">
        <Form />
      </section>
    </>
  );
};

export default BookingPage;
