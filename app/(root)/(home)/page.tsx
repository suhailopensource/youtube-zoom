import MeetingType from "@/components/MeetingType";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="">
      ZOOM <UserButton />
      <div>
        <MeetingType />
      </div>
    </div>
  );
};

export default page;
