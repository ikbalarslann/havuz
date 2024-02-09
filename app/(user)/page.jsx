import DatePickerForm from "@/components/user/date-picker";
const HomePage = async () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4  justify-center">
      <h1 className="text-center p-1 text-xl font-bold   text-blue-100  mb-10">
        Daily Pool Rentals in Istanbul
      </h1>

      <DatePickerForm />
    </div>
  );
};

export default HomePage;
