import Badge from "./assets/badges.png";
import TabsImg from "./assets/01.gif";
import React from "react";

export default {
  title: "Goal",
};

export const Badges = () => (
  <img src={Badge} style={{ width: "25rem" }} alt="Badge" />
);

export const Tabs = () => (
  <>
    <img src={TabsImg} alt="Tabs" />
  </>
);
