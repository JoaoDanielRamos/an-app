import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { Webhook } from "svix";

export const Route = createFileRoute("/api/webhooks")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

        if (!WEBHOOK_SECRET) {
          console.error("Missing CLERK_WEBHOOK_SECRET");
          return new Response("Missing CLERK_WEBHOOK_SECRET", { status: 500 });
        }

        // Get the headers
        const headerPayload = request.headers;
        const svix_id = headerPayload.get("svix-id");
        const svix_timestamp = headerPayload.get("svix-timestamp");
        const svix_signature = headerPayload.get("svix-signature");

        // If there are no headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
          return new Response("Error occured -- no svix headers", {
            status: 400,
          });
        }

        // Get the body
        const payload = await request.text();

        // Create a new Svix instance with your secret.
        const wh = new Webhook(WEBHOOK_SECRET);

        let evt: any;

        // Verify the payload with the headers
        try {
          evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
          });
        } catch (err) {
          console.error("Error verifying webhook:", err);
          return new Response("Error occured", {
            status: 400,
          });
        }

        const eventType = evt.type;

        if (eventType === "user.created") {
          try {
            await connectToDatabase();
            const { id, email_addresses, first_name, last_name, image_url } =
              evt.data;
            const email = email_addresses[0]?.email_address;

            await User.create({
              clerkId: id,
              email: email,
              firstName: first_name,
              lastName: last_name,
              imageUrl: image_url,
            });
            console.log(`User ${id} created in DB`);
          } catch (error) {
            console.error("Error creating user in DB:", error);
            return new Response("Error creating user", { status: 500 });
          }
        }

        // Handle other event types if needed (e.g., user.updated, user.deleted)

        return json({ success: true });
      },
    },
  },
});
