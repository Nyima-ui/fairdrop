import Image from "next/image";

const features = [
  {
    heading: "Real-Time Price Tracking",
    paragraph:
      "Monitor flight prices around the clock. We continuously scan multiple airlines and booking sites to ensure you never miss a price drop on your desired route.",
    image: "/images/feature-1.png",
    imageAlt:
      "A conceptual illustration of a clock surrounded by flight and data icons.",
  },
  {
    heading: "Smart Price Alerts",
    paragraph:
      "Set your target price and preferred travel dates. We'll notify you via email and SMS the moment we find flights that match your budget, so you can book with confidence.",
    image: "/images/feature-2.png",
    imageAlt:
      "Conceptual graphics showing time tracking, flight alerts, and data monitoring icons.",
  },
];

const Features = () => {
  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">
        Features
      </h2>
      {features.map((item, idx) => (
        <article
          key={idx}
          className={`flex justify-between items-center py-15 max-sm:py-11.25 gap-10 max-sm:gap-0 ${idx === 1 ? "flex-row-reverse" : ""} max-sm:flex-col`}
        >
          <div className="max-w-121.5">
            <h3 className="text-4xl">{item.heading}</h3>
            <p className="mt-3.75">{item.paragraph}</p>
          </div>
          <div className="w-129.5 max-sm:w-full max-sm:mt-11.25">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              src={item.image}
              alt={item.imageAlt}
            />
          </div>
        </article>
      ))}
    </section>
  );
};

export default Features;
