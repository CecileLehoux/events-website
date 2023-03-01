import React from "react";
import Image from "next/image";

const Events = ({ data }: any) => {
  return (
    <div>
      <h1>Events Per City Page</h1>
      {data.map((event: any) => {
        return (
          <div key={event.id}>
            <a href={`events/${event.id}`}>
              <h2>{event.title}</h2>

              <Image
                width={300}
                height={300}
                alt={event.title}
                src={event.image}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Events;

export async function getStaticProps() {
  const { events_categories } = await import("../../data/data.json");

  return {
    props: {
      data: events_categories,
    },
  };
}
