import { QulfLogoIcon } from "@/components/icons";

interface QulfWordMarkProps {
  iconSize?: number;
  textSize?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}
const QulfWordMark = ({
  iconSize = 22,
  textSize = "text-xl",
  className = "",
  iconClassName = "",
  textClassName = "",
  showText = true,
}: QulfWordMarkProps) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {" "}
      <div
        className={`flex items-center justify-center rounded-md select-none ${iconClassName}`}
      >
        {" "}
        <QulfLogoIcon width={iconSize} height={iconSize} />{" "}
      </div>{" "}
      {showText && (
        <span
          className={`${textSize} font-bold tracking-tight text-white ${textClassName}`}
        >
          {" "}
          QULF{" "}
        </span>
      )}{" "}
    </div>
  );
};
export default QulfWordMark;
