import React from "react";
import Image from "next/image";
import Link from "next/link";

const AllEventsInOneCity = ({ allEventsPerCity, pageName }: any) => {
  return (
    <div>
      <h1>All events in {pageName}</h1>
      <div>
        {allEventsPerCity.map((event: any) => (
          <div key={event.id}>
            <Link href={`/events/${event.city}/${event.id}`}>
              <h3>{event.title}</h3>
              <Image
                width={300}
                height={300}
                alt={event.title}
                src={event.image}
              />
            </Link>
            ;
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEventsInOneCity;

export async function getStaticPaths() {
  const { events_categories } = await import("../../../data/data.json");
  const allPaths = events_categories.map((event) => {
    return {
      params: {
        category: event.id.toString(),
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { allEvents } = await import("../../../data/data.json");
  const cityId = context?.params.category;
  const allEventsPerCity = allEvents.filter((event) => event.city === cityId);

  return { props: { allEventsPerCity, pageName: cityId } };
}
