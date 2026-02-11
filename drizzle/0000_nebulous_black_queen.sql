CREATE TABLE "product_request" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"product_image" text NOT NULL,
	"description" text NOT NULL,
	"quantity" integer NOT NULL,
	"budget" integer NOT NULL,
	"create_at" timestamp DEFAULT now()
);
