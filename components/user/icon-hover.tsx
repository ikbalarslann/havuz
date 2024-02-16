import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { use, useEffect, useState } from "react";
//icons
import { FaSwimmingPool } from "react-icons/fa";
import { MdOutlinePool } from "react-icons/md";
import { LiaBathSolid } from "react-icons/lia";
import { FaHotTubPerson } from "react-icons/fa6";
import { FaToiletPaper } from "react-icons/fa";
import { FaShower } from "react-icons/fa6";
import { FaWarehouse } from "react-icons/fa";
import { FaCloudRain } from "react-icons/fa6";
import { TbMassage } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { FaBoltLightning } from "react-icons/fa6";

export function HoverIcon({
  tag,
  iconSize = 4,
}: {
  tag: string;
  iconSize?: number;
}) {
  const [obj, setObj] = useState({
    text: "",
    icon: <></>,
  });

  const iconArr = [
    {
      text: "indoor-pool",
      icon: (
        <FaSwimmingPool
          className={`text-gray-500 w-${iconSize} h-${iconSize}`}
        />
      ),
    },
    {
      text: "outdoor-pool",
      icon: (
        <MdOutlinePool
          className={`text-gray-500 w-${iconSize} h-${iconSize}`}
        />
      ),
    },
    {
      text: "turkish-bath",
      icon: (
        <LiaBathSolid className={`text-gray-500 w-${iconSize} h-${iconSize}`} />
      ),
    },
    {
      text: "jacuzzi",
      icon: (
        <FaHotTubPerson
          className={`text-gray-500 w-${iconSize} h-${iconSize}`}
        />
      ),
    },
    {
      text: "toilet",
      icon: (
        <FaToiletPaper
          className={`text-gray-500 w-${iconSize} h-${iconSize}`}
        />
      ),
    },
    {
      text: "shower",
      icon: (
        <FaShower className={`text-gray-500 w-${iconSize} h-${iconSize}`} />
      ),
    },
    {
      text: "sauna",
      icon: (
        <FaWarehouse className={`text-gray-500 w-${iconSize} h-${iconSize}`} />
      ),
    },
    {
      text: "steam-room",
      icon: (
        <FaCloudRain className={`text-gray-500 w-${iconSize} h-${iconSize}`} />
      ),
    },
    {
      text: "massage",
      icon: (
        <TbMassage className={`text-gray-500 w-${iconSize} h-${iconSize}`} />
      ),
    },
    {
      text: "gym",
      icon: <CgGym className={`text-gray-500 w-${iconSize} h-${iconSize}`} />,
    },
    {
      text: "body-scrub",
      icon: (
        <PiPersonArmsSpreadLight
          className={`text-gray-500 w-${iconSize} h-${iconSize}`}
        />
      ),
    },
    {
      text: "shock-pool",
      icon: (
        <FaBoltLightning
          className={`text-gray-500 w-${iconSize} h-${iconSize}`}
        />
      ),
    },
  ];

  useEffect(() => {
    const theobj = iconArr.find((item) => item.text === tag);
    theobj && setObj(theobj);
  }, [tag]);

  return (
    <HoverCard>
      <HoverCardTrigger>{obj.icon} </HoverCardTrigger>
      <HoverCardContent className="w-auto py-0 px-2">
        {obj.text}
      </HoverCardContent>
    </HoverCard>
  );
}
