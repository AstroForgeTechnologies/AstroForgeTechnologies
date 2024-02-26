import { LOCALE } from "@config";

interface DateTimeSpec {
  dateTime: string | Date | undefined | null;
}

interface SafeDateTimeSpec {
  dateTime: string | Date;
}

interface Props extends DateTimeSpec {
  category?: "Published" | "Updated" | "Originally Published";
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({
  dateTime,
  category = "Published",
  size = "sm",
  className,
}: Props) {
  if (!dateTime)
    throw new Error("No date format");
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
        aria-hidden="true"
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
        <path
          d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
      </svg>
      {category === "Published" ? (
        <span className="sr-only">
          {category}
        </span>
      ) : (
        <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
          {category}
        </span>
      )}
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
            <FormattedDatetime
              dateTime={dateTime} />
      </span>
    </div>
  );
}

export function useModDateTime(pubDateTime: Date | string, modDateTime: Date | string | undefined | null) {
  return modDateTime && modDateTime > pubDateTime;
}

const FormattedDatetime = ({ dateTime }: SafeDateTimeSpec) => {
  const myDatetime = new Date(dateTime);

  const date = myDatetime.toLocaleDateString(LOCALE.langTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const time = myDatetime.toLocaleTimeString(LOCALE.langTag, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <time dateTime={myDatetime.toISOString()}>{date}</time>
      <span aria-hidden="true"> | </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
      <span className="text-nowrap">{time}</span>
    </>
  );
};
