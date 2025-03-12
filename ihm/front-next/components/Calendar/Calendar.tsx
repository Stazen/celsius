import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/fr'
import { Tooltip } from "@nextui-org/tooltip";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar({ data }) {
  dayjs.extend(localeData);
  dayjs.locale('fr');
  const now = dayjs();
  return (
    <div className="max-h-[300px] w-full overflow-hidden">
      <div className="rounded-lg bg-white h-full w-full dark:bg-opacity-[0.08] py-4 border border-black-a12 dark:border-white-a08 ">
        <h1 className="flex-auto text-md pb-4 pl-3 capitalize">{now.format('MMMM')} 2024</h1>
        <div className="grid grid-cols-7 text-center text-xs leading-6 font-semibold">
          <div>Lu</div>
          <div>Ma</div>
          <div>Me</div>
          <div>Je</div>
          <div>Ve</div>
          <div>Sa</div>
          <div>Di</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-xxs">
          {data.map((day, dayIdx) => (
            <div
              key={day.date}
              className={classNames(dayIdx > 6 && "border-gray-200", "py-0.5")}
            >
              <p
                className={classNames(
                  day.isToday && !day.incident && "bg-blue-celsius text-white",
                  day.isToday && day.incident && "bg-red-600 text-white",
                  !day.isToday &&
                  day.incident &&
                  day.isCurrentMonth &&
                  "bg-red-400 text-white",
                  !day.isToday &&
                  day.incident &&
                  !day.isCurrentMonth &&
                  "bg-red-400/50 text-white",
                  !day.isToday && !day.incident && "dark:text-white",
                  day.date == now && day.incident && "dark:text-white",
                  !day.isToday &&
                  day.incident &&
                  day.isCurrentMonth &&
                  "text-white",
                  !day.isToday &&
                  day.isCurrentMonth &&
                  "text-black dark:text-white",
                  !day.isToday &&
                  !day.isCurrentMonth &&
                  "text-black/20 dark:text-white/20",
                  !day.isPast && day.isCurrentMonth && "text-grey",
                  day.isToday && "font-semibold",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                )}
              >
                {day.incident ? (
                  <Tooltip
                    size={'lg'}
                    color={"warning"}
                    content={"Un incident est survenu ce jour"}
                    className={`first-letter:uppercase`}
                  >
                    <time className="w-full text-center" dateTime={day.date}>
                      {dayjs(day.date).format("D")}
                    </time>
                  </Tooltip>
                ) : (
                  <time className="w-full text-center" dateTime={day.date}>
                    {dayjs(day.date).format("D")}
                  </time>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
