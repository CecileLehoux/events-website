import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./single-page.module.css";

const Event = ({ paramsEvent }: any) => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const email = value;
    const eventId = router?.query.id;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
      setMessage("Enter a correct email");
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/email-registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, eventId }),
        }
      );
      if (!response.ok) throw new Error(`error : ${response.status}`);
      const data = await response.json();
      setMessage(data.message);
      setValue("");
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{paramsEvent.title}</h1>
      <Image
        width={900}
        height={500}
        alt={paramsEvent.title}
        src={paramsEvent.image}
      />
      <p className={styles.description}>{paramsEvent.description}</p>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={handleChange}
          id="email"
          className={styles.input}
          placeholder="email"
        />
        <button type="submit" className={styles.button}>
          Envoyer
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Event;

export async function getStaticPaths() {
  const { allEvents } = await import("../../../data/data.json");
  const allPaths = allEvents.map((event: any) => {
    return {
      params: {
        category: event.city,
        id: event.id.toString(),
      },
    };
  });

  return { paths: allPaths, fallback: false };
}

export async function getStaticProps(context: any) {
  const { allEvents } = await import("../../../data/data.json");
  const paramsEvent = allEvents.find((event) => event.id === context.params.id);

  return { props: { paramsEvent } };
}
