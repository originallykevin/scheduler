import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // add line below as rendering before we could map. Mentor help.
  // const days = props.days[0] || []
  const DayListItemArray = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return (
    <ul>
      {DayListItemArray}
    </ul>
  );
}