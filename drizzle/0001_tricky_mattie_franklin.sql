CREATE TABLE "quotations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"product_cost" integer NOT NULL,
	"shipping_cost" integer NOT NULL,
	"service_fee" integer NOT NULL,
	"total" integer NOT NULL,
	"approval_token" varchar NOT NULL,
	"status" varchar DEFAULT 'sent',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_request_id_product_request_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."product_request"("id") ON DELETE no action ON UPDATE no action;