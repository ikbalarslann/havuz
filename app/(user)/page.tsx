import DatePickerForm from "@/components/user/date-picker";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Pool renting made easy.",
};

const HomePage = async () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4  justify-center ">
      <div className="absolute min-w-full h-[100px] -z-10 top-20 left-0">
        <Image
          src="https://utfs.io/f/ebd47404-c503-4b14-81b5-003193a52534-v96q09.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-center p-1 text-xl font-bold   text-cyan-50  my-10">
        Daily Pool Rentals in Istanbul
      </h1>

      <DatePickerForm />
    </div>
  );
};

export default HomePage;
