import clsx from "clsx";
import moment from "moment";
import { ITime } from "../types";
import { useStyles } from "./styles";

export const Time = ({ dtime, isActive, isVisible }: ITime) => {
  const classes = useStyles();
  if (dtime === null) return <></>;
  return (
    <div style={{ width: "100%" }}>
      <p
        className={clsx({
          [classes.typography]: true,
          [classes.isNotActive]: !isActive,
        })}
      >{`${moment(dtime).format("LL LT")}`}</p>
      <p
        className={clsx({
          [classes.typography]: true,
          [classes.relativeTime]: true,
          [classes.isNotActive]: !isActive,
          [classes.isVisible]: !isVisible,
        })}
      >{`${moment(dtime).fromNow()}`}</p>
    </div>
  );
};
