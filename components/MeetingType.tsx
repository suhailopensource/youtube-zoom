"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingType = () => {
  const [callDetail, setCallDetail] = useState<Call>();
  const [values, setValues] = useState(initialValues);
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = crypto.randomUUID();

      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

  return (
    <div>
      <Button className="bg-muted-foreground" onClick={createMeeting}>
        Instart start meeting
      </Button>
    </div>
  );
};

export default MeetingType;
