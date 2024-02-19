import DatePickerForm from "@/components/user/date-picker";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Pool renting made easy.",
};

const HomePage = async () => {
  return (
    <div className="flex flex-col mx-4 ">
      <div
        className="absolute min-w-full h-screen -z-10 top-0
left-0"
      >
        <Image
          src="https://utfs.io/f/61a01a8d-d9d1-464c-9a36-31ab54e0d2f0-2f9.webp"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col gap-[40px]  mt-[250px]">
        <div className="gap-1 flex flex-col">
          <h1 className="text-white text-5xl italic font-medium">
            Have a <br />
            turkish bath
          </h1>
          <p className="text-white text-xl  ">
            discover the best Turkish Baths and the pools in Istanbul
          </p>
        </div>

        <div className="flex items-center justify-center ">
          <DatePickerForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
