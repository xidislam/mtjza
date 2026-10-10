CREATE TABLE "orders" (
	"id" serial PRIMARY KEY,
	"code" text NOT NULL UNIQUE,
	"customer_name" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"delivery_zone" text NOT NULL,
	"payment_method" text NOT NULL,
	"transaction_id" text,
	"note" text,
	"items" jsonb NOT NULL,
	"subtotal" integer NOT NULL,
	"delivery_fee" integer NOT NULL,
	"total" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
