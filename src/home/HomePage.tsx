import Link from "next/link";
import Image from "next/image";

const HomePage = ({ data }: any) => {
  return (
    <main>
      {data.map((event: any, index: number) => {
        return (
          <div key={index}>
            <Link href={`/events/${event.id}`}>
              <h2>{event.title}</h2>
              <p>{event.description} </p>
              <Image
                width={300}
                height={300}
                alt={event.title}
                src={event.image}
              />
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default HomePage;
