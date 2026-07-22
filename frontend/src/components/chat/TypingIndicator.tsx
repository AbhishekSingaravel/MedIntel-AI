import { RiRobot2Line } from "react-icons/ri";

function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="flex max-w-4xl items-start gap-4">
        {/* Avatar */}

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gray-100
            text-gray-700
          "
        >
          <RiRobot2Line size={20} />
        </div>

        {/* Bubble */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-5
            py-4
            shadow-sm
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="
                h-2.5
                w-2.5
                animate-bounce
                rounded-full
                bg-blue-500
                [animation-delay:0ms]
              "
            />

            <span
              className="
                h-2.5
                w-2.5
                animate-bounce
                rounded-full
                bg-blue-500
                [animation-delay:150ms]
              "
            />

            <span
              className="
                h-2.5
                w-2.5
                animate-bounce
                rounded-full
                bg-blue-500
                [animation-delay:300ms]
              "
            />
          </div>

          <p className="mt-3 text-sm text-gray-500">
            MedIntel AI is analyzing your documents...
          </p>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;