import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "GBP", "EUR"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    //reference pointing to other model
    user: {
      type: mongoose.Schema.Types.ObjectId, //accepting the id of user
      ref: "User",
      required: true,
      index: true, //optimizes the query based on the user field
    },
  },
  {
    timestamps: true,
  }
);
//executing a function before saving the subscription document
//auto calculate the renewal date if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
    //i.e if start date is Jan 1st & monthly => jan 31st
  }
  // auto update the status
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next(); //proceed to create document in database
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
