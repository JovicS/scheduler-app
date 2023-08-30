import React from "react";
import InitCalendarLogic from "./Calendar.logic";
import {
  CustomSpaceIcon,
  CustomTruck,
  LocationIcon,
} from "../Icons/Icons.components";
import styles from "./Calendar.module.css";
import { AddCardIcon } from "../Icons/Icons.components";
import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

export const StyledAvatarGroup = (props) => (
  <AvatarGroup
    className={props?.className}
    max={4}
    onClick={() => console.log("llllllllllllll")}
    componentsProps={{
      additionalAvatar: {
        sx: {
          height: "24px",
          width: "24px",
          fontSize: "12px",
        },
      },
    }}>
    {props?.data?.map((item) => (
      <Tooltip
        key={item?.firstName}
        title={`${item?.firstName} ${item?.surname}`}>
        <Avatar
          sx={{ height: "24px", width: "24px" }}
          alt={`${item?.firstName} ${item?.surname}`}
        />
      </Tooltip>
    ))}
  </AvatarGroup>
);

export const TourCard = ({ data }) => (
  <>
    <div className={styles.tour} style={{ color: data?.color }}>
      <div className={styles.tour_card}>
        <div className={styles.tour_card_text}>{data?.tourCompany}</div>
        <div className={styles.tour_card_size}>{data?.tourSize}m&sup3;</div>
      </div>
      <span>
        {LocationIcon} {data?.addressTo}
      </span>
      <div className={styles.tour_card}>
        <StyledAvatarGroup
          className={styles.tour_card_avatar_left}
          data={data?.drivers}
        />
        <StyledAvatarGroup
          className={styles.tour_card_avatar_right}
          data={data?.managers}
        />
      </div>
    </div>
  </>
);

function CalendarComponent() {
  const {
    DateComponent,
    company,
    dateFormat,
    hexToRgbA,
    getDaysInMonth,
    scroll,
  } = InitCalendarLogic();
  const isHorizontalScroll = scroll.x > 130;
  const data = company;
  const isDrawerClosed = useSelector((state) => state.drawer.closed);

  return (
    <>
      {/* Head component */}
      <div className={styles.container}>
        <div
          className={
            scroll.y === 0 ? styles.date_picker : styles.date_picker_scroll
          }>
          <DateComponent />
        </div>
        {data?.map((company) => {
          return (
            <div key={company?.companyName} className={styles.company}>
              {scroll.y === 0 && (
                <div
                  key={company?.companyName}
                  className={styles.company_name}
                  style={{ backgroundColor: company?.color }}>
                  {(company?.companyName).toUpperCase()}
                </div>
              )}
              <div className={styles.company_trucks}>
                {company?.trucks?.map((truck, index) => {
                  return (
                    <div
                      key={truck?.truckName}
                      className={styles.truck_container}
                      style={{
                        backgroundColor: company?.color,
                        marginRight:
                          company?.trucks.length - 1 === index ? "0px" : "8px",
                      }}>
                      <div className={styles.truck_container_text}>
                        <span>
                          {CustomTruck({
                            width: "22",
                            height: "10",
                            color: "#FFFFFF",
                          })}{" "}
                          {truck?.truckName?.toUpperCase()}
                        </span>
                      </div>
                      <div className={styles.space}>{truck?.size} m&sup3;</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* Body component */}
      <div className={styles.body_container}>
        {getDaysInMonth()?.map((item, index) => {
          return (
            <div
              key={item}
              className={styles.row}
              style={{
                backgroundColor: index % 2 === 0 ? "#F7F7F7" : "#FFFFFF",
              }}>
              <div
                className={
                  isHorizontalScroll
                    ? isDrawerClosed
                      ? styles.date_horizontal_wide
                      : styles.date_horizontal
                    : styles.date
                }
                style={{
                  backgroundColor: index % 2 === 0 ? "#F7F7F7" : "#FFFFFF",
                }}>
                <div className={styles.date_text_container}>
                  <span className={styles.date_text}>
                    {dateFormat(item)[1]}
                  </span>
                  <span className={styles.day_text}>{dateFormat(item)[0]}</span>
                </div>
              </div>
              {isHorizontalScroll && (
                <div className={styles.fake_div_vertical}></div>
              )}
              {data?.map((company) => {
                return company?.trucks?.map((truck) => {
                  const tour = truck?.tours?.filter(
                    (tour) =>
                      new Date(tour?.dateFrom)?.getTime() === item?.getTime() ||
                      new Date(tour?.dateTo)?.getTime() === item?.getTime()
                  );
                  if (tour.length > 0) {
                    let space = 0;
                    tour?.map((data) => (space = space + data?.tourSize));
                    return (
                      <div
                        className={styles.tours}
                        key={`${item} ${truck?.truckName}`}>
                        <div
                          className={styles.tour_header}
                          style={{
                            backgroundColor: hexToRgbA({
                              hex: truck?.color,
                              opacity: 0.2,
                            }),
                          }}>
                          <div className={styles.tour_header_left_icon}>
                            {CustomTruck({
                              width: "22",
                              height: "10",
                              color: truck?.color,
                            })}
                          </div>
                          <div className={styles.tour_header_right_icon}>
                            <span
                              style={{
                                color:
                                  space > truck?.size
                                    ? "rgba(255, 0, 0, 0.76)"
                                    : "#00C437",
                              }}>
                              {space < truck?.size ? truck?.size - space : 0}
                              m&sup3;
                            </span>
                            {CustomSpaceIcon({
                              width: "18",
                              height: "18",
                              color: truck?.color,
                            })}
                          </div>
                        </div>
                        {tour?.map((data, index) => {
                          space = space + data?.tourSize;
                          return (
                            <TourCard key={index} index={index} data={data} />
                          );
                        })}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        onClick={(e) => console.log(e, truck?.truckName, item)}
                        key={`${item} ${truck?.truckName}`}
                        className={styles.add_tour}
                        style={{ color: company?.color }}>
                        {AddCardIcon}
                      </div>
                    );
                  }
                });
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CalendarComponent;
