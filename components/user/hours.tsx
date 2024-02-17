import { FaRegClock } from "react-icons/fa";

const Hours = ({ type, hours }: any) => {
  const Row = ({ checkIn, checkOut }: any) => {
    return (
      <div className="flex items-center gap-2">
        <FaRegClock className="text-gray-500 w-6 h-6 inline" />
        <p className="text-sm text-gray-600">
          {checkIn} - {checkOut}
        </p>
      </div>
    );
  };

  return (
    <div>
      {type === "gender-separated" ? (
        <div className=" justify-between flex flex-col  gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-lg mb-1">Mens</h4>
              <h4 className="text-cyan-950 pb-1">weekday</h4>
              <Row
                checkIn={hours.mens.weekday.checkIn}
                checkOut={hours.mens.weekday.checkOut}
              />
            </div>
            <div>
              <h4 className="text-cyan-950 pb-1">weekend</h4>
              <Row
                checkIn={hours.mens.weekday.checkIn}
                checkOut={hours.mens.weekday.checkOut}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-around">
              <hr className="w-[50px] " />
              <hr className="w-[50px] " />
              <hr className="w-[50px] " />
            </div>

            <div>
              <h4 className="text-lg mb-1">Womens</h4>
              <h4 className="text-cyan-950 pb-1">weekday</h4>
              <Row
                checkIn={hours.womens.weekday.checkIn}
                checkOut={hours.womens.weekday.checkOut}
              />
            </div>
            <div>
              <h4 className="text-cyan-950 pb-1">weekend</h4>
              <Row
                checkIn={hours.womens.weekday.checkIn}
                checkOut={hours.womens.weekday.checkOut}
              />
            </div>
          </div>
        </div>
      ) : type === "womens-only" ? (
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-cyan-950 pb-1">weekday</h4>
            <Row
              checkIn={hours.womens.weekday.checkIn}
              checkOut={hours.womens.weekday.checkOut}
            />
          </div>
          <div>
            <h4 className="text-cyan-950 pb-1">weekend</h4>
            <Row
              checkIn={hours.womens.weekday.checkIn}
              checkOut={hours.womens.weekday.checkOut}
            />
          </div>
        </div>
      ) : (
        hours?.mens && (
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-cyan-950 pb-1">weekday</h4>
              <Row
                checkIn={hours.mens.weekday.checkIn}
                checkOut={hours.mens.weekday.checkOut}
              />
            </div>
            <div>
              <h4 className="text-cyan-950 pb-1">weekend</h4>
              <Row
                checkIn={hours.mens.weekday.checkIn}
                checkOut={hours.mens.weekday.checkOut}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Hours;
