import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <>
      <div className="flex flex-row gap-2 sm:gap-4 justify-between items-center w-full">
        {/* Left Section: Image, Title, and Icons wrapped together */}
        <div className="flex flex-row items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex flex-row items-center gap-2 sm:gap-4 shrink-0">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[32px] sm:size-[40px] shrink-0"
            />
            <h3 className="capitalize text-sm sm:text-xl font-semibold truncate min-w-0">
              {interview.role} <span className="max-sm:hidden">Interview</span>
            </h3>
          </div>

          {/* Icons Section - Scale them down for mobile */}
          <div className="shrink-0 scale-75 sm:scale-100 origin-left">
            <DisplayTechIcons techStack={interview.techstack} />
          </div>
        </div>

        {/* Right Section: Type Badge */}
        <p className="bg-dark-200 px-2 py-1 sm:px-4 sm:py-2 rounded-lg h-fit text-[10px] sm:text-sm whitespace-nowrap shrink-0">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </>
  );
};

export default InterviewDetails;
