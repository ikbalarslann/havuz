import DatePickerForm from "@/components/user/date-picker";
const HomePage = async () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4  justify-center">
      <DatePickerForm />
    </div>
  );
};

export default HomePage;
