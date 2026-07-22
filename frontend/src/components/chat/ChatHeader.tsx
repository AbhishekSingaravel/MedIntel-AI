import { LLM_MODELS } from "@/constants/llmModels";

interface ChatHeaderProps {
  provider: string;
  model: string;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
}

function ChatHeader({
  provider,
  model,
  onProviderChange,
  onModelChange,
}: ChatHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex flex-col gap-6 px-14 py-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="flex-1">
          <h2 className="ml-2 text-4xl font-bold tracking-tight text-slate-900">
            MedIntel AI Assistant
          </h2>

          {/* <p className="mt-2 text-base text-slate-500">
            Ask questions about your uploaded medical documents using your
            preferred AI model.
          </p> */}
        </div>

        {/* Right */}

        <div className="mr-4 flex flex-wrap items-end gap-6">
          {/* Provider */}

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-slate-600">
              Provider
            </label>

            <select
              value={provider}
              onChange={(e) =>
                onProviderChange(
                  e.target.value
                )
              }
              className="
                h-12
                w-48
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                text-base
                font-medium
                shadow-sm
                transition-all
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            >
              {Object.keys(LLM_MODELS).map(
                (providerName) => (
                  <option
                    key={providerName}
                    value={providerName}
                  >
                    {providerName.charAt(
                      0
                    ).toUpperCase() +
                      providerName.slice(1)}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Model */}

          <div className="flex flex-col pr-4">
            <label className="mb-2 text-sm font-semibold text-slate-600">
              Model
            </label>

            <select
              value={model}
              onChange={(e) =>
                onModelChange(
                  e.target.value
                )
              }
              className="
                h-12
                w-72
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                text-base
                font-medium
                shadow-sm
                transition-all
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            >
              {(LLM_MODELS[
                provider
              ] ?? []).map(
                (modelName) => (
                  <option
                    key={modelName}
                    value={modelName}
                  >
                    {modelName}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ChatHeader;