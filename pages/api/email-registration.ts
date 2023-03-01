import path from "path";
import fs from "fs";

function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath: fs.PathOrFileDescriptor) {
  const jsonData: any = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req: any, res: any) {
  const { method } = req;
  const { email, eventId } = req.body;
  const filePath = buildPath();

  const { event_categories, allEvents } = extractData(filePath);

  if (!allEvents) {
    return res.status(404).json({ message: "Event Data not found" });
  }
  if (!email || !email.includes("@")) {
    res.status(422).json({ message: "Invalid email address" });
  }

  if (method === "POST") {
    const newAllEvents = allEvents.map((event: any) => {
      if (event.id === eventId) {
        if (event.emails_registered.includes(email)) {
          res.status(401).json({ message: "this email is already used" });
        }
        return {
          ...event,
          emails_registered: [...event.emails_registered, email],
        };
      }
      return event;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({
        event_categories,
        allEvents: newAllEvents,
      })
    );

    res.status(200).json({ message: `it's good with ${email} et ${eventId}` });
  }
}
